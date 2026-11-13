'use strict';

const studyDefinitions = {
  acm: '帮助签发、管理和部署 TLS 证书，让支持的服务配置 HTTPS 等加密连接。',
  firehose: 'Amazon Data Firehose（旧题中也称 Kinesis Data Firehose）将流式数据托管投递到支持的目的地。'
};
const studyTermMap = new Map();
for (const term of [...GLOSSARY_TERMS, ...LEARNING_EXTRA_TERMS, ...STUDY_EXTRA_TERMS]) {
  if (['amazon', 'aws'].includes(term.id)) continue;
  const help = LEARNING_TERM_HELP[term.id];
  studyTermMap.set(term.id, {
    ...term, definition: learningPlain(studyDefinitions[term.id] || (help ? help[0] : term.function)),
    analogy: help ? help[1] : term.analogy || '',
    notes: STUDY_TERM_NOTES[term.id] || null,
    matchers: learningAliases(term)
  });
}
const studyQuestionIndex = CHOICE_QUESTIONS.map(q => ({
  q, text: [q.question, q.question_zh, ...q.options.filter(o => q.correct_answers.includes(o.letter)).flatMap(o => [o.text, o.text_zh])].join(' ')
}));
const studyRelatedCache = new Map();
function getStudyRelatedQuestions(termId) {
  if (!studyRelatedCache.has(termId)) {
    const term = studyTermMap.get(termId);
    studyRelatedCache.set(termId, term ? studyQuestionIndex.filter(item => learningHasTerm(term, item.text)).map(item => item.q.id) : []);
  }
  return studyRelatedCache.get(termId);
}
function getStudyChapterQuestions(chapter) {
  const weights = new Map();
  for (const id of chapter.terms) for (const qid of getStudyRelatedQuestions(id)) weights.set(qid, (weights.get(qid) || 0) + 1);
  return [...weights].sort((a, b) => b[1] - a[1] || a[0] - b[0]).map(([qid]) => qid);
}
function getStudyChapterBatch(chapter, size = 5, from) {
  if (!chapter) return null;
  const all = getStudyChapterQuestions(chapter), limited = size !== 'all';
  const count = limited ? Number(size) === 10 ? 10 : 5 : null;
  const requestedOffset = all.indexOf(Number(from));
  const offset = limited && requestedOffset >= 0 ? requestedOffset : 0;
  const ids = limited ? all.slice(offset, offset + count) : all;
  const anchor = ids[0] ?? null;
  const chapterIndex = STUDY_CHAPTERS.findIndex(item => item.id === chapter.id);
  const nextChapter = chapterIndex >= 0 ? STUDY_CHAPTERS[chapterIndex + 1] : null;
  return {
    kind: 'chapter', title: chapter.title, ids, returnHref: 'learn/index.html#' + chapter.id,
    limited, size: count, from: anchor, total: all.length, offset,
    scopeKey: 'chapter:' + chapter.id + (limited ? ':' + count + ':' + anchor : ''),
    batchKey: limited ? 'chapter:' + chapter.id + ':batch' + count : null,
    nextBatchFrom: limited ? all[offset + ids.length] ?? null : null,
    nextChapterHref: nextChapter ? 'learn/index.html#' + nextChapter.id : null,
    nextChapterTitle: nextChapter ? nextChapter.title : null
  };
}
function getStudyTermChapter(termId) {
  const direct = STUDY_CHAPTERS.find(chapter => chapter.terms.includes(termId));
  if (direct) return direct;
  const categories = { networking: 'networking', compute: 'compute', storage: 'storage', database: 'databases', security: 'security', integration: 'integration', analytics: 'analytics', management: 'governance', migration: 'migration', devops: 'delivery' };
  return STUDY_CHAPTERS.find(chapter => chapter.id === (categories[studyTermMap.get(termId)?.category] || 'foundations'));
}
function studyMatchesQuery(text, query) {
  const haystack = String(text).toLowerCase();
  return query.trim().toLowerCase().split(/\s+/).filter(Boolean).every(word => /^[a-z0-9-]{1,4}$/.test(word)
    ? new RegExp('(?<![a-z0-9])' + word + '(?![a-z0-9])', 'i').test(haystack)
    : haystack.includes(word));
}
function studySearchTerms(query, includeExtended = false) {
  const needle = query.trim().toLowerCase();
  return [...studyTermMap.values()].filter(term => (includeExtended || needle || term.notes) && (!needle || studyMatchesQuery([term.name, term.abbr, term.definition, term.analogy, ...(term.aliases || []), ...(term.notes || []), ...(term.use_cases || [])].join(' '), needle)))
    .sort((a, b) => {
      const rank = term => [term.abbr, term.name, ...(term.aliases || [])].some(x => x?.toLowerCase() === needle) ? 0 : term.notes ? 1 : 2;
      return rank(a) - rank(b) || a.abbr.localeCompare(b.abbr);
    });
}
function getStudyPracticeSet(params) {
  if (params.has('lesson') && typeof SAP_PATH !== 'undefined') {
    const lesson = SAP_PATH.lessons.find(item => item.id === params.get('lesson'));
    if (!lesson) return null;
    const requested = Number(params.get('count') || 3);
    const count = Number.isFinite(requested) ? Math.min(3, Math.max(1, Math.floor(requested))) : 3;
    const available = new Set(CHOICE_QUESTIONS.map(q => q.id));
    const ids = [...new Set(lesson.questions)].filter(id => available.has(id)).slice(0, count);
    return { kind: 'lesson', title: lesson.title, ids, returnHref: 'path/index.html#' + lesson.id };
  }
  if (params.has('chapter')) {
    const chapter = STUDY_CHAPTERS.find(item => item.id === params.get('chapter'));
    if (!chapter) return null;
    const related = getStudyChapterQuestions(chapter);
    const anchor = [Number(params.get('from')), Number(params.get('q'))].find(id => related.includes(id));
    return getStudyChapterBatch(chapter, params.get('count') || 5, anchor);
  }
  if (params.has('term')) {
    const term = studyTermMap.get(params.get('term'));
    return term ? { kind: 'term', title: term.abbr, ids: getStudyRelatedQuestions(term.id), returnHref: 'learn/index.html?term=' + encodeURIComponent(term.id) } : null;
  }
  return null;
}
