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
const failures = [];
const nearLimit = [];
const neutralAvoid = [];
const repeatedAnswerCues = [];
const fieldLimits = { when: 70, target: 140, avoid: 70 };

function check(condition, message) {
  if (!condition) failures.push(message);
}

function normalize(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function compact(value) {
  return normalize(value).replace(/\s+/g, '');
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
const officialEnglishName = /^(?:"Principal":.*|(?:(?:Amazon|AWS)\s+[^。！？!?]{2,60}|[A-Za-z0-9]+:[A-Za-z0-9*]+|[A-Z][A-Z0-9-]{1,8}|FSx|(?:Route 53|Direct Connect|Transit Gateway|Gateway Load Balancer|API Gateway|CloudFront|CloudFormation|CloudWatch|DynamoDB|Lambda@Edge|Lambda|Aurora|ElastiCache|PrivateLink|Auto Scaling|Multi-AZ|Fargate|OpenSearch|Redshift|QuickSight|GuardDuty|Inspector|Macie|Config|Cognito|AppSync|EventBridge|DataSync|SageMaker|Bedrock)))$/;

check(questions.length === 529, `expected 529 questions, got ${questions.length}`);
check(Object.keys(cards).length === questions.length, `expected ${questions.length} cards, got ${Object.keys(cards).length}`);

for (const q of questions) {
  const card = cards[q.id];
  check(Boolean(card), `Q${q.id}: missing card`);
  if (!card) continue;

  for (const field of ['when', 'target', 'avoid']) {
    check(typeof card[field] === 'string' && card[field].trim(), `Q${q.id}: missing ${field}`);
  }

  check(Array.isArray(card.questionCues) && card.questionCues.length >= 1, `Q${q.id}: missing questionCues`);
  const questionText = normalize(q.question_zh);
  for (const cue of card.questionCues || []) {
    check(questionText.includes(normalize(cue)), `Q${q.id}: question cue not found: ${JSON.stringify(cue)}`);
    check(isWholeSourcePhrase(cue, q.question_zh), `Q${q.id}: question cue cuts through a word: ${JSON.stringify(cue)}`);
    check(!genericQuestionCue.test(normalize(cue)), `Q${q.id}: question cue repeats the generic prompt: ${JSON.stringify(cue)}`);
    check(/[\u3400-\u9fff]/.test(cue) || officialEnglishName.test(cue), `Q${q.id}: question cue is not Simplified Chinese or a product name: ${JSON.stringify(cue)}`);
  }

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
    if (new Set(cues || []).size !== (cues || []).length) repeatedAnswerCues.push(`${q.id}${letter}`);
  }

  check(card.when.length <= fieldLimits.when, `Q${q.id}: when too long (${card.when.length})`);
  check(card.target.length <= fieldLimits.target, `Q${q.id}: target too long (${card.target.length})`);
  check(card.avoid.length <= fieldLimits.avoid, `Q${q.id}: avoid too long (${card.avoid.length})`);
  check(!/[唔冇悭喺嘅]/.test(card.when + card.target + card.avoid), `Q${q.id}: Cantonese wording remains`);
  check(!/[於]/.test(card.when + card.target + card.avoid), `Q${q.id}: traditional Chinese remains`);

  const nearFields = Object.entries(fieldLimits)
    .filter(([field, limit]) => card[field].length >= Math.ceil(limit * 0.99))
    .map(([field]) => field);
  if (nearFields.length) nearLimit.push(`${q.id}:${nearFields.join('+')}`);
  if (card.avoid === '按题目限制核对完整选项。') neutralAvoid.push(q.id);
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

  if (![72, 99, 160].includes(q.id)) {
    const wrongOptions = Array.from(q.options).filter(option => !q.correct_answers.includes(option.letter));
    for (const letter of answerLetters) {
      const cues = card.answerCues?.[letter] || [];
      check(!wrongOptions.some(option => cues.every(cue => compact(option.text_zh).includes(compact(cue)))), `Q${q.id}${letter}: answer cues do not distinguish a wrong option`);
    }
  }
}

for (const id of [1, 5, 6]) check(Boolean(cards[id]), `representative Q${id}: missing`);
check(cards[4]?.target.includes('粘性会话') && cards[4]?.target.includes('Aurora Replicas'), 'Q4: target must retain both scaling and sticky-session option words');
check(cards[6]?.target.includes('Principal') && cards[6]?.target.includes('User_DataProcessor') && cards[6]?.target.includes('s3:ListBucket'), 'Q6: target must distinguish the bucket policy and user permission options');
check(cards[1]?.when.includes('本地系统应该能够解析') && cards[1]?.when.includes('所有VPC应该能够解析'), 'Q1: question cues must retain both DNS requirements');
check(cards[471]?.when.includes('防火墙设备需要能够水平扩展'), 'Q471: question cue must retain the horizontal-scaling requirement');
check(cards[240]?.when.includes('AWS Region 内的高可用性') && cards[240]?.when.includes('1 分钟内故障转移'), 'Q240: question cues must retain high availability and one-minute failover requirements');
check(context.flashAnswerWords('AWS Backup') === 'AWS Backup', 'flash answer words must preserve an unlabeled AWS product name');
const threeAnswer = questions.find(q => q.correct_answers.length === 3);
check(Boolean(threeAnswer), 'missing representative three-answer question');
if (threeAnswer) check(Object.keys(cards[threeAnswer.id]?.answerCues || {}).length === 3, `Q${threeAnswer.id}: three-answer cues incomplete`);

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
