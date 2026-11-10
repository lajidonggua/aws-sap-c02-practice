'use strict';

const studyEscape = learningEscape;
function studyComparisonHtml(comparison) {
  const e = studyEscape;
  return `<section class="study-comparison"><h3>${e(comparison.title)}</h3><p class="comparison-cue">${e(comparison.cue)}</p><div class="comparison-scroll" tabindex="0" aria-label="${e(comparison.title)}对比表"><table><thead><tr><th scope="col">概念 / 服务</th><th scope="col">主要用途</th><th scope="col">考题里别混淆</th></tr></thead><tbody>${comparison.rows.map(row => `<tr><th scope="row">${e(row[0])}</th><td>${e(row[1])}</td><td>${e(row[2])}</td></tr>`).join('')}</tbody></table></div></section>`;
}
function studyTermHtml(term) {
  const e = studyEscape;
  const questions = getStudyRelatedQuestions(term.id);
  const chapter = getStudyTermChapter(term.id);
  const legacy = STUDY_LEGACY_TERMS.has(term.id);
  const notes = term.notes;
  return `<article class="study-term" id="term-${e(term.id)}"><div class="study-term-top"><span class="term-badge">${notes ? '核心学习卡' : '扩展词汇'}</span><button class="term-share" data-link-term="${e(term.id)}" aria-label="打开 ${e(term.abbr)} 的独立链接">定位 ↗</button></div><h3>${e(term.abbr)}</h3><p class="study-term-name">${e(term.name)}</p>${legacy ? '<p class="legacy-note">此词出现在旧题中，服务支持范围已有变化。请结合 <a href="https://docs.aws.amazon.com/general/latest/gr/service-lifecycle.html" target="_blank" rel="noopener">AWS 服务生命周期说明</a>理解当前支持情况。</p>' : ''}<div class="term-definition"><h4>它是什么</h4><p>${e(term.definition)}</p></div>${term.analogy ? `<p class="study-analogy"><b>打个比方</b>${e(term.analogy)}</p>` : ''}${notes ? `<dl class="study-term-notes"><div><dt>什么时候用</dt><dd>${e(notes[0])}</dd></div><div><dt>考点怎么辨认</dt><dd>${e(notes[1])}</dd></div><div><dt>不要混淆</dt><dd>${e(notes[2])}</dd></div></dl>` : `<div class="extended-use"><h4>常见用途</h4><ul>${(term.use_cases || ['结合基础章节，理解这个术语在方案中承担的职责。']).map(text => `<li>${e(learningPlain(text))}</li>`).join('')}</ul></div>`}<div class="term-links"><a href="#${e(chapter.id)}">回到相关章节</a>${questions.length ? `<a href="../index.html?term=${encodeURIComponent(term.id)}&amp;q=${questions[0]}">练习相关题 ↗</a><span>${questions.length} 道关联题</span>` : ''}${term.source ? `<a href="${e(term.source)}" target="_blank" rel="noopener">AWS 官方说明 ↗</a>` : ''}</div></article>`;
}

