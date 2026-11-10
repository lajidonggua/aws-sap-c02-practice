const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = __dirname;
const context = vm.createContext({});
vm.runInContext(
  ['sap_questions.js', 'quick_answer_cards.js', 'flash_cards.js']
    .map(file => fs.readFileSync(path.join(root, file), 'utf8'))
    .join('\n') + ';this.questions=CHOICE_QUESTIONS;this.cards=QUICK_ANSWER_CARDS;this.flashCards=FLASH_CARDS;this.flashAnswerWords=flashAnswerWords;',
  context
);

const questions = Array.from(context.questions);
const cards = context.cards;
const overrides = JSON.parse(fs.readFileSync(path.join(root, 'quick_overrides.json'), 'utf8'));
const quickRenderContext = vm.createContext({ document: { getElementById: () => null } });
const quickPrefix = fs.readFileSync(path.join(root, 'quick.js'), 'utf8').split('const ALL_REVIEW_CARDS')[0];
vm.runInContext(quickPrefix + ';this.renderAvoidForTest=typeof renderAvoid === "function" ? renderAvoid : null;', quickRenderContext);
const reviewRenderContext = vm.createContext({});
vm.runInContext(
  fs.readFileSync(path.join(root, 'twenty_review.js'), 'utf8') +
  ';this.renderTwentyAvoidForTest=typeof renderTwentyAvoid === "function" ? renderTwentyAvoid : null;',
  reviewRenderContext
);
const flashRenderContext = vm.createContext({});
const flashPrefix = fs.readFileSync(path.join(root, 'flash.js'), 'utf8').split('function renderFlash(){')[0];
vm.runInContext(flashPrefix + ';this.renderFlashAvoidForTest=typeof renderFlashAvoid === "function" ? renderFlashAvoid : null;', flashRenderContext);
const failures = [];
const nearLimit = [];
const neutralAvoid = [];
const repeatedAnswerCues = [];
const fieldLimits = { when: 48, avoid: 45 };
const questionCueOwners = new Map();
const whenOwners = new Map();

function check(condition, message) {
  if (!condition) failures.push(message);
}

