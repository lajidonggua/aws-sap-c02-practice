const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = __dirname;
const context = vm.createContext({});
vm.runInContext(
  ['sap_questions.js', 'sap_explanations.js']
    .map(file => fs.readFileSync(path.join(root, file), 'utf8'))
    .join('\n') + ';this.questions=CHOICE_QUESTIONS;this.explanations=QUESTION_EXPLANATIONS;this.disputes=DISPUTED_QUESTIONS;',
  context
);

const overridesPath = path.join(root, 'quick_overrides.json');
const overrides = fs.existsSync(overridesPath) ? JSON.parse(fs.readFileSync(overridesPath, 'utf8')) : {};
const servicePattern = /(?:Amazon|AWS)\s+[A-Za-z0-9][A-Za-z0-9 .@/+_-]*|\b(?:EC2|S3|RDS|VPC|VPCs|IAM|ALB|NLB|ECS|EKS|EFS|FSx|DMS|SQS|SNS|KMS|WAF|DAX|EMR|SCP|SCPs|OU|OUs|API Gateway|CloudFront|CloudFormation|CloudWatch|DynamoDB|Lambda|Aurora|ElastiCache|Route 53|Direct Connect|Transit Gateway|Organizations|Control Tower|Systems Manager|Fargate|Global Accelerator|Storage Gateway|DataSync|EventBridge|Step Functions|AppSync|OpenSearch|Redshift|QuickSight|GuardDuty|Inspector|Macie|Config|Cognito|Secrets Manager|PrivateLink|VPN|NAT|CIDR|TLS|SSL|HTTP|HTTPS|DNS|FTP|SFTP|NFS|SMB|Multi-AZ|Auto Scaling|Savings Plans|Reserved Instances?|Spot Instances?|Global Tables?|Lambda@Edge|X-Ray|SageMaker|Bedrock)\b/gi;
const questionSignals = /需要|必须|希望|要求|应该|能够|不能|无法|最少|最小|最大|最高|最低|最具成本效益|成本|停机|中断|故障|恢复|可用|扩展|延迟|安全|合规|迁移|性能|运维|管理|私有|跨区域|跨账户|跨账号|实时|自动|保留|加密|访问/;
const actionSignals = /创建|配置|启用|使用|部署|添加|关联|转换|复制|迁移|设置|选择|安装|更新|修改|分配|附加|路由|存储|发送|调用|拒绝|允许|授予|共享|订阅|运行|扩展|故障转移|提升|缓存|加密|监控|分析|删除|保留|导出|注册|连接|集成|实施|启动|停止|购买/;
const genericService = /^(?:IAM|DNS|HTTP|HTTPS|SSL|TLS|EC2|S3|RDS|VPC|VPCs|ECS|EKS|ALB|NLB|VPN|NAT)$/i;
const unfinishedPhrase = /(?:和|与|及|以|为|将|从|到|在|的)$/;
const genericPrompt = /哪一?种|哪些操作|步骤组合|应该.*操作|满足(?:这些|以下|此)要求|以下哪|选择[二三两0-9]+项|选[二三两0-9]+|解决方案架构师需要$|该服务必须$/;
const englishSentenceFragment = /\b(?:instances?|single|using|then|enable|choosing|subscriber|workloads?|regions?)\b|[.!?]$/i;
const technicalEnglishCue = /^(?:(?:Amazon|AWS)\s+[^。！？.!?]{2,60}|[A-Za-z0-9]+:[A-Za-z0-9*]+|(?:Route 53|Direct Connect|Transit Gateway|API Gateway|CloudFront|CloudFormation|CloudWatch|DynamoDB|Lambda@Edge|Lambda|Aurora|ElastiCache|PrivateLink|Auto Scaling|Multi-AZ|Fargate|OpenSearch|Redshift|QuickSight|GuardDuty|Inspector|Macie|Config|Cognito|AppSync|EventBridge|DataSync|SageMaker|Bedrock))$/;

