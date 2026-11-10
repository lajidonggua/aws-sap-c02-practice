const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const context = vm.createContext({ URL });
vm.runInContext([
  'sap_questions.js', 'sap_explanations.js', 'sap_glossary.js',
  'quick_answer_cards.js', 'flash_cards.js', 'learning_review.js', 'twenty_review.js'
].map(file => fs.readFileSync(path.join(__dirname, file), 'utf8')).join('\n') + `
this.api = { questions: CHOICE_QUESTIONS, lesson: getLearningLesson, html: buildTwentyReview, review: buildLearningReview, plain: learningPlain };
`, context);

const { questions, lesson, html, plain } = context.api;
let uncertain = 0;
for (const q of questions) {
  const model = lesson(q);
  const rendered = html(q);
  assert(model.terms.length > 0, `Q${q.id}: no relevant term explanations`);
  assert(model.steps.length > 0, `Q${q.id}: no reasoning steps`);
  assert(model.requirements.length > 0, `Q${q.id}: no requirements`);
  for (const title of ['本题知识点', '名词解释', '图文理解', '理解自测']) {
    assert(rendered.includes(title), `Q${q.id}: missing ${title}`);
  }
  assert(!rendered.includes('[object Object]'), `Q${q.id}: invalid content`);
  assert(!model.terms.some(t => ['aws', 'amazon'].includes(t.id)), 'Generic brand names must not displace useful terms');
  if (model.uncertain) {
    uncertain++;
    assert(!rendered.includes('pre class="learning-mermaid"'), `Q${q.id}: conflicting architecture was presented as a solution`);
    assert(rendered.includes('lesson-caution'), `Q${q.id}: answer uncertainty was hidden`);
  } else {
    assert(rendered.includes('pre class="learning-mermaid"'), `Q${q.id}: solution diagram missing`);
  }
}

const q1 = lesson(questions.find(q => q.id === 1));
assert(q1.terms.slice(0, 4).some(t => t.id === 'route53-inbound-resolver'));
assert(q1.terms.slice(0, 4).some(t => t.id === 'route53-private-hosted-zone'));
assert(!q1.terms.some(t => t.id === 'ou'), 'OU must not match part of Route');
const q73 = lesson(questions.find(q => q.id === 73));
assert(q73.terms.some(t => t.id === 'iot-core'), 'IoT question needs an actual IoT definition');
const q529 = lesson(questions.find(q => q.id === 529));
assert(q529.terms.slice(0, 4).some(t => t.id === 'vpc-gateway-endpoint'));
assert(!q529.terms.some(t => t.id === 'vpc-interface-endpoint'), 'Generic VPC endpoint text must not imply interface endpoint');
assert(q529.terms.some(t => t.id === 'capacity-reservation'));
assert(plain('同步资料与相同网路') === '同步数据与相同网络', 'Plain-language edits must preserve words such as 同步 and 相同');
const unsafe = { ...questions[0], id: 999999, question_zh: '<img src=x onerror=alert(1)>', options: [{ letter: 'A', text: 'S3', text_zh: '<script>alert(1)</script>' }] };
const unsafeHtml = context.api.review(unsafe);
assert(!unsafeHtml.includes('<img src=x') && !unsafeHtml.includes('<script>alert'), 'Question text must be escaped');
console.log(`${questions.length} beginner lessons passed; ${uncertain} uncertain questions clearly separated from normal solution diagrams.`);
