const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const context = vm.createContext({ URL });
vm.runInContext([
  'sap_questions.js', 'sap_glossary.js', 'learning_review.js', 'study_guide_data.js', 'study_guide.js'
].map(file => fs.readFileSync(path.join(__dirname, file), 'utf8')).join('\n') + `
this.api = { chapters: STUDY_CHAPTERS, comparisons: STUDY_COMPARISONS, terms: studyTermMap,
  notes: STUDY_TERM_NOTES, related: getStudyRelatedQuestions, chapterQuestions: getStudyChapterQuestions,
  search: studySearchTerms, matches: studyMatchesQuery, termHtml: studyTermHtml,
  questionIds: CHOICE_QUESTIONS.map(q => q.id) };
`, context);
const api = context.api;
const comparisonIds = new Set(api.comparisons.map(item => item.id));
const questionIds = new Set(api.questionIds);
assert.equal(new Set(api.chapters.map(chapter => chapter.id)).size, api.chapters.length);
for (const chapter of api.chapters) {
  assert(chapter.goal && chapter.story && chapter.principles.length >= 3, `${chapter.id}: lesson incomplete`);
  assert(chapter.flow.length >= 3 && chapter.sources.length > 0, `${chapter.id}: visual or references missing`);
  assert(chapter.quiz.correct >= 0 && chapter.quiz.correct < chapter.quiz.choices.length, `${chapter.id}: invalid quiz`);
  assert(chapter.quiz.explanation.length > 20, `${chapter.id}: quiz needs a useful explanation`);
  for (const id of chapter.terms) {
    assert(api.terms.has(id), `${chapter.id}: missing term ${id}`);
    assert(api.notes[id]?.every(value => typeof value === 'string' && value.length > 6), `${id}: incomplete core card`);
  }
  for (const id of chapter.comparisons) assert(comparisonIds.has(id), `${chapter.id}: missing comparison ${id}`);
  const links = api.chapterQuestions(chapter);
  assert(links.length > 0 && links.every(id => questionIds.has(id)), `${chapter.id}: invalid related practice`);
}
for (const [id, term] of api.terms) {
  assert(term.definition && term.definition !== 'undefined', `${id}: missing definition`);
  const links = api.related(id);
  assert.equal(new Set(links).size, links.length, `${id}: duplicated question links`);
  assert(links.every(qid => questionIds.has(qid)), `${id}: invented question reference`);
}
assert.equal(api.search('S3')[0].id, 's3');
assert.equal(api.search('OU')[0].id, 'ou');
assert(!api.search('OU').some(term => term.id === 'route53'), 'OU must not match part of Route');
assert(!api.matches('Cloud Route', 'OU'));
assert(api.matches('S3 access without NAT', 'S3 NAT'));
assert(api.search('不存在的知识点xyz').length === 0);
const unsafe = { ...api.terms.get('s3'), definition: '<img src=x onerror=alert(1)>', notes: ['<script>alert(1)</script>', 'a', 'b'] };
assert(!api.termHtml(unsafe).includes('<img src=x') && !api.termHtml(unsafe).includes('<script>alert'));
console.log(`${api.chapters.length} chapters, ${Object.keys(api.notes).length} core cards, ${api.terms.size} searchable terms and ${api.comparisons.length} comparisons passed; related practice references are valid.`);