function normalize(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function compact(value) {
  return normalize(value).replace(/\s+/g, '');
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function orderBySource(values, source) {
  const text = normalize(source);
  return values
    .map((value, index) => ({ value, index, position: text.indexOf(normalize(value)) }))
    .sort((a, b) => a.position - b.position || a.index - b.index)
    .map(item => item.value);
}

function baseClauses(value) {
  return String(value || '')
    .split(/[。！？；;\n：]+|(?<=[^\d]),\s+|，/)
    .map(part => normalize(part).replace(/^[•：:、\-\s]+|[：:、\-\s]+$/g, ''))
    .filter(part => part.length >= 4);
}

function splitClauses(value) {
  const base = baseClauses(value);
  const fine = base.flatMap(part => part
    .split(/(?=使用|配置|创建|建立|部署|启用|设置|设定|添加|新增|关联|转换|复制|迁移|安装|更新|修改|分配|附加|允许|授予|确保|选择|运行|实施|指定)/)
    .map(piece => piece.trim())
    .filter(piece => piece.length >= 4));
  return unique([...base, ...fine]);
}

function extractServices(value) {
  return unique(Array.from(normalize(value).matchAll(servicePattern), match => match[0].trim()))
    .filter(term => term.length <= 80 && !(term.length <= 5 && term === term.toLowerCase()) && !englishSentenceFragment.test(term));
}

function usableCue(value) {
  return /[\u3400-\u9fff]/.test(value) || technicalEnglishCue.test(value);
}

function extractQuestionCues(questionZh) {
  const text = normalize(questionZh);
  const complete = new Set(baseClauses(questionZh));
  const clauses = splitClauses(questionZh).filter(clause => !genericPrompt.test(clause) && !unfinishedPhrase.test(clause));
  const candidates = [];

  for (const term of extractServices(text)) candidates.push({ value: term, score: 3 });
  clauses.forEach((clause, index) => {
    const signalCount = (clause.match(new RegExp(questionSignals.source, 'g')) || []).length;
    let score = signalCount * 4;
    if (extractServices(clause).length) score += 2;
    if (/\d|小时|分钟|秒|天|个月|年|区域|账户|账号|可用区/.test(clause)) score += 1;
    if (complete.has(clause)) score += 2;
    score += index / Math.max(1, clauses.length);
    if (score >= 2 && clause.length <= 48 && usableCue(clause)) candidates.push({ value: clause, score });
  });

  const picked = [];
  for (const candidate of candidates.sort((a, b) => b.score - a.score || a.value.length - b.value.length)) {
    if (picked.some(value => value.includes(candidate.value) || candidate.value.includes(value))) continue;
    if (picked.length && picked.join(' + ').length + candidate.value.length + 3 > 48) continue;
    picked.push(candidate.value);
    if (picked.length === 2 || picked.join(' + ').length >= 40) break;
  }
  if (!picked.length) picked.push(extractServices(text).find(term => term.length <= 48) || clauses.filter(clause => clause.length <= 48).at(-1) || text);
  return orderBySource(picked, questionZh);
}

function candidateAnswerParts(optionText, distractorTexts, maxLength = 58) {
  const text = normalize(optionText);
  const wrongText = compact(distractorTexts.join('\n'));
  const candidates = [];
  const complete = new Set(baseClauses(text));

  for (const term of extractServices(text)) {
    if (genericService.test(term) || term.length > maxLength || !usableCue(term)) continue;
    candidates.push({ value: term, score: wrongText.includes(compact(term)) ? 5 : 10 });
  }
  splitClauses(text).forEach(clause => {
    if (unfinishedPhrase.test(clause) || !usableCue(clause)) return;
    let score = wrongText.includes(compact(clause)) ? 1 : 5;
    if (actionSignals.test(clause)) score += 2;
    if (extractServices(clause).length) score += 3;
    if (/\d|多可用区|跨区域|跨账户|跨账号|只读|全局|私有|自动|按需|预留|故障转移|健康检查|生命周期|端点|策略|角色|权限/.test(clause)) score += 2;
    if (complete.has(clause)) score += 2;
    if (clause.length <= maxLength) candidates.push({ value: clause, score });
  });
  return candidates.sort((a, b) => b.score - a.score || a.value.length - b.value.length);
}

function shortestDistinctCues(candidates, distractorTexts, maxLength) {
  const values = [];
  for (const candidate of candidates) {
    if (candidate.value.length < 3) continue;
    if (values.some(item => item.value.includes(candidate.value) || candidate.value.includes(item.value))) continue;
    values.push(candidate);
  }
  const wrongTexts = distractorTexts.map(compact);
  const distinguishes = cues => !wrongTexts.some(text => cues.every(cue => text.includes(compact(cue))));
  const singles = values.filter(item => item.value.length <= maxLength && distinguishes([item.value]));
  if (singles.length) {
    singles.sort((a, b) => a.value.length - b.value.length || b.score - a.score);
    return [singles[0].value];
  }
  let bestPair = null;
  for (let left = 0; left < values.length; left += 1) {
    for (let right = left + 1; right < values.length; right += 1) {
      const cues = [values[left].value, values[right].value];
      const length = cues.join(' + ').length;
      if (length > maxLength || !distinguishes(cues)) continue;
      const score = values[left].score + values[right].score;
      if (!bestPair || length < bestPair.length || (length === bestPair.length && score > bestPair.score)) bestPair = { cues, length, score };
    }
  }
  if (bestPair) return bestPair.cues;
  let bestTriple = null;
  for (let first = 0; first < values.length; first += 1) {
    for (let second = first + 1; second < values.length; second += 1) {
      for (let third = second + 1; third < values.length; third += 1) {
        const cues = [values[first].value, values[second].value, values[third].value];
        const length = cues.join(' + ').length;
        if (length > maxLength || !distinguishes(cues)) continue;
        const score = values[first].score + values[second].score + values[third].score;
        if (!bestTriple || length < bestTriple.length || (length === bestTriple.length && score > bestTriple.score)) bestTriple = { cues, length, score };
      }
    }
  }
  if (bestTriple) return bestTriple.cues;
  return values.filter(item => item.value.length <= maxLength).slice(0, 1).map(item => item.value);
}

function extractAnswerCues(optionText, distractorTexts, maxLength) {
  const candidates = candidateAnswerParts(optionText, distractorTexts, maxLength);
  const picked = shortestDistinctCues(candidates, distractorTexts, maxLength);
  if (picked.length) return picked;
  const fallback = splitClauses(optionText).filter(clause => clause.length <= maxLength).sort((a, b) => a.length - b.length)[0]
    || extractServices(optionText).find(term => term.length <= maxLength && !genericService.test(term))
    || normalize(optionText);
  return [fallback];
}

function buildAvoid(correctOptions, wrongOptions, answerCues) {
  const correctText = compact(correctOptions.map(option => option.text_zh).join('\n'));
  let best = null;
  for (const option of wrongOptions) {
    const candidates = candidateAnswerParts(option.text_zh, correctOptions.map(item => item.text_zh));
    const wrongTerm = candidates.find(candidate => !correctText.includes(compact(candidate.value)));
    if (!wrongTerm) continue;
    const overlap = extractServices(option.text_zh).filter(term => correctText.includes(compact(term))).length;
    const score = overlap * 4 + wrongTerm.score;
    if (!best || score > best.score) best = { value: wrongTerm.value, score };
  }
  if (!best) return '核对题目限制与完整选项。';
  const text = `别选“${best.value}”。`;
  return text.length <= 45 ? text : '核对题目限制与完整选项。';
}

function validateOverride(q, override) {
  if (!override.questionCues && !override.answerCues) return;
  for (const cue of override.questionCues || []) {
    if (!normalize(q.question_zh).includes(normalize(cue))) throw new Error(`Q${q.id}: override question cue not found: ${cue}`);
  }
  for (const [letter, cues] of Object.entries(override.answerCues || {})) {
    const option = q.options.find(item => item.letter === letter);
    if (!q.correct_answers.includes(letter) || !option) throw new Error(`Q${q.id}: invalid override answer letter ${letter}`);
    for (const cue of cues) if (!normalize(option.text_zh).includes(normalize(cue))) throw new Error(`Q${q.id}${letter}: override answer cue not found: ${cue}`);
  }
}

function legacyMismatch(q, explanation) {
  const source = explanation?.solutions || explanation?.solution || '';
  const match = source.match(/^正确答案(?:是|为)?\s*([A-F](?:[\s+、与和,，]+[A-F])*)/);
  return Boolean(match) && match[1].match(/[A-F]/g).sort().join('') !== [...q.correct_answers].sort().join('');
}

function makeCard(q) {
  const correctOptions = q.options.filter(option => q.correct_answers.includes(option.letter));
  const wrongOptions = q.options.filter(option => !q.correct_answers.includes(option.letter));
  const override = overrides[q.id] || {};
  const automaticQuestionCues = extractQuestionCues(q.question_zh);
  const multi = q.correct_answers.length > 1;
  const orderedCorrectLetters = unique(correctOptions.map(option => option.letter));
  const defaultTargetLimit = multi ? 100 : 60;
  const targetLimit = override.targetLimit ?? defaultTargetLimit;
  if (!Number.isInteger(targetLimit) || targetLimit < defaultTargetLimit || targetLimit > (multi ? 100 : 80)) {
    throw new Error(`Q${q.id}: invalid curated target length budget`);
  }
  const labelOverhead = multi ? orderedCorrectLetters.length * 2 + Math.max(0, orderedCorrectLetters.length - 1) : 0;
  const perOptionLimit = targetLimit - labelOverhead;
  const automaticAnswerCues = Object.fromEntries(correctOptions.map(option => [
    option.letter,
    extractAnswerCues(option.text_zh, q.options.filter(item => item !== option).map(item => item.text_zh), perOptionLimit)
  ]));
  validateOverride(q, override);
  const questionCues = orderBySource(override.questionCues || automaticQuestionCues, q.question_zh);
  // Explicitly curated conditions are requirements, not candidates for further compression.
  const selectedAnswerCues = override.answerCues || automaticAnswerCues;
  const answerCues = Object.fromEntries(Object.entries(selectedAnswerCues).map(([letter, cues]) => {
    const options = correctOptions.filter(option => option.letter === letter);
    const sourceOption = options.find(option => cues.every(cue => compact(option.text_zh).includes(compact(cue)))) || options[0];
    return [letter, orderBySource(cues, sourceOption?.text_zh || '')];
  }));
  const target = orderedCorrectLetters.map(letter => {
    const words = answerCues[letter].join(' + ');
    return multi ? `${letter}：${words}` : words;
  }).join('；');
  const explanation = context.explanations[q.id] || {};
  const source = explanation.solutions || explanation.solution || '';
  const disputed = Boolean(context.disputes[q.id]) || /依题库|题库.*(?:有误|冲突|争议)|实务.*(?:更常|正解)/.test(source);
  const mismatch = legacyMismatch(q, explanation);
  const correctIsWrongSubset = correctOptions.some(correct => wrongOptions.some(wrong => compact(wrong.text_zh).includes(compact(correct.text_zh))));
  const needsCombinedCue = Object.values(answerCues).some(cues => cues.length > 1 &&
    cues.every(cue => wrongOptions.some(option => compact(option.text_zh).includes(compact(cue)))));
  const highRisk = disputed || mismatch || correctIsWrongSubset || needsCombinedCue || Boolean(override.avoid);
  const avoid = highRisk ? (override.avoid || buildAvoid(correctOptions, wrongOptions, answerCues)) : '';
  if (questionCues.join(' + ').length > 48 || target.length > targetLimit || avoid.length > 45) {
    throw new Error(`Q${q.id}: curated cues exceed their display budget; shorten the override without dropping required conditions`);
  }
  return {
    when: questionCues.join(' + '),
    target,
    avoid,
    questionCues,
    answerCues,
    disputed,
    legacyMismatch: mismatch
  };
}

const data = Object.fromEntries(context.questions.map(q => [q.id, makeCard(q)]));
fs.writeFileSync(
  path.join(root, 'quick_answer_cards.js'),
  '/* Per-question five-second cues. Every cue is traceable to the Simplified Chinese question bank. */\nconst QUICK_ANSWER_CARDS = ' + JSON.stringify(data, null, 2) + ';\n'
);
console.log(`Cards: ${Object.keys(data).length}`);