function normalize(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function compact(value) {
  return normalize(value).replace(/\s+/g, '');
}

function isNondecreasing(values) {
  return values.every((value, index) => index === 0 || value >= values[index - 1]);
}

function isWholeSourcePhrase(cue, source) {
  const needle = normalize(cue);
  const haystack = normalize(source);
  let at = haystack.indexOf(needle);
  while (at !== -1) {
    const before = haystack[at - 1] || '';
    const after = haystack[at + needle.length] || '';
    const startsMidWord = /[A-Za-z0-9]/.test(before) && /^[A-Za-z0-9]/.test(needle);
    const endsMidWord = /[A-Za-z0-9]$/.test(needle) && /[A-Za-z0-9]/.test(after);
    if (!startsMidWord && !endsMidWord) return true;
    at = haystack.indexOf(needle, at + 1);
  }
  return false;
}

const genericAnswerCue = /^(?:iam|dns|http|https|ssl|tls|ec2|s3|rds|vpc|ecs|eks|alb|nlb|vpn|nat)$/i;
const unfinishedCue = /(?:和|与|及|以|为|将|从|到|在)$/;
const genericQuestionCue = /哪一种解决方案|哪些操作组合|应该执行哪些操作|应该采取哪一组操作|可以满足这些要求$|解决方案架构师需要$|该服务必须$/;
const officialEnglishName = /^(?:"Principal":.*|(?:(?:Amazon|AWS)\s+[^。！？!?]{2,60}|[A-Za-z0-9]+:[A-Za-z0-9*]+|[A-Z][A-Z0-9-]{1,8}|FSx|(?:Application Load Balancer|Network Load Balancer|Route 53|Direct Connect|Transit Gateway|Gateway Load Balancer|API Gateway|CloudFront|CloudFormation|CloudWatch|DynamoDB|Lambda@Edge|Lambda|Aurora|ElastiCache|PrivateLink|Auto Scaling|Multi-AZ|Fargate|OpenSearch|Redshift|QuickSight|GuardDuty|Inspector|Macie|Config|Cognito|AppSync|EventBridge|DataSync|SageMaker|Bedrock)))$/;

check(questions.length === 529, `expected 529 questions, got ${questions.length}`);
check(Object.keys(cards).length === questions.length, `expected ${questions.length} cards, got ${Object.keys(cards).length}`);

for (const q of questions) {
  const card = cards[q.id];
  check(Boolean(card), `Q${q.id}: missing card`);
  if (!card) continue;

  for (const field of ['when', 'target']) {
    check(typeof card[field] === 'string' && card[field].trim(), `Q${q.id}: missing ${field}`);
  }
  check(typeof card.avoid === 'string', `Q${q.id}: avoid must be a string`);

  check(Array.isArray(card.questionCues) && card.questionCues.length >= 1, `Q${q.id}: missing questionCues`);
  check(card.questionCues.length <= 2, `Q${q.id}: too many question cues (${card.questionCues.length})`);
  const questionText = normalize(q.question_zh);
  for (const cue of card.questionCues || []) {
    check(questionText.includes(normalize(cue)), `Q${q.id}: question cue not found: ${JSON.stringify(cue)}`);
    check(isWholeSourcePhrase(cue, q.question_zh), `Q${q.id}: question cue cuts through a word: ${JSON.stringify(cue)}`);
    check(!genericQuestionCue.test(normalize(cue)), `Q${q.id}: question cue repeats the generic prompt: ${JSON.stringify(cue)}`);
    check(/[\u3400-\u9fff]/.test(cue) || officialEnglishName.test(cue), `Q${q.id}: question cue is not Simplified Chinese or a product name: ${JSON.stringify(cue)}`);
  }
  const questionPositions = (card.questionCues || []).map(cue => normalize(q.question_zh).indexOf(normalize(cue)));
  check(isNondecreasing(questionPositions), `Q${q.id}: question cues are not in source order: ${JSON.stringify(questionPositions)}`);
  const sourceKey = compact(q.question_zh);
  for (const cue of card.questionCues || []) {
    const key = compact(cue);
    if (!questionCueOwners.has(key)) questionCueOwners.set(key, []);
    questionCueOwners.get(key).push({ id: q.id, sourceKey });
  }
  const whenKey = compact(card.when);
  if (!whenOwners.has(whenKey)) whenOwners.set(whenKey, []);
  whenOwners.get(whenKey).push({ id: q.id, sourceKey });

  check(card.answerCues && typeof card.answerCues === 'object', `Q${q.id}: missing answerCues`);
  const cueLetters = Object.keys(card.answerCues || {}).sort();
  const answerLetters = Array.from(q.correct_answers).sort();
  check(JSON.stringify(cueLetters) === JSON.stringify(answerLetters), `Q${q.id}: answer cue letters ${cueLetters} != ${answerLetters}`);
  for (const letter of answerLetters) {
    const options = Array.from(q.options).filter(item => item.letter === letter);
    const cues = card.answerCues?.[letter];
    check(Array.isArray(cues) && cues.length >= 1, `Q${q.id}${letter}: missing answer cue`);
    for (const cue of cues || []) {
      check(options.some(option => normalize(option.text_zh).includes(normalize(cue))), `Q${q.id}${letter}: answer cue not found: ${JSON.stringify(cue)}`);
      check(options.some(option => isWholeSourcePhrase(cue, option.text_zh)), `Q${q.id}${letter}: answer cue cuts through a word: ${JSON.stringify(cue)}`);
      check(!genericAnswerCue.test(normalize(cue)), `Q${q.id}${letter}: answer cue is too generic: ${JSON.stringify(cue)}`);
      check(!unfinishedCue.test(normalize(cue)), `Q${q.id}${letter}: answer cue is unfinished: ${JSON.stringify(cue)}`);
      check(/[\u3400-\u9fff]/.test(cue) || officialEnglishName.test(cue), `Q${q.id}${letter}: answer cue is not Simplified Chinese or a product name: ${JSON.stringify(cue)}`);
    }
    const sourceOption = options.find(option => (cues || []).every(cue => compact(option.text_zh).includes(compact(cue))));
    if (sourceOption) {
      const answerPositions = (cues || []).map(cue => normalize(sourceOption.text_zh).indexOf(normalize(cue)));
      check(isNondecreasing(answerPositions), `Q${q.id}${letter}: answer cues are not in source order: ${JSON.stringify(answerPositions)}`);
    }
    if (q.correct_answers.length > 1 && !(q.id === 160 && letter === 'A')) {
      const matchingOptions = Array.from(q.options).filter(option => (cues || []).every(cue => compact(option.text_zh).includes(compact(cue))));
      check(matchingOptions.length === 1, `Q${q.id}${letter}: answer cues do not identify one specific option`);
    }
    if (new Set(cues || []).size !== (cues || []).length) repeatedAnswerCues.push(`${q.id}${letter}`);
  }
  const orderedLetters = [...new Set(Array.from(q.options).filter(option => q.correct_answers.includes(option.letter)).map(option => option.letter))];
  const orderedTarget = orderedLetters.map(letter => {
    const words = (card.answerCues?.[letter] || []).join(' + ');
    return orderedLetters.length > 1 ? `${letter}：${words}` : words;
  }).join('；');
  check(card.target === orderedTarget, `Q${q.id}: target does not follow option order`);

  check(card.when.length <= fieldLimits.when, `Q${q.id}: when too long (${card.when.length})`);
  const defaultTargetLimit = q.correct_answers.length > 1 ? 100 : 60;
  const targetLimit = overrides[q.id]?.targetLimit ?? defaultTargetLimit;
  check(targetLimit >= defaultTargetLimit && targetLimit <= (q.correct_answers.length > 1 ? 100 : 80), `Q${q.id}: invalid manual length budget`);
  check(card.target.length <= targetLimit, `Q${q.id}: target too long (${card.target.length} > ${targetLimit})`);
  check(card.avoid.length <= fieldLimits.avoid, `Q${q.id}: avoid too long (${card.avoid.length})`);
  check(!/[唔冇悭喺嘅]/.test(card.when + card.target + card.avoid), `Q${q.id}: Cantonese wording remains`);
  check(!/[於]/.test(card.when + card.target + card.avoid), `Q${q.id}: traditional Chinese remains`);

  const nearFields = Object.entries(fieldLimits)
    .filter(([field, limit]) => card[field].length >= Math.ceil(limit * 0.99))
    .map(([field]) => field);
  if (nearFields.length) nearLimit.push(`${q.id}:${nearFields.join('+')}`);
  if (card.avoid === '按题目限制核对完整选项。') neutralAvoid.push(q.id);
  const correctOptionsForRisk = Array.from(q.options).filter(option => q.correct_answers.includes(option.letter));
  const wrongOptionsForRisk = Array.from(q.options).filter(option => !q.correct_answers.includes(option.letter));
  const correctIsWrongSubset = correctOptionsForRisk.some(correct => wrongOptionsForRisk.some(wrong => compact(wrong.text_zh).includes(compact(correct.text_zh))));
  const needsCombinedCue = answerLetters.some(letter => {
    const cues = card.answerCues?.[letter] || [];
    return cues.length > 1 && cues.every(cue => wrongOptionsForRisk.some(option => compact(option.text_zh).includes(compact(cue))));
  });
  const highRisk = card.disputed || card.legacyMismatch || correctIsWrongSubset || needsCombinedCue || Boolean(overrides[q.id]?.avoid);
  check(highRisk ? Boolean(card.avoid.trim()) : card.avoid === '', `Q${q.id}: avoid visibility does not match risk level`);
  const avoided = card.avoid.match(/^别选“(.+)”；认准/);
  if (avoided) {
    const wrongOptions = Array.from(q.options).filter(option => !q.correct_answers.includes(option.letter));
    const correctOptions = Array.from(q.options).filter(option => q.correct_answers.includes(option.letter));
    check(wrongOptions.some(option => isWholeSourcePhrase(avoided[1], option.text_zh)), `Q${q.id}: avoid cue cuts through a wrong option word: ${JSON.stringify(avoided[1])}`);
    check(!correctOptions.some(option => compact(option.text_zh).includes(compact(avoided[1]))), `Q${q.id}: avoid cue also describes a correct option: ${JSON.stringify(avoided[1])}`);
  }
  check(context.flashCards[q.id]?.when === card.when, `Q${q.id}: flash when overrides generated card`);
  check(context.flashCards[q.id]?.target === card.target, `Q${q.id}: flash target overrides generated card`);
  const expectedFlashWords = card.target.replace(/(^|[；;])\s*[A-F]\s*[：:]\s*/g, '$1').trim();
  check(context.flashAnswerWords(card.target) === expectedFlashWords, `Q${q.id}: flash answer words damage target text`);

  const subsetRiskLetters = new Set(['72:B', '99:B', '160:A']);
  if (true) {
    const wrongOptions = Array.from(q.options).filter(option => !q.correct_answers.includes(option.letter));
    for (const letter of answerLetters) {
      const cues = card.answerCues?.[letter] || [];
      if (!subsetRiskLetters.has(`${q.id}:${letter}`)) {
        check(!wrongOptions.some(option => cues.every(cue => compact(option.text_zh).includes(compact(cue)))), `Q${q.id}${letter}: answer cues do not distinguish a wrong option`);
      }
    }
  }
}

for (const q of questions) {
  const cues = cards[q.id].questionCues;
  const matchingSources = questions.filter(candidate => cues.every(cue => compact(candidate.question_zh).includes(compact(cue))));
  const distinctSources = new Set(matchingSources.map(candidate => compact(candidate.question_zh)));
  check(distinctSources.size === 1, `Q${q.id}: complete question cue set also matches Q${matchingSources.filter(candidate => candidate.id !== q.id).map(candidate => candidate.id).join('/Q')}`);
}

for (const [when, owners] of whenOwners) {
  const distinctSources = new Set(owners.map(owner => owner.sourceKey));
  check(distinctSources.size === 1, `Q${owners.map(owner => owner.id).join('/Q')}: different questions share the same complete question cues: ${JSON.stringify(when)}`);
}

for (const [cue, owners] of questionCueOwners) {
  const distinctSources = new Set(owners.map(owner => owner.sourceKey));
  if (distinctSources.size <= 1) continue;
  for (const owner of owners) {
    const card = cards[owner.id];
    const hasUniqueContext = card.questionCues.some(candidate => {
      const candidateOwners = questionCueOwners.get(compact(candidate)) || [];
      return new Set(candidateOwners.map(item => item.sourceKey)).size === 1;
    });
    check(hasUniqueContext, `Q${owner.id}: repeated question cue lacks unique context: ${JSON.stringify(cue)}`);
  }
}

for (const id of [1, 5, 6]) check(Boolean(cards[id]), `representative Q${id}: missing`);
check(cards[4]?.target.includes('粘性会话') && cards[4]?.target.includes('Aurora Replicas') && cards[4]?.target.includes('Auto Scaling'), 'Q4: preserve sticky sessions and Aurora read scaling');
check(cards[2]?.target.includes('故障转移记录') && cards[2]?.target.includes('全局表'), 'Q2: preserve both failover routing and data replication');
check(cards[6]?.target.includes('Principal') && cards[6]?.target.includes('在Account B中') && cards[6]?.target.includes('s3:ListBucket'), 'Q6: target must distinguish the bucket policy and user permission options');
check(cards[1]?.when.includes('本地系统应该能够解析') && cards[1]?.when.includes('所有VPC应该能够解析'), 'Q1: question cues must retain both DNS requirements');
check(cards[471]?.when.includes('防火墙设备需要能够水平扩展'), 'Q471: question cue must retain the horizontal-scaling requirement');
check(cards[240]?.when.includes('AWS Region 内的高可用性') && cards[240]?.when.includes('1 分钟内故障转移'), 'Q240: question cues must retain high availability and one-minute failover requirements');
check(cards[411]?.target === 'Amazon Cognito', 'Q411: compressed answer must retain the literal spaced product name');
check(cards[86]?.target.includes('交换暂存环境和生产环境 URL'), 'Q86: answer cue must retain the deployment action, not a connector fragment');
check(cards[144]?.target.includes('update-le-system 指令增加容量'), 'Q144: answer cue must retain the capacity action, not a generic connector fragment');
check(cards[360]?.target.includes('AWS Service Catalog'), 'Q360: answer cue must retain the identifying service, not a connector fragment');
check(context.flashAnswerWords('AWS Backup') === 'AWS Backup', 'flash answer words must preserve an unlabeled AWS product name');
check(typeof quickRenderContext.renderAvoidForTest === 'function', 'keyword cards need an avoid renderer');
if (quickRenderContext.renderAvoidForTest) {
  check(quickRenderContext.renderAvoidForTest('') === '', 'ordinary cards must not render an empty avoid block');
  check(quickRenderContext.renderAvoidForTest('核对限制').includes('③ 别踩这个坑：') && quickRenderContext.renderAvoidForTest('核对限制').includes('核对限制'), 'high-risk cards must render their avoid hint');
}
check(typeof reviewRenderContext.renderTwentyAvoidForTest === 'function', 'twenty-second review needs an avoid renderer');
if (reviewRenderContext.renderTwentyAvoidForTest) {
  check(reviewRenderContext.renderTwentyAvoidForTest('') === '', 'ordinary cards must not render an empty twenty-second avoid block');
  check(reviewRenderContext.renderTwentyAvoidForTest('核对限制').includes('分不清时看易错点'), 'high-risk cards must render the twenty-second avoid hint');
}
check(typeof flashRenderContext.renderFlashAvoidForTest === 'function', 'flash mode needs an avoid renderer');
if (flashRenderContext.renderFlashAvoidForTest) {
  check(flashRenderContext.renderFlashAvoidForTest('') === '', 'ordinary cards must not render an empty flash avoid paragraph');
  check(flashRenderContext.renderFlashAvoidForTest('核对限制').includes('别选错：'), 'high-risk cards must render the flash avoid hint');
}
check(cards[411]?.avoid === '', 'Q411: ordinary single-cue card should not show an avoid hint');
for (const id of [72, 99, 160]) check(Boolean(cards[id]?.avoid), `Q${id}: subset-risk card must retain an avoid hint`);
for (const q of questions) {
  if (!overrides[q.id]?.avoid) check(!cards[q.id].avoid.includes('认准“'), `Q${q.id}: automatic avoid hint repeats the answer cue`);
}
const threeAnswer = questions.find(q => q.correct_answers.length === 3);
check(Boolean(threeAnswer), 'missing representative three-answer question');
if (threeAnswer) check(Object.keys(cards[threeAnswer.id]?.answerCues || {}).length === 3, `Q${threeAnswer.id}: three-answer cues incomplete`);


// Manual overrides encode reviewed conditions; the generator must not silently delete them.
for (const [id, override] of Object.entries(overrides)) {
  for (const [letter, cues] of Object.entries(override.answerCues || {})) {
    for (const cue of cues) check(cards[id]?.answerCues?.[letter]?.includes(cue), `Q${id}${letter}: required manual cue was removed: ${cue}`);
  }
}
check(cards[28]?.when.includes('HTTP 和 HTTPS') && cards[28]?.target.includes('ACM') && cards[28]?.target.includes('主题备用名称'), 'Q28: preserve redirect protocols, certificate service and domain coverage');
check(cards[51]?.target.includes('重新上传') && cards[51]?.target.includes('KMS'), 'Q51: preserve existing-object encryption action');
check(cards[518]?.target.includes('自动修复') && cards[518]?.target.includes('始终加密新的 EBS 卷'), 'Q518: preserve remediation and prevention');

const averageTotalLength = Object.values(cards).reduce((sum, card) => sum + card.when.length + card.target.length + card.avoid.length, 0) / questions.length;
check(averageTotalLength <= 118.65, `average card length too high (${averageTotalLength.toFixed(1)} > 118.65)`);

if (failures.length) {
  console.error(failures.slice(0, 40).join('\n'));
  if (failures.length > 40) console.error(`... ${failures.length - 40} more failures`);
  process.exit(1);
}

const multi = questions.filter(q => q.correct_answers.length > 1).length;
const disputed = Object.values(cards).filter(card => card.disputed || card.legacyMismatch).length;
console.log(`${questions.length} cards passed`);
console.log(`single=${questions.length - multi} multi=${multi} disputed=${disputed}`);
console.log(`nearLimit=${nearLimit.join(',') || 'none'}`);
console.log(`neutralAvoid=${neutralAvoid.join(',') || 'none'}`);
console.log(`repeatedAnswerCues=${repeatedAnswerCues.join(',') || 'none'}`);
console.log(`averageTotalLength=${averageTotalLength.toFixed(1)}`);
