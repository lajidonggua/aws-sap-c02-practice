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
const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
let uncertain = 0;
for (const q of questions) {
  const model = lesson(q);
  const rendered = html(q);
  assert(model.terms.length > 0, `Q${q.id}: no relevant term explanations`);
  assert(model.steps.length > 0, `Q${q.id}: no reasoning steps`);
  assert(model.requirements.length > 0, `Q${q.id}: no requirements`);
  const titles = q.answer_audit ? ['为什么这样选', '名词解释', '跟着判断过程', '用一句话检验理解'] : ['本题知识点', '名词解释', '图文理解', '理解自测'];
  for (const title of titles) {
    assert(rendered.includes(title), `Q${q.id}: missing ${title}`);
  }
  assert(!rendered.includes('[object Object]'), `Q${q.id}: invalid content`);
  assert(!model.terms.some(t => ['aws', 'amazon'].includes(t.id)), 'Generic brand names must not displace useful terms');
  if (q.answer_audit) {
    const audit = q.answer_audit;
    assert(rendered.includes('lesson-check-flow'), `Q${q.id}: audited reasoning flow missing`);
    assert(rendered.includes('校对使用的英文原题'), `Q${q.id}: original conditions unavailable`);
    assert(rendered.includes(escape(q.question)), `Q${q.id}: English question was lost`);
    assert(rendered.includes(escape(audit.summary)), `Q${q.id}: audited rationale hidden`);
    assert((audit.sources || []).length > 0, `Q${q.id}: no traceable audit evidence`);
    for (const option of q.options) {
      assert(audit.optionReasons?.[option.letter], `Q${q.id}${option.letter}: no audited option reasoning`);
      assert(rendered.includes(escape(audit.optionReasons[option.letter])), `Q${q.id}${option.letter}: audited option reasoning hidden`);
    }
    for (const source of audit.sources) {
      assert(rendered.includes(`href="${escape(source.url)}"`), `Q${q.id}: reference link missing`);
    }
    if (audit.caveat) assert(rendered.includes(escape(audit.caveat)), `Q${q.id}: limitation hidden`);
    assert(!rendered.includes('pre class="learning-mermaid"'), `Q${q.id}: superseded architecture presented`);
    assert(!rendered.includes('正在绘制示意图') && !rendered.includes('此题暂无架构图'), `Q${q.id}: empty architecture placeholder`);
    assert(!rendered.includes('仅按题库记') && !rendered.includes('社区：'), `Q${q.id}: historical vote overrides audit`);
    if (model.uncertain) {
      uncertain++;
      assert(rendered.includes('lesson-caution') && rendered.includes('参考建议'), `Q${q.id}: uncertainty hidden`);
    }
  } else if (model.uncertain) {
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
if (!questions.find(q => q.id === 529).answer_audit) {
  assert(q529.terms.some(t => t.id === 'capacity-reservation'));
} else {
  assert(questions.find(q => q.id === 529).correct_answers.join('') === 'AE', 'Q529 uses the calibrated gateway endpoint and Savings Plans combination');
}
assert(plain('同步资料与相同网路') === '同步数据与相同网络', 'Plain-language edits must preserve words such as 同步 and 相同');
const unsafe = { ...questions[0], id: 999999, question_zh: '<img src=x onerror=alert(1)>', options: [{ letter: 'A', text: 'S3', text_zh: '<script>alert(1)</script>' }] };
const unsafeHtml = context.api.review(unsafe);
assert(!unsafeHtml.includes('<img src=x') && !unsafeHtml.includes('<script>alert'), 'Question text must be escaped');
console.log(`${questions.length} beginner lessons passed; ${uncertain} uncertain questions disclosed; audited evidence and legacy solution behavior verified.`);
