'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const context = vm.createContext({ URL });
vm.runInContext([
  'sap_questions.js', 'sap_explanations.js', 'sap_glossary.js',
  'quick_answer_cards.js', 'flash_cards.js', 'learning_review.js',
  'study_guide_data.js', 'learning_path_data.js'
].map(file => fs.readFileSync(path.join(__dirname, file), 'utf8')).join('\n') + `
this.content = { path: SAP_PATH, questions: CHOICE_QUESTIONS, chapters: STUDY_CHAPTERS, lesson: getLearningLesson };
`, context);
const { path: route, questions, chapters, lesson } = context.content;
const stageIds = new Set(route.stages.map(s => s.id));
const lessonIds = new Set(route.lessons.map(l => l.id));
const chapterIds = new Set(chapters.map(c => c.id));
const questionMap = new Map(questions.map(q => [q.id, q]));
assert.equal(route.stages.length, 8);
assert.equal(route.lessons.length, 24);
assert.equal(lessonIds.size, route.lessons.length, 'Lesson ids must be unique for saved progress');
assert.equal(stageIds.size, route.stages.length);
let previousStage = -1;
let linked = 0;
for (const card of route.lessons) {
  const label = card.id;
  assert(/^[a-z][a-z0-9-]+$/.test(label), 'Lesson id must work in URLs and progress cells');
  const currentStage = route.stages.findIndex(s => s.id === card.stage);
  assert(currentStage >= previousStage, label + ': prerequisite stages must stay ordered');
  assert(stageIds.has(card.stage), label + ': missing stage');
  previousStage = currentStage;
  assert(chapterIds.has(card.chapter), label + ': broken reference chapter');
  for (const name of ['title', 'goal', 'recall']) assert(typeof card[name] === 'string' && card[name].trim(), label + ': ' + name);
  assert.equal(card.points.length, 3, label + ': keep concepts short');
  assert(card.terms.length >= 2 && card.terms.length <= 4, label + ': limit new jargon');
  assert(card.terms.every(t => t.name && t.meaning), label + ': unexplained term');
  assert(card.flow.length >= 3 && card.flow.length <= 5, label + ': readable flow');
  assert(card.contrast.a && card.contrast.b && card.contrast.rule, label + ': comparison needs a decision boundary');
  const quiz = card.quiz;
  assert.equal(quiz.options.length, 3, label + ': quiz option count');
  assert.equal(new Set(quiz.options).size, 3, label + ': duplicate options');
  assert(Number.isInteger(quiz.answer) && quiz.answer >= 0 && quiz.answer < quiz.options.length, label + ': answer out of range');
  assert.equal(quiz.explanations.length, quiz.options.length, label + ': each choice needs feedback');
  assert(quiz.explanations.every(t => typeof t === 'string' && t.trim()), label + ': empty feedback');
  assert(quiz.change, label + ': needs a changed-condition check');
  assert(card.questions.length <= 3, label + ': short practice must stay small');
  assert.equal(new Set(card.questions).size, card.questions.length, label + ': duplicate linked question');
  for (const qid of card.questions) {
    const question = questionMap.get(qid);
    assert(question, label + ': linked question does not exist: ' + qid);
    assert(!lesson(question).uncertain, label + ': disputed answer must not be a beginner recommendation: ' + qid);
    linked++;
  }
}
for (const stage of route.stages) assert.equal(route.lessons.filter(l => l.stage === stage.id).length, 3, stage.id);
assert.equal(route.lessons[0].questions.length, 0, 'First architecture lesson should not force advanced bank questions');
assert.equal(new Set(route.lessons.map(l => l.quiz.answer)).size, 3, 'Avoid every original quiz having the same answer position');
for (const source of route.sources) assert.equal(new URL(source.url).hostname, 'docs.aws.amazon.com');
console.log(`Learning path content passed: 24 lessons, 8 ordered stages, ${linked} verified bank links, 24 original scenarios.`);
