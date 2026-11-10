const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const context = vm.createContext({ URLSearchParams });
vm.runInContext([
  'sap_questions.js', 'sap_glossary.js', 'learning_review.js', 'study_guide_data.js', 'study_model.js', 'study_guide.js'
].map(file => fs.readFileSync(path.join(__dirname, file), 'utf8')).join('\n') + `
this.api = { chapters: STUDY_CHAPTERS, terms: studyTermMap, resolve: getStudyPracticeSet,
  chapterQuestions: getStudyChapterQuestions, related: getStudyRelatedQuestions, termHtml: studyTermHtml };
`, context);
const api = context.api;
const resolve = query => api.resolve(new URLSearchParams(query));
assert.deepEqual(Array.from(resolve('chapter=foundations&q=24').ids.slice(0, 12)),
  [24, 40, 61, 69, 121, 230, 269, 272, 293, 345, 361, 529]);
assert.equal(resolve('chapter=foundations').ids.length, 380);
for (const chapter of api.chapters) {
  const set = resolve('chapter=' + chapter.id);
  assert.deepEqual(set.ids, api.chapterQuestions(chapter), chapter.id + ': guide and practice ordering must agree');
  assert.equal(new Set(set.ids).size, set.ids.length);
  assert.equal(set.returnHref, 'learn/index.html#' + chapter.id);
}
for (const [id, term] of api.terms) {
  const set = resolve('term=' + id);
  assert.deepEqual(set.ids, api.related(id), id + ': term practice must use its own collection');
  if (set.ids.length) assert(api.termHtml(term).includes('term=' + id + '&amp;q=' + set.ids[0]));
}
assert.equal(resolve('q=24'), null, 'ordinary question links must keep the full bank');
assert.equal(resolve('chapter=missing&q=24'), null);
assert.equal(resolve('term=missing'), null);
assert(resolve('chapter=foundations&q=25').ids.indexOf(25) > 1, 'Q25 must not follow Q24 in chapter order');
console.log('Chapter/term collection links and ordering passed, including the reported 24 → 40 → 61 regression.');