if (typeof document !== 'undefined' && document.getElementById('studyContent')) {
  const STUDY_STORAGE_KEY = 'sap-prestudy-v1';
  const validChapters = new Set(STUDY_CHAPTERS.map(chapter => chapter.id));
  let studyProgress = { read: [], last: 'foundations' };
  let studyStorageOK = true;
  try {
    const saved = JSON.parse(localStorage.getItem(STUDY_STORAGE_KEY));
    if (saved && typeof saved === 'object') {
      studyProgress.read = Array.isArray(saved.read) ? [...new Set(saved.read.filter(id => validChapters.has(id)))] : [];
      studyProgress.last = validChapters.has(saved.last) ? saved.last : 'foundations';
    }
  } catch (_) { studyStorageOK = false; }
  const studyQuizAnswers = new Map();
  let studyShowExtended = false;
  let studyQuery = '';
  let studyActiveChapter = 'foundations';
  let studyView = 'route';
  const get = id => document.getElementById(id);
  function saveStudyProgress() {
    try { localStorage.setItem(STUDY_STORAGE_KEY, JSON.stringify(studyProgress)); studyStorageOK = true; }
    catch (_) { studyStorageOK = false; }
    get('studySaveNote').textContent = studyStorageOK ? '阅读进度保存在本浏览器。已读表示你读过，不代表已经掌握。' : '本次可以正常阅读；浏览器暂时无法保存阅读进度。';
  }
  function updateStudyNavigation() {
    get('chapterTotal').textContent = STUDY_CHAPTERS.length;
    get('coreTotal').textContent = [...studyTermMap.values()].filter(term => term.notes).length;
    get('readTotal').textContent = studyProgress.read.length;
    get('studyProgressBar').style.width = studyProgress.read.length / STUDY_CHAPTERS.length * 100 + '%';
    get('routeList').innerHTML = STUDY_CHAPTERS.map((chapter, i) => `<a href="#${chapter.id}" class="route-item ${studyView === 'route' && studyActiveChapter === chapter.id ? 'active' : ''}" ${studyView === 'route' && studyActiveChapter === chapter.id ? 'aria-current="page"' : ''}><span>${studyProgress.read.includes(chapter.id) ? '✓' : String(i + 1).padStart(2, '0')}</span><div>${studyEscape(chapter.title)}<small>${chapter.minutes} 分钟左右</small></div></a>`).join('');
    get('chapterSelect').innerHTML = STUDY_CHAPTERS.map((chapter, i) => `<option value="${chapter.id}" ${chapter.id === studyActiveChapter ? 'selected' : ''}>${i + 1}. ${studyEscape(chapter.title)}</option>`).join('');
    document.querySelectorAll('[data-study-view]').forEach(button => {
      const active = button.dataset.studyView === studyView && !studyQuery;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    get('continueStudy').href = '#' + studyProgress.last;
    get('continueStudy').textContent = studyProgress.read.length ? '继续上次阅读 →' : '从第一章开始 →';
    get('mobileChapterPicker').hidden = studyView !== 'route' || Boolean(studyQuery);
    get('printChapter').hidden = studyView !== 'route' || Boolean(studyQuery);
  }
  function renderStudyQuiz(chapter) {
    const answer = studyQuizAnswers.get(chapter.id);
    return `<section class="study-quiz"><span class="section-eyebrow">不用背答案，先判断场景</span><h3>学完试一下</h3><p>${studyEscape(chapter.quiz.question)}</p><div class="quiz-choices">${chapter.quiz.choices.map((choice, i) => `<button data-quiz-choice="${i}" aria-pressed="${answer === i}" class="${answer === undefined ? '' : i === chapter.quiz.correct ? 'quiz-correct' : answer === i ? 'quiz-wrong' : ''}">${studyEscape(choice)}</button>`).join('')}</div><div id="studyQuizResult" class="quiz-result" aria-live="polite">${answer === undefined ? '' : `<strong>${answer === chapter.quiz.correct ? '理解对了' : '再分清这一步'}</strong><p>${studyEscape(chapter.quiz.explanation)}</p>`}</div></section>`;
  }
  function renderStudyChapter(chapter) {
    const index = STUDY_CHAPTERS.indexOf(chapter);
    const next = STUDY_CHAPTERS[index + 1];
    const questions = getStudyChapterQuestions(chapter);
    const comparisons = chapter.comparisons.map(id => STUDY_COMPARISONS.find(item => item.id === id));
    get('studyContent').innerHTML = `<article class="study-chapter"><header class="chapter-header"><span class="section-eyebrow">第 ${String(index + 1).padStart(2, '0')} 章 · ${chapter.minutes} 分钟左右</span><h2 id="chapterTitle" tabindex="-1">${studyEscape(chapter.title)}</h2><p>${studyEscape(chapter.subtitle)}</p></header><div class="chapter-goal"><b>这一章先学会</b><p>${studyEscape(chapter.goal)}</p></div><section class="chapter-section"><h3>从一个场景开始</h3><p class="chapter-story">${studyEscape(chapter.story)}</p><ol class="concept-flow ${chapter.flowKind === 'choices' ? 'concept-choices' : ''}" aria-label="${studyEscape(chapter.title)}的理解顺序">${chapter.flow.map(([title, detail], i) => `<li><span>${i + 1}</span><h4>${studyEscape(title)}</h4><p>${studyEscape(detail)}</p></li>`).join('')}</ol></section><section class="chapter-section"><h3>先掌握这 ${chapter.principles.length} 个知识点</h3><div class="principle-list">${chapter.principles.map(([title, detail], i) => `<div><span>${String(i + 1).padStart(2, '0')}</span><section><h4>${studyEscape(title)}</h4><p>${studyEscape(detail)}</p></section></div>`).join('')}</div></section><section class="chapter-section"><h3>本章名词、用法与考点</h3><p class="muted">先知道它负责什么，再看题目是否真的需要这个能力。</p><div class="study-term-grid">${chapter.terms.map(id => studyTermHtml(studyTermMap.get(id))).join('')}</div></section><section class="chapter-section"><h3>最容易混淆的地方</h3>${comparisons.map(studyComparisonHtml).join('')}</section>${renderStudyQuiz(chapter)}<section class="practice-box"><div><span class="section-eyebrow">学完再做题</span><h3>用练习把概念连起来</h3><p>${questions.length ? `本章关联 ${questions.length} 道练习，按关联程度排列。进入后会按本章集合继续；遇到不懂的名词再回来查。` : '可以先回到首页练习，再根据遇到的场景回看本章。'}</p></div>${questions.length ? `<a class="primary-link" href="../index.html?chapter=${chapter.id}&amp;q=${questions[0]}">开始本章练习 →</a><p class="muted">前 ${Math.min(12, questions.length)} 道预览，可从任意一题开始：</p><div class="study-question-links">${questions.slice(0, 12).map(id => `<a href="../index.html?chapter=${chapter.id}&amp;q=${id}">第 ${id} 题</a>`).join('')}</div>` : '<a class="primary-link" href="../index.html">开始刷题 →</a>'}</section><div class="chapter-complete"><button class="primary-button" id="markStudyRead">${next ? '本章已读，继续下一章 →' : '本章已读，完成这一轮预习 ✓'}</button>${studyProgress.read.includes(chapter.id) ? '<span>本章已标记为读过，可随时复习。</span>' : '<span>能解释上面的场景后，再标记已读。</span>'}</div>${studyProgress.read.length === STUDY_CHAPTERS.length ? '<div class="all-read">这一轮章节已经读完。接下来做题、回看解析，检验自己能否独立判断。</div>' : ''}<footer class="chapter-sources"><h3>继续查阅 AWS 官方资料</h3>${chapter.sources.map(([title, url]) => `<a href="${studyEscape(url)}" target="_blank" rel="noopener">${studyEscape(title)} ↗</a>`).join('')}</footer></article>`;
    get('markStudyRead').onclick = () => {
      studyProgress.read = [...new Set([...studyProgress.read, chapter.id])];
      studyProgress.last = next ? next.id : chapter.id;
      saveStudyProgress();
      get('studyAnnouncement').textContent = `已将“${chapter.title}”标记为读过。`;
      if (next) location.hash = next.id;
      else { updateStudyNavigation(); renderStudyChapter(chapter); }
    };
    document.querySelectorAll('[data-quiz-choice]').forEach(button => button.onclick = () => {
      const answer = Number(button.dataset.quizChoice);
      studyQuizAnswers.set(chapter.id, answer);
      document.querySelectorAll('[data-quiz-choice]').forEach(item => {
        const value = Number(item.dataset.quizChoice);
        item.setAttribute('aria-pressed', String(answer === value));
        item.classList.toggle('quiz-correct', value === chapter.quiz.correct);
        item.classList.toggle('quiz-wrong', value === answer && value !== chapter.quiz.correct);
      });
      get('studyQuizResult').innerHTML = `<strong>${answer === chapter.quiz.correct ? '理解对了' : '再分清这一步'}</strong><p>${studyEscape(chapter.quiz.explanation)}</p>`;
    });
  }
  function renderStudyTerms() {
    const terms = studySearchTerms('', studyShowExtended);
    get('studyContent').innerHTML = `<section><header class="chapter-header"><span class="section-eyebrow">按名词补基础</span><h2 id="chapterTitle" tabindex="-1">名词学习卡</h2><p>每张核心卡都包括用途、考点和易混边界。遇到新词，先看它的职责，再回到场景里理解。</p></header><label class="extended-toggle"><input id="showExtendedTerms" type="checkbox" ${studyShowExtended ? 'checked' : ''}> 包括扩展词汇</label><p class="muted">显示 ${terms.length} 个名词 · 共 ${studyTermMap.size} 个可搜索词汇</p><div class="study-term-grid">${terms.map(studyTermHtml).join('')}</div></section>`;
    get('showExtendedTerms').onchange = event => { studyShowExtended = event.target.checked; renderStudyTerms(); };
  }
  function renderStudySearch() {
    const needle = studyQuery.trim().toLowerCase();
    const terms = studySearchTerms(needle, true);
    const chapters = STUDY_CHAPTERS.filter(chapter => studyMatchesQuery(JSON.stringify(chapter), needle));
    const comparisons = STUDY_COMPARISONS.filter(comparison => studyMatchesQuery(JSON.stringify(comparison), needle));
    get('studyContent').innerHTML = `<section><header class="chapter-header"><span class="section-eyebrow">先查，再理解</span><h2 id="chapterTitle" tabindex="-1">搜索：${studyEscape(studyQuery)}</h2><p role="status">${chapters.length} 个相关章节 · ${terms.length} 个名词 · ${comparisons.length} 组对比</p></header>${chapters.length ? `<div class="search-chapters">${chapters.map(chapter => `<a href="#${chapter.id}"><b>${studyEscape(chapter.title)}</b><span>${studyEscape(chapter.subtitle)}</span></a>`).join('')}</div>` : ''}${!terms.length && !chapters.length && !comparisons.length ? '<div class="study-empty"><h3>还没有找到这个词</h3><p>可以试试服务缩写、中文名或场景词，例如 DNS、共享文件、容灾。</p><button data-clear-search>回到学习路线</button></div>' : ''}<div class="study-term-grid">${terms.map(studyTermHtml).join('')}</div>${comparisons.map(studyComparisonHtml).join('')}</section>`;
  }
  function renderStudy() {
    updateStudyNavigation();
    if (studyQuery.trim()) renderStudySearch();
    else if (studyView === 'terms') renderStudyTerms();
    else if (studyView === 'comparisons') get('studyContent').innerHTML = `<section><header class="chapter-header"><span class="section-eyebrow">先比较职责，再选服务</span><h2 id="chapterTitle" tabindex="-1">易混对比表</h2><p>把用途相近的服务放在一起，按题目条件判断差别。</p></header>${STUDY_COMPARISONS.map(studyComparisonHtml).join('')}</section>`;
    else renderStudyChapter(STUDY_CHAPTERS.find(chapter => chapter.id === studyActiveChapter));
    document.title = `${get('chapterTitle').textContent} · SAP-C02 刷题前知识手册`;
  }
  function readStudyHash() {
    const hash = location.hash.slice(1);
    studyQuery = ''; get('studySearch').value = '';
    if (hash === 'terms' || hash === 'comparisons') studyView = hash;
    else {
      studyView = 'route';
      studyActiveChapter = validChapters.has(hash) ? hash : studyProgress.last;
      studyProgress.last = studyActiveChapter; saveStudyProgress();
    }
    renderStudy();
  }
  window.addEventListener('hashchange', () => { readStudyHash(); get('chapterTitle').focus({ preventScroll: true }); get('studyMain').scrollIntoView({ block: 'start' }); });
  document.addEventListener('click', event => {
    const anchor = event.target.closest('a[href^="#"]');
    if (anchor && anchor.getAttribute('href') === location.hash) {
      event.preventDefault();
      readStudyHash();
      get('chapterTitle').focus({ preventScroll: true });
      get('studyMain').scrollIntoView({ block: 'start' });
    }
  });
  get('studySearch').addEventListener('input', event => { studyQuery = event.target.value; renderStudy(); });
  get('clearStudySearch').onclick = () => { studyQuery = ''; get('studySearch').value = ''; renderStudy(); get('studySearch').focus(); };
  get('chapterSelect').onchange = event => { location.hash = event.target.value; };
  document.querySelectorAll('[data-study-view]').forEach(button => button.onclick = () => {
    const target = button.dataset.studyView === 'route' ? studyActiveChapter : button.dataset.studyView;
    if (location.hash === '#' + target) { studyQuery = ''; get('studySearch').value = ''; readStudyHash(); }
    else location.hash = target;
  });
  get('studyContent').addEventListener('click', event => {
    const clear = event.target.closest('[data-clear-search]');
    if (clear) { studyQuery = ''; get('studySearch').value = ''; renderStudy(); }
    const link = event.target.closest('[data-link-term]');
    if (link) location.href = '?term=' + encodeURIComponent(link.dataset.linkTerm) + '#terms';
  });
  get('printChapter').onclick = () => window.print();
  readStudyHash();
  const linked = studyTermMap.get(new URLSearchParams(location.search).get('term'));
  if (linked) { studyQuery = linked.abbr; get('studySearch').value = linked.abbr; renderStudy(); }
}
