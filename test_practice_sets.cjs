const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const context = vm.createContext({ URLSearchParams });
vm.runInContext([
  'sap_questions.js', 'sap_glossary.js', 'learning_review.js', 'study_guide_data.js', 'study_model.js', 'study_guide.js'
].map(file => fs.readFileSync(path.join(__dirname, file), 'utf8')).join('\n') + `
this.api = { chapters: STUDY_CHAPTERS, terms: studyTermMap, resolve: getStudyPracticeSet,
  chapterQuestions: getStudyChapterQuestions, chapterBatch: getStudyChapterBatch,
  related: getStudyRelatedQuestions, termHtml: studyTermHtml };
`, context);
const api = context.api;
const resolve = query => api.resolve(new URLSearchParams(query));
assert.deepEqual(Array.from(resolve('chapter=foundations&count=all&q=24').ids.slice(0, 12)),
  [24, 40, 61, 69, 121, 230, 269, 272, 293, 345, 361, 529]);
assert.deepEqual(Array.from(resolve('chapter=foundations').ids), [24, 40, 61, 69, 121]);
assert.equal(resolve('chapter=foundations&count=10').ids.length, 10);
assert.equal(resolve('chapter=foundations&count=all').ids.length, 380);
for (const [index, chapter] of Array.from(api.chapters).entries()) {
  const all = api.chapterQuestions(chapter);
  const set = resolve('chapter=' + chapter.id + '&count=all');
  assert.deepEqual(set.ids, all, chapter.id + ': full collection preserves guide ordering');
  assert.equal(set.limited, false);
  assert.equal(set.size, null);
  assert.equal(set.batchKey, null);
  assert.equal(set.scopeKey, 'chapter:' + chapter.id);
  assert.equal(set.nextBatchFrom, null);
  assert.equal(set.nextChapterHref, api.chapters[index + 1] ? 'learn/index.html#' + api.chapters[index + 1].id : null);
  assert.equal(set.nextChapterTitle, api.chapters[index + 1]?.title ?? null);
  for (const size of [5, 10]) {
    let batch = api.chapterBatch(chapter, size), visited = [], groups = 0;
    while (batch.ids.length) {
      assert.equal(batch.limited, true);
      assert.equal(batch.size, size);
      assert.equal(batch.total, all.length);
      assert.equal(batch.offset, visited.length);
      assert.equal(batch.from, batch.ids[0]);
      assert.equal(batch.scopeKey, 'chapter:' + chapter.id + ':' + size + ':' + batch.from);
      assert.equal(batch.batchKey, 'chapter:' + chapter.id + ':batch' + size);
      assert.equal(batch.returnHref, 'learn/index.html#' + chapter.id);
      assert(batch.ids.length <= size && batch.ids.every(id => all.includes(id)));
      assert.deepEqual(batch.ids, all.slice(visited.length, visited.length + size));
      const pinned = 'chapter=' + chapter.id + '&count=' + size + '&from=' + batch.from;
      for (const q of batch.ids) {
        assert.deepEqual(resolve(pinned + '&q=' + q).ids, batch.ids, 'refresh must not slide the batch with q');
      }
      visited.push(...batch.ids);
      groups++;
      assert(groups <= Math.ceil(all.length / size), 'batches must terminate without wrapping');
      if (batch.nextBatchFrom === null) break;
      batch = api.chapterBatch(chapter, size, batch.nextBatchFrom);
    }
    assert.deepEqual(visited, Array.from(all), chapter.id + ': sequential batches cover related questions exactly once');
    assert.equal(new Set(visited).size, visited.length);
  }
}
for (const count of ['', '0', '1', '6', '-10', '999', 'Infinity', 'NaN', 'bad']) {
  assert.equal(resolve('chapter=foundations&count=' + count).ids.length, 5, 'unsupported size must use the small default');
}
assert.deepEqual(Array.from(resolve('chapter=foundations&count=5&from=24&q=61').ids), [24, 40, 61, 69, 121]);
assert.equal(resolve('chapter=foundations&q=40').from, 40, 'old deep links can start a bounded batch at their question');
assert.equal(resolve('chapter=foundations&from=bad&q=40').from, 40);
assert.equal(resolve('chapter=foundations&from=999&q=999').from, 24);
const foundationIds = api.chapterQuestions(api.chapters[0]);
assert.deepEqual(Array.from(resolve('chapter=foundations&count=10&from=' + foundationIds.at(-2)).ids), Array.from(foundationIds.slice(-2)));
assert.equal(resolve('chapter=foundations&count=10&from=' + foundationIds.at(-1)).nextBatchFrom, null);
assert.notEqual(api.chapterBatch(api.chapters[0], 5).scopeKey, api.chapterBatch(api.chapters[0], 10).scopeKey, 'five- and ten-question resumes stay independent');
const empty = api.chapterBatch({ id: 'empty', title: 'Empty', terms: [] });
assert.equal(empty.ids.length, 0);
assert.equal(empty.from, null);
assert.equal(empty.nextBatchFrom, null);
assert.equal(empty.nextChapterHref, null);
assert.equal(api.chapterBatch(null), null);
for (const [id, term] of api.terms) {
  const set = resolve('term=' + id);
  assert.deepEqual(set.ids, api.related(id), id + ': term practice must use its own collection');
  if (set.ids.length) assert(api.termHtml(term).includes('term=' + id + '&amp;q=' + set.ids[0]));
}
assert.equal(resolve('q=24'), null, 'ordinary question links must keep the full bank');
assert.equal(resolve('chapter=missing&q=24'), null);
assert.equal(resolve('term=missing'), null);
assert.equal(resolve('chapter=foundations&q=24').ids[1], 40, 'Q25 must not follow Q24 in chapter order');
console.log('Chapter batches passed: default5, optional10/all, fixed anchors on refresh, independent resume keys, tails, next chapters and exact non-wrapping coverage; term collections preserved.');

// New clients can scope one short lesson without changing existing chapter order.
context.SAP_PATH = {lessons:[{id:'sample',title:'示例小节',questions:[24,40,61,69,999,24]},{id:'intro',title:'概念入门',questions:[]}]};
assert.deepEqual(Array.from(resolve('lesson=sample&count=2').ids),[24,40]);
assert.deepEqual(Array.from(resolve('lesson=sample&count=999').ids),[24,40,61]);
assert.deepEqual(Array.from(resolve('lesson=sample&count=0').ids),[24]);
assert.deepEqual(Array.from(resolve('lesson=sample&count=bad').ids),[24,40,61]);
assert.equal(resolve('lesson=sample').returnHref,'path/index.html#sample');
assert.equal(resolve('lesson=intro').ids.length,0,'Intro lessons must not fall through to the whole bank');
assert.equal(resolve('lesson=unknown'),null);
console.log('Short lesson scoping passed: count bounds, duplicate/invalid ID filtering, and no full-bank fallback for an empty introductory lesson.');
