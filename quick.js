'use strict';
const $=id=>document.getElementById(id);
const esc=t=>String(t??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const renderAvoid=t=>t?`<p class="keyword-trap"><b>③ 别踩这个坑：</b>${esc(t)}</p>`:'';
const KEY='sap-quick-practice-v1';
function makeQuickSearchIndex(questions,cards){
 return new Map(questions.map(q=>{
  const c=cards[q.id]||{};
  const text=[String(q.id),q.question,q.question_zh,...q.options.flatMap(o=>[o.text,o.text_zh]),c.when,c.target,c.avoid,JSON.stringify(c.originalTerms)].filter(Boolean).join(' ');
  const tokens=new Set((text+' '+text.replace(/([a-z])([A-Z])/g,'$1 $2')).toLowerCase().split(/[^a-z0-9]+/).filter(Boolean));
  return [q.id,{text:text.toLowerCase(),tokens}];
 }));
}
function findQuickCards(cards,index,query){
 const words=query.trim().toLowerCase().split(/\s+/).filter(Boolean);
 if(!words.length)return [...cards];
 const matches=cards.filter(card=>{const entry=index.get(card.id);return entry&&words.every(word=>/^[a-z0-9]{1,4}$/.test(word)?entry.tokens.has(word):entry.text.includes(word));});
 const exactId=/^\d+$/.test(query.trim())?Number(query.trim()):null;
 return matches.sort((a,b)=>Number(b.id===exactId)-Number(a.id===exactId));
}
const ALL_REVIEW_CARDS=CHOICE_QUESTIONS.map(q=>{const c=QUICK_ANSWER_CARDS[q.id];return {id:q.id,title:'原题 '+q.id,when:[c.when],target:c.target,avoid:c.avoid,english:''};});
const QUICK_SEARCH_INDEX=makeQuickSearchIndex(CHOICE_QUESTIONS,QUICK_ANSWER_CARDS);
let state={answers:{},stars:[],last:1},storageOK=true;
try{const s=JSON.parse(LearningProgress.getItem(KEY));if(s&&s.answers&&typeof s.answers==='object'&&!Array.isArray(s.answers)&&Array.isArray(s.stars))state={...state,...s};}catch{storageOK=false;}
const practiceParams=new URLSearchParams(window.location.search);
const practiceSet=getStudyPracticeSet(practiceParams);
const storedPracticeScopes=LearningProgress.get(ProgressModel.KEYS.scopes,{});
const requestedPracticeMode=['order','random','wrong','star'].includes(practiceParams.get('mode'))?practiceParams.get('mode'):!practiceSet&&!practiceParams.has('q')&&storedPracticeScopes[PracticeProgress.KEYS.mode]===2?'random':'order';
let practiceFilter=practiceParams.get('review')==='all'?'all':'unanswered';
let bankFinished=false;
let persistPracticeCursor=true,practiceInteracted=false;
const explicitPracticeEntry=practiceParams.has('q')||practiceParams.has('mode');
const practiceOwner=LearningProgress.owner();
const isChapterBatch=practiceSet?.kind==='chapter'&&practiceSet.limited;
let batchFinished=false;
const practiceQuestionMap=new Map(CHOICE_QUESTIONS.map(q=>[q.id,q]));
const PRACTICE_QUESTIONS=practiceSet?practiceSet.ids.map(id=>practiceQuestionMap.get(id)):CHOICE_QUESTIONS;
const PRACTICE_IDS=new Set(PRACTICE_QUESTIONS.map(q=>q.id));
const practiceCardMap=new Map(ALL_REVIEW_CARDS.map(card=>[card.id,card]));
const PRACTICE_REVIEW_CARDS=PRACTICE_QUESTIONS.map(q=>practiceCardMap.get(q.id));
const practiceEntryId=Number(practiceParams.get('q'));
let practiceLast=practiceSet?practiceSet.ids[0]:state.last;
if(isChapterBatch){const saved=LearningProgress.get(ProgressModel.KEYS.scopes,{})[practiceSet.scopeKey];if(PRACTICE_IDS.has(saved))practiceLast=saved;}
if(PRACTICE_IDS.has(practiceEntryId))practiceLast=practiceEntryId;
let mode='order',pool=[...PRACTICE_QUESTIONS],at=Math.max(0,pool.findIndex(q=>q.id===practiceLast)),selected=[],locked=false,revealed=false;
function readPracticeState(){state=LearningProgress.get(KEY,{answers:{},stars:[],last:1});return state;}
function save(change){
 readPracticeState();change(state);
 try{LearningProgress.setItem(KEY,JSON.stringify(state));}catch{storageOK=false;}
 if(!LearningProgress.status().storageOK||!storageOK)$('saveNote').textContent='浏览器未允许保存；本次练习仍可继续。';
}
function isUnansweredPractice(){return !practiceSet&&['order','random'].includes(mode)&&practiceFilter==='unanswered';}
function rememberPracticeQuestion(id){
 if(practiceSet||['order','random'].includes(mode))practiceLast=id;
 const url=new URL(window.location.href);
 if(practiceSet){
  try{const key=practiceSet.scopeKey||practiceSet.kind+':'+practiceParams.get(practiceSet.kind);const scopes=LearningProgress.get(ProgressModel.KEYS.scopes,{});scopes[key]=id;if(isChapterBatch)scopes[practiceSet.batchKey]=practiceSet.from;LearningProgress.put(ProgressModel.KEYS.scopes,scopes);}catch{}
  url.searchParams.set('q',id);
  if(isChapterBatch){url.searchParams.set('count',practiceSet.size);url.searchParams.set('from',practiceSet.from);}
 }else if(['order','random'].includes(mode)){
  if(persistPracticeCursor){
  // Read the latest profile before each mutation so another tab's answers stay intact.
  save(current=>{current.last=id;});
  try{const scopes=LearningProgress.get(ProgressModel.KEYS.scopes,{});scopes[PracticeProgress.KEYS[mode]]=id;scopes[PracticeProgress.KEYS.mode]=mode==='random'?2:1;LearningProgress.put(ProgressModel.KEYS.scopes,scopes);}catch{}
  }
  url.searchParams.set('mode',mode);url.searchParams.set('q',id);
  if(practiceFilter==='all')url.searchParams.set('review','all');else url.searchParams.delete('review');
 }
 if(url.href!==window.location.href)history.replaceState(null,'',url);
 renderQuestionHistory(id);
}
function renderQuestionHistory(id){
 const target=$('questionHistory');
 if(!id||bankFinished||batchFinished){target.hidden=true;return;}
 const answer=state.answers[id],currentResult=PracticeProgress.result(practiceQuestionMap.get(id),answer);target.hidden=false;
 if(isUnansweredPractice()&&PracticeProgress.answered(state.answers,id))$('practiceModeNote').textContent='这道题的作答已记录；点下一题会继续未做题，无需重复提交。';
 target.classList.toggle('has-answer',PracticeProgress.answered(state.answers,id));
 target.innerHTML=PracticeProgress.answered(state.answers,id)?`<strong>这道题已做过 · ${currentResult===null?'已完成对照 · 不计正确率':currentResult?'按校准答案答对':'按校准答案待纠错'}</strong><span>可以回看；再次作答不会重复计数。</span><details><summary>查看上次选择</summary><p>上次选择：${esc(answer.selected.join('、'))}</p></details>`:'<span>这道题还未作答，提交答案后会计入已做。</span>';
}

if(practiceSet){
 const isLesson=practiceSet.kind==='lesson';
 document.body.classList.toggle('lesson-practice',isLesson||isChapterBatch);
 const label=isLesson?'小节练习':isChapterBatch?'本次短练':practiceSet.kind==='chapter'?'本章练习':'名词相关练习';
 $('practiceSetBanner').hidden=false;
 $('practiceSetBanner').innerHTML=`<div><span class="eyebrow">${label} · ${PRACTICE_QUESTIONS.length} 题</span><h2>${esc(practiceSet.title)}</h2><p>${isChapterBatch?`这组只练 ${PRACTICE_QUESTIONS.length} 题，结束后${practiceSet.nextChapterHref?'继续下一章':'回到学习目录'}。切题和刷新都保留当前小组。`:isLesson?'每题先圈出约束，再解释选择理由。练完回到小节，整理本节收获。':'下一题按这个集合继续；下方练习方式也在此范围内。'}</p></div><div class="practice-set-links"><a href="${esc(practiceSet.returnHref)}">${isLesson?'返回短时学习':'返回知识手册'}</a><a href="index.html">退出集合，练全部题目 →</a></div>`;
}
function batchPracticeHref(from){return 'index.html?chapter='+encodeURIComponent(practiceParams.get('chapter'))+'&count='+practiceSet.size+'&from='+from+'&q='+from;}
function practiceLastLabel(fallback){return isChapterBatch?'结束这组，继续学习 →':practiceSet?.kind==='lesson'?'返回小节，整理收获 →':isUnansweredPractice()?'查看本轮进度 →':fallback;}
function showBatchCompletion(){
 if(!isChapterBatch||batchFinished)return;
 batchFinished=true;$('questionHistory').hidden=true;if(typeof stopFlash==='function')stopFlash();document.body.classList.remove('flash-mode');
 const summary=PracticeProgress.summarize(PRACTICE_QUESTIONS,state.answers),answers=PRACTICE_QUESTIONS.filter(q=>PracticeProgress.answered(state.answers,q.id)),correct=summary.correct,total=PRACTICE_QUESTIONS.length;
 $('keywordTools').hidden=true;$('feedback').innerHTML='';$('options').innerHTML='';$('submit').hidden=true;$('star').hidden=true;$('selection').textContent='';document.querySelector('#practice .actions').hidden=true;
 $('position').textContent='本组练习小结';$('progress').style.width='100%';
 const more=practiceSet.nextBatchFrom,nextCount=Math.min(practiceSet.size,practiceSet.total-practiceSet.offset-total);
 $('question').innerHTML=`<section id="batchCompletion" class="batch-completion"><p class="eyebrow">${esc(practiceSet.title)} · ${total} 题小组</p><h2 id="batchCompletionTitle" tabindex="-1">这一组到这里，继续学一点。</h2><div class="batch-results"><div><strong>${answers.length} / ${total}</strong><span>本组已作答</span></div><div><strong>${correct}</strong><span>按校准答案答对</span></div></div><p>${answers.length<total?'还有 '+(total-answers.length)+' 题未作答。只翻题或看解析不计作答，可以以后再补练。':'已练完这一小组。带着刚才的判断依据，继续学下一个主题。'}</p><div class="batch-next-step">${practiceSet.nextChapterHref?`<a id="batchNextChapter" class="primary" href="${esc(practiceSet.nextChapterHref)}">继续学下一章 →<small>${esc(practiceSet.nextChapterTitle)}</small></a>`:'<p>已到手册最后一章，可以回到目录复习薄弱点。</p><a id="batchBackGuide" class="primary" href="learn/index.html#foundations">返回学习目录 →</a>'}</div><div class="batch-options"><a href="${esc(practiceSet.returnHref)}">回看本章知识点</a>${more?`<a id="batchMore" href="${esc(batchPracticeHref(more))}">有余力，再练下一组 ${nextCount} 题</a>`:''}<a id="batchRepeat" href="${esc(batchPracticeHref(practiceSet.from))}">再练本组 ${total} 题</a></div><p class="muted batch-save-note">${LearningProgress.status().storageOK?'作答记录已保存在本机，登录后会同步。':'当前浏览器无法保存记录，本次仍可继续学习。'}</p></section>`;
 $('practice').scrollIntoView({block:'start',behavior:'instant'});$('batchCompletionTitle').focus({preventScroll:true});
}
function stats(){
 readPracticeState();
 const all=PracticeProgress.summarize(CHOICE_QUESTIONS,state.answers),scope=PracticeProgress.summarize(PRACTICE_QUESTIONS,state.answers);
 document.body.classList.toggle('continuing-practice',!practiceSet&&all.answered>0);
 const recent=PracticeProgress.recent(state.answers,10,CHOICE_QUESTIONS);
 $('stats').innerHTML=`<div><strong data-progress-count="answered">${all.answered}<small> / ${all.total}</small></strong><span>已做题目</span></div><div><strong data-progress-count="remaining">${all.remaining}</strong><span>未做题目</span></div><div><strong data-progress-count="wrong">${all.wrong}</strong><span>待纠错</span></div><div class="recent-accuracy"><strong id="recentAccuracy">${recent.rate===null?'—':recent.rate+'%'}</strong><span>最近 10 次正确率</span><small id="recentAccuracyDetail">${recent.total?'最近 '+recent.total+' 次，答对 '+recent.correct+' 次 · 有歧义题不计':'新作答开始统计 · 有歧义题不计'}</small></div>`;
 $('coverageBar').style.width=(all.answered/all.total*100)+'%';if(!practiceSet&&['order','random'].includes(mode))$('progress').style.width=(all.answered/all.total*100)+'%';
 $('practiceSaveStatus').textContent=LearningProgress.status().storageOK?'自动保存在当前浏览器；登录后可同步到其他设备。':'当前浏览器无法持久保存，关闭后可能丢失本次进度。可前往学习进度页下载备份。';
 $('practiceCoverageText').textContent=all.remaining?`已完成 ${Math.round(all.answered/all.total*1000)/10}%，再做 ${all.remaining} 道就走完题库第一遍。`:'529 道都已提交过答案，题库第一遍完成。接下来可以专注错题和易混知识点。';
 $('scopeProgress').hidden=!practiceSet;
 $('scopeProgress').textContent=practiceSet?`${isChapterBatch?'本组':'当前集合'}：已做 ${scope.answered} / ${scope.total}，未做 ${scope.remaining}。上方是整套题库的累计进度。`:'';
 $('practiceFilterBar').hidden=!!practiceSet||!['order','random'].includes(mode);
 for(const button of document.querySelectorAll('[data-practice-filter]'))button.setAttribute('aria-pressed',String(button.dataset.practiceFilter===practiceFilter));
 $('wrongCount').textContent=scope.wrong;
 $('practiceModeNote').textContent=practiceSet?'按选定的题组继续；做过的题会显示上次记录。':isUnansweredPractice()?'顺序和随机默认只出未做题。刷新保留当前题，重新进入会接着未做题继续。':['order','random'].includes(mode)?'正在回看全部题目，包含已做题；历史记录保留。':'复习模式会包含已做题；不会增加重复的已做数量。';
}
function shuffled(questions){const result=[...questions];for(let i=result.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[result[i],result[j]]=[result[j],result[i]];}return result;}
function start(nextMode,options={}){
 if(typeof stopFlash==='function')stopFlash();readPracticeState();mode=nextMode;bankFinished=false;
 persistPracticeCursor=!options.initial||explicitPracticeEntry;if(!options.initial)practiceInteracted=true;
 if(mode==='flash')flash.scope='all';
 const explicit=options.entryId??(options.initial&&PRACTICE_IDS.has(practiceEntryId)?practiceEntryId:null);
 if(!practiceSet&&['order','random'].includes(mode)){
  const scopes=LearningProgress.get(ProgressModel.KEYS.scopes,{}),saved=mode==='random'?scopes[PracticeProgress.KEYS.random]:scopes[PracticeProgress.KEYS.order]||state.last;
  pool=isUnansweredPractice()?PracticeProgress.unanswered(PRACTICE_QUESTIONS,state.answers):[...PRACTICE_QUESTIONS];
  // A direct question link is an intentional review; only this current question may be added back.
  if(explicit&&PRACTICE_IDS.has(explicit)&&!pool.some(q=>q.id===explicit))pool.unshift(practiceQuestionMap.get(explicit));
  if(mode==='random')pool=shuffled(pool);
  const desired=explicit||(mode==='order'&&isUnansweredPractice()?PracticeProgress.nextUnanswered(PRACTICE_QUESTIONS,state.answers,saved):saved);
  const cursor=pool.findIndex(q=>q.id===desired);
  if(isUnansweredPractice()){
   if(cursor>0)pool=mode==='order'?[...pool.slice(cursor),...pool.slice(0,cursor)]:[pool[cursor],...pool.slice(0,cursor),...pool.slice(cursor+1)];
   at=0;
  }else at=Math.max(0,cursor);
 }else{
  pool=PRACTICE_QUESTIONS.filter(q=>mode==='keywords'?PRACTICE_REVIEW_CARDS.some(c=>c.id===q.id):mode==='wrong'?PracticeProgress.result(q,state.answers[q.id])===false:mode==='star'?state.stars.includes(q.id):true);
  if(mode==='random')pool=shuffled(pool);
  at=mode==='flash'?Math.max(0,pool.findIndex(q=>q.id===(practiceSet?practiceLast:flash.last))):mode==='order'?Math.max(0,pool.findIndex(q=>q.id===practiceLast)):0;
 }
 document.querySelectorAll('[data-mode]').forEach(b=>b.classList.toggle('active',b.dataset.mode===mode));
 render();
}
function showBankCompletion(){
 if(!isUnansweredPractice())return;
 stats();bankFinished=true;const summary=PracticeProgress.summarize(CHOICE_QUESTIONS,state.answers);
 if(typeof stopFlash==='function')stopFlash();document.body.classList.remove('flash-mode');
 $('keywordTools').hidden=true;$('questionHistory').hidden=true;$('feedback').innerHTML='';$('options').innerHTML='';$('submit').hidden=true;$('star').hidden=true;$('selection').textContent='';document.querySelector('#practice .actions').hidden=true;
 $('position').textContent=summary.remaining?'本次练习小结':'题库第一遍已完成';$('progress').style.width=(summary.answered/summary.total*100)+'%';
 $('question').innerHTML=`<section id="bankCompletion" class="batch-completion"><p class="eyebrow">每道题只计一次 · 按已提交答案累计</p><h2 tabindex="-1">${summary.remaining?'这一段先到这里，进度已记下。':'题库第一遍完成了 ✓'}</h2><p>${summary.remaining?`已做 ${summary.answered} / ${summary.total} 道，还剩 ${summary.remaining} 道未做。跳过或只看解析的题会留在未做列表，下次可以补上。`:`${summary.total} 道都已提交过答案。${summary.wrong?'其中 '+summary.wrong+' 道上次答错，下一步集中补这些知识点。':'接下来可以回顾易混知识点，再用模拟练习检验理解。'}`}</p><div class="bank-completion-actions">${summary.remaining?'<button id="continueUnanswered" class="primary">继续剩余 '+summary.remaining+' 道未做题 →</button>':''}${summary.wrong?'<button id="reviewWrong">复习 '+summary.wrong+' 道错题</button>':''}<a href="path/index.html">回到短时学习</a><button id="reviewAll">回看全部题目（含已做）</button></div><p class="muted">完成第一遍表示每题作答过，不代表已经掌握。不会自动清空记录或从头重刷。</p></section>`;
 const url=new URL(location.href);url.searchParams.delete('q');url.searchParams.set('mode',mode);url.searchParams.delete('review');history.replaceState(null,'',url);
 $('continueUnanswered')?.addEventListener('click',()=>start(mode));
 $('reviewWrong')?.addEventListener('click',()=>start('wrong'));
 $('reviewAll').onclick=()=>{practiceFilter='all';start('order');};
 $('practice').scrollIntoView({block:'start',behavior:'instant'});
 $('bankCompletion').querySelector('h2').focus({preventScroll:true});
}
function render(){batchFinished=false;bankFinished=false;$('questionHistory').hidden=true;if(isUnansweredPractice()&&!pool.length){showBankCompletion();return;}document.querySelector('#practice .actions').hidden=false;document.body.classList.toggle('flash-mode',mode==='flash');if(typeof stopFlash==='function')stopFlash(false);if(mode==='flash'){renderFlash();return;}$('keywordTools').hidden=mode!=='keywords';if(mode==='keywords'){renderKeywords();return;}selected=[];locked=false;revealed=false;stats();$('feedback').innerHTML='';$('options').innerHTML='';$('submit').hidden=true;$('selection').textContent='';const q=pool[at];$('prev').disabled=!q||at===0;$('next').disabled=!q;$('star').hidden=!q;$('next').textContent=at===pool.length-1?practiceLastLabel('再练一轮 ↻'):'下一题 →';if(!q){$('position').textContent='暂无题目';$('progress').style.width='0';$('question').innerHTML=`<div class="empty"><h2>${!PRACTICE_QUESTIONS.length?'本小节先做入门场景题':mode==='wrong'?'暂时没有错题':'还没有收藏'}</h2><p class="muted">${!PRACTICE_QUESTIONS.length?'建立基本概念后，再逐步练习综合题。':mode==='wrong'?'答错的题会自动收进这里。':'遇到想再看的题，点右上角收藏。'}</p><button id="back" style="margin-top:18px">${!PRACTICE_QUESTIONS.length?'返回短时学习':'去顺序练习'}</button></div>`;$('back').onclick=()=>{if(!PRACTICE_QUESTIONS.length&&practiceSet)window.location.href=practiceSet.returnHref;else start('order');};return;}rememberPracticeQuestion(q.id);$('position').textContent=!practiceSet&&['order','random'].includes(mode)?`${mode==='random'?'随机':'顺序'} · ${practiceFilter==='unanswered'?'未做优先':'回看全部'} · 原题 ${q.id}`:`第 ${at+1} / ${pool.length} 题 · 原题 ${q.id}`;$('progress').style.width=!practiceSet?`${PracticeProgress.summarize(CHOICE_QUESTIONS,state.answers).answered/CHOICE_QUESTIONS.length*100}%`:`${(at+1)/pool.length*100}%`;$('star').textContent=state.stars.includes(q.id)?'★ 已收藏':'☆ 收藏';const count=q.correct_answers.length;const dispute=PracticeProgress.isAmbiguous(q)||(!q.answer_audit&&typeof DISPUTED_QUESTIONS!=='undefined'&&DISPUTED_QUESTIONS[q.id]);$('question').innerHTML=`<span class="type">${count>1?'多选 · 选 '+count+' 项':'单选 · 选 1 项'}</span>${mode==='memory'?'<span class="type" style="margin-left:8px">先回想，再翻卡</span>':''}<div class="question-text">${esc(q.question_zh||q.question)}</div><details><summary>查看英文原题</summary><p>${esc(q.question)}</p></details>${dispute?'<div class="warning">此题答案存在争议，作答后请核对条件和官方资料，不计入正确率。</div>':''}`;
if(mode==='memory'){$('question').innerHTML=`<span class="type">直接背题 · 原题 ${q.id}</span><details><summary>需要时展开原题</summary><p>${esc(q.question_zh||q.question)}</p></details>`;revealed=true;showFeedback(q,null,false);return;}
if(mode==='order'){
 const cue=FLASH_CARDS[q.id];
 $('question').insertAdjacentHTML('beforeend',`<section class="inline-flash" aria-label="按需查看本题提示"><div class="inline-flash-head"><strong>先自己判断，需要时再看提示</strong><button id="toggleInlineFlash" class="quiet" aria-expanded="false">展开提示</button></div><div id="inlineFlashWords" hidden><p><span>题眼</span><b>${esc(cue.when)}</b></p><p><span>找词</span><b>${esc(flashAnswerWords(cue.target))}</b></p><small>提示会给出本题方案线索；作答后再试着解释理由${QUICK_ANSWER_CARDS[q.id].disputed||QUICK_ANSWER_CARDS[q.id].legacyMismatch?' · 此题存疑，答后核对':''}。</small></div></section>`);
 $('toggleInlineFlash').onclick=()=>{const content=$('inlineFlashWords');content.hidden=!content.hidden;$('toggleInlineFlash').textContent=content.hidden?'展开提示':'收起提示';$('toggleInlineFlash').setAttribute('aria-expanded',String(!content.hidden));};
}
q.options.forEach(o=>{const b=document.createElement('button');b.className='option';b.dataset.letter=o.letter;b.setAttribute('aria-pressed','false');b.innerHTML=`<span class="letter">${esc(o.letter)}</span><span>${esc(o.text_zh||o.text)}</span>`;b.onclick=()=>choose(o.letter);$('options').appendChild(b);});if(count>1){$('submit').hidden=false;$('submit').disabled=true;$('selection').textContent=`已选 0 / ${count} 项`;}const peek=document.createElement('button');peek.className='peek-answer';peek.textContent=mode==='order'?'直接核对答案（不计分）':'直接看 5 秒闪记（不计分）';peek.onclick=()=>{practiceInteracted=true;persistPracticeCursor=true;rememberPracticeQuestion(q.id);revealed=true;locked=true;$('submit').hidden=true;document.querySelectorAll('.option').forEach(b=>b.disabled=true);peek.remove();showFeedback(q,null);};$('options').appendChild(peek);}
function choose(letter){if(locked)return;practiceInteracted=true;persistPracticeCursor=true;const q=pool[at];if(q.correct_answers.length===1){selected=[letter];grade();return;}if(selected.includes(letter))selected=selected.filter(x=>x!==letter);else if(selected.length<q.correct_answers.length)selected.push(letter);document.querySelectorAll('.option').forEach(b=>{b.classList.toggle('selected',selected.includes(b.dataset.letter));b.setAttribute('aria-pressed',String(selected.includes(b.dataset.letter)));});$('selection').textContent=`已选 ${selected.length} / ${q.correct_answers.length} 项`;$('submit').disabled=selected.length!==q.correct_answers.length;}
function grade(){if(locked)return;practiceInteracted=true;persistPracticeCursor=true;const q=pool[at];if(selected.length!==q.correct_answers.length)return;locked=true;const correct=[...selected].sort().join() === [...q.correct_answers].sort().join();save(current=>{current.answers[q.id]=PracticeProgress.recordAnswer(current.answers,q,correct,selected);});rememberPracticeQuestion(q.id);stats();renderQuestionHistory(q.id);$('submit').hidden=true;document.querySelectorAll('.option').forEach(b=>{b.disabled=true;const letter=b.dataset.letter;if(PracticeProgress.isAmbiguous(q)){b.classList.toggle('selected',selected.includes(letter));return;}const right=q.correct_answers.includes(letter);b.classList.toggle('correct',right);b.classList.toggle('incorrect',selected.includes(letter)&&!right);if(right)b.querySelector('.letter').textContent=letter+' ✓';else if(selected.includes(letter))b.querySelector('.letter').textContent=letter+' ×';});showFeedback(q,correct);}
function showFeedback(q,correct,scroll=true){const exp=QUESTION_EXPLANATIONS[q.id]||{},ambiguous=PracticeProgress.isAmbiguous(q),dispute=!q.answer_audit&&typeof DISPUTED_QUESTIONS!=='undefined'&&DISPUTED_QUESTIONS[q.id];$('options').querySelector('.peek-answer')?.remove();$('feedback').innerHTML=`<div class="result ${correct===false&&!ambiguous?'danger':''}">${correct===null?'已查看解析 · 不计分':ambiguous?'已完成对照 · 不计正确率':correct?'✓ 答对了':'✕ 再记一下'} · ${ambiguous?'参考选择（有歧义）':'校准答案'} ${esc(q.correct_answers.join('、'))}</div>${buildTwentyReview(q)}<button id="reviewNext" class="primary review-next">${at===pool.length-1?practiceLastLabel('看懂理由，下一题 →'):'看懂理由，下一题 →'}</button>${dispute?`<details><summary>查看此题争议</summary><div class="warning">${esc(dispute.reason)}<br>历史记录：${esc(dispute.current)} · 历史社区投票：${esc(dispute.community)}（${esc(dispute.vote)}，不作评分依据）</div></details>`:''}<details><summary>${getLearningLesson(q).uncertain?'核对原始资料（存在争议，不作为定论）':'展开原始完整解析'}</summary>${q.options.filter(o=>q.correct_answers.includes(o.letter)).map(o=>`<p><b>${esc(o.letter)}.</b> ${esc(o.text_zh||o.text)}</p>`).join('')}${[['题目条件',exp.requirements],['解题做法',exp.solutions||exp.solution],['操作步骤',Array.isArray(exp.steps)?exp.steps.join('\n'):exp.steps]].filter(([,v])=>v).map(([k,v])=>`<p><b>${k}</b><br>${esc(v)}</p>`).join('')}${Object.entries(exp.options||{}).map(([k,v])=>`<p><b>${esc(k)}.</b> ${esc(v)}</p>`).join('')}</details>`;$('reviewNext').onclick=advanceQuestion;renderLearningDiagrams($('feedback'));if(scroll){$('feedback').scrollIntoView({block:'start',behavior:'instant'});$('feedback').querySelector('.learning-review').focus({preventScroll:true});}}
$('modes').onclick=e=>{const b=e.target.closest('[data-mode]');if(b)start(b.dataset.mode);};$('submit').onclick=grade;$('prev').onclick=()=>{practiceInteracted=true;persistPracticeCursor=true;if(at>0){at--;render();}};$('next').onclick=advanceQuestion;$('star').onclick=()=>{const q=pool[at];if(!q)return;save(current=>{current.stars=current.stars.includes(q.id)?current.stars.filter(x=>x!==q.id):[...current.stars,q.id];});$('star').textContent=state.stars.includes(q.id)?'★ 已收藏':'☆ 收藏';};$('jump').max=Math.max(...CHOICE_QUESTIONS.map(q=>q.id));$('jumpForm').onsubmit=e=>{e.preventDefault();const id=Number($('jump').value);$('jumpNote').textContent='';if(!PRACTICE_IDS.has(id)){$('jumpNote').textContent=practiceSet?`第 ${id} 题不在当前集合中。请选集合内题号，或点击上方“退出集合，练全部题目”。`:'没有这个题号，请检查后重试。';return;}practiceLast=id;if(mode==='keywords'){$('keywordSearch').value='';start('keywords');at=pool.findIndex(q=>q.id===id);render();}else if(mode==='flash'){flash.scope='all';pool=[...PRACTICE_QUESTIONS];at=pool.findIndex(q=>q.id===id);render();}else start('order',{entryId:id});};if(!storageOK)$('saveNote').textContent='浏览器未允许保存；本次练习仍可继续。';

function renderKeywords(){
 $('questionHistory').hidden=true;stats();$('feedback').innerHTML='';$('options').innerHTML='';$('submit').hidden=true;$('selection').textContent='只背题眼和答案词';
 const term=$('keywordSearch').value.trim().toLowerCase();
 const cards=findQuickCards(PRACTICE_REVIEW_CARDS,QUICK_SEARCH_INDEX,term);
 pool=cards.map(c=>CHOICE_QUESTIONS.find(q=>q.id===c.id));if(at>=pool.length)at=0;
 $('keywordCount').textContent=`${PRACTICE_REVIEW_CARDS.length} 组题眼速记 · 当前匹配 ${pool.length} 组 · 题干、选项和速记均可检索`;
 const c=cards[at],q=pool[at];$('prev').disabled=!q||at===0;$('next').disabled=!q;$('star').hidden=!q;
 $('next').textContent=at===pool.length-1?practiceLastLabel('再背一轮 ↻'):'下一张 →';
 if(!q){$('position').textContent='没有匹配的速记卡';$('progress').style.width='0';$('question').innerHTML='<div class="empty"><h2>换一个关键词试试</h2><p>可搜服务名、场景或题号。可在当前练习范围内按题号前往。</p></div>';return;}
 $('position').textContent=`秒选卡 ${at+1} / ${pool.length} · 对应原题 ${q.id}`;
 $('progress').style.width=`${(at+1)/pool.length*100}%`;$('star').textContent=state.stars.includes(q.id)?'★ 已收藏':'☆ 收藏';
 rememberPracticeQuestion(q.id);
 const disputed=typeof DISPUTED_QUESTIONS!=='undefined'&&DISPUTED_QUESTIONS[q.id];
 $('question').innerHTML=`<h2 class="keyword-title">${esc(c.title)}</h2><div class="signal-label">① 题目出现这组字眼</div><div class="signal-chips">${c.when.map(t=>`<strong>${esc(t)}</strong>`).join('<span>＋</span>')}</div><div class="target-box"><div class="signal-label">② 选项里找这几个词</div><h3 id="keywordAnswer">${esc(c.target)}</h3><p>对应原题 ${q.id}：${esc(q.correct_answers.join(' + '))}${q.correct_answers.length>1?' · 多选，需全部选中':''}</p><button id="coverAnswer" class="quiet" aria-expanded="true">遮住答案，考自己</button></div>${renderAvoid(c.avoid)}${disputed?`<div class="warning">原题答案有争议：${esc(disputed.reason)}。本卡列出参考选择，请以校准说明和原题条件为准。</div>`:''}<details class="original"><summary>需要核对时，展开原题和选项</summary><p>${esc(q.question_zh||q.question)}</p>${q.options.map(o=>`<p><b>${esc(o.letter)}.</b> ${esc(o.text_zh||o.text)}</p>`).join('')}<button id="practiceOriginal">去做这道原题</button></details>`;
 $('coverAnswer').onclick=()=>{const answer=$('keywordAnswer'),hidden=!answer.hidden;answer.hidden=hidden;answer.nextElementSibling.hidden=hidden;$('coverAnswer').textContent=hidden?'显示答案':'遮住答案，考自己';$('coverAnswer').setAttribute('aria-expanded',String(!hidden));};
 $('practiceOriginal').onclick=()=>{practiceLast=q.id;start('order',{entryId:q.id});};
}
$('keywordSearch').addEventListener('input',()=>{at=0;renderKeywords();});

function advanceQuestion(){
 if(batchFinished||bankFinished)return;
 practiceInteracted=true;persistPracticeCursor=true;
 if(isUnansweredPractice()){
  readPracticeState();stats();
  let next=at+1;while(next<pool.length&&PracticeProgress.answered(state.answers,pool[next].id))next++;
  if(next>=pool.length){showBankCompletion();return;}
  at=next;render();$('practice').scrollIntoView({block:'start',behavior:'instant'});return;
 }
 if(isChapterBatch&&at>=pool.length-1){showBatchCompletion();return;}
 if(practiceSet?.kind==='lesson'&&at>=pool.length-1){window.location.href=practiceSet.returnHref;return;}
 if(mode==='flash'){flashMove();return;}
 if(at<pool.length-1){at++;render();}else if(mode==='order'){practiceLast=pool[0]?.id||PRACTICE_QUESTIONS[0]?.id;start(mode,{entryId:practiceLast});}else start(mode);
 $('practice').scrollIntoView({block:'start',behavior:'instant'});
}
$('practice').addEventListener('pointerdown',()=>{practiceInteracted=true;});
$('practiceFilterBar').onclick=event=>{const button=event.target.closest('[data-practice-filter]');if(!button)return;practiceFilter=button.dataset.practiceFilter;start(mode);};
LearningProgress.subscribe(event=>{
 if(LearningProgress.owner()!==practiceOwner){location.reload();return;}
 if(['cloud','tab','import'].includes(event.source)){
  if(!practiceSet&&!practiceInteracted&&!explicitPracticeEntry){const scopes=LearningProgress.get(ProgressModel.KEYS.scopes,{});start(scopes[PracticeProgress.KEYS.mode]===2?'random':'order',{initial:true});return;}
  stats();if(!bankFinished&&!batchFinished)renderQuestionHistory(pool[at]?.id);
 }
});
