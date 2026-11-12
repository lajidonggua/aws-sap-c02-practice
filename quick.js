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
const practiceQuestionMap=new Map(CHOICE_QUESTIONS.map(q=>[q.id,q]));
const PRACTICE_QUESTIONS=practiceSet?practiceSet.ids.map(id=>practiceQuestionMap.get(id)):CHOICE_QUESTIONS;
const PRACTICE_IDS=new Set(PRACTICE_QUESTIONS.map(q=>q.id));
const practiceCardMap=new Map(ALL_REVIEW_CARDS.map(card=>[card.id,card]));
const PRACTICE_REVIEW_CARDS=PRACTICE_QUESTIONS.map(q=>practiceCardMap.get(q.id));
const practiceEntryId=Number(practiceParams.get('q'));
let practiceLast=practiceSet?practiceSet.ids[0]:state.last;
if(PRACTICE_IDS.has(practiceEntryId))practiceLast=practiceEntryId;
let mode='order',pool=[...PRACTICE_QUESTIONS],at=Math.max(0,pool.findIndex(q=>q.id===practiceLast)),selected=[],locked=false,revealed=false;
function rememberPracticeQuestion(id){
 if(practiceSet||mode==='order')practiceLast=id;
 if(practiceSet){try{const key=practiceSet.kind+':'+practiceParams.get(practiceSet.kind);const scopes=LearningProgress.get(ProgressModel.KEYS.scopes,{});scopes[key]=id;LearningProgress.put(ProgressModel.KEYS.scopes,scopes);}catch{}const url=new URL(window.location.href);url.searchParams.set('q',id);if(url.href!==window.location.href)history.replaceState(null,'',url);}
 else if(mode==='order'){state.last=id;save();}
}
if(practiceSet){
 const label=practiceSet.kind==='chapter'?'本章练习':'名词相关练习';
 $('practiceSetBanner').hidden=false;
 $('practiceSetBanner').innerHTML=`<div><span class="eyebrow">${label} · ${PRACTICE_QUESTIONS.length} 题</span><h2>${esc(practiceSet.title)}</h2><p>下一题按这个集合继续；下方练习方式也在此范围内。</p></div><div class="practice-set-links"><a href="${esc(practiceSet.returnHref)}">返回知识手册</a><a href="index.html">退出集合，练全部题目 →</a></div>`;
}
function save(){try{LearningProgress.setItem(KEY,JSON.stringify(state));}catch{storageOK=false;}if(!storageOK)$('saveNote').textContent='浏览器未允许保存；本次练习仍可继续。';}
function stats(){const a=PRACTICE_QUESTIONS.map(q=>state.answers[q.id]).filter(Boolean);$('stats').innerHTML=`<div class="stat"><b>${a.length}<small style="font-size:14px;color:#687873"> / ${PRACTICE_QUESTIONS.length}</small></b><span>已练题目</span></div><div class="stat"><b>${a.length?Math.round(a.filter(x=>x.correct).length/a.length*100):0}%</b><span>最近作答正确率</span></div>`;$('wrongCount').textContent=a.filter(x=>!x.correct).length;}
function start(nextMode){if(typeof stopFlash==='function')stopFlash();mode=nextMode;if(mode==='flash')flash.scope='all';pool=PRACTICE_QUESTIONS.filter(q=>mode==='keywords'?PRACTICE_REVIEW_CARDS.some(c=>c.id===q.id):mode==='wrong'?state.answers[q.id]&&!state.answers[q.id].correct:mode==='star'?state.stars.includes(q.id):true);if(mode==='random'){for(let i=pool.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];}}at=mode==='flash'?Math.max(0,pool.findIndex(q=>q.id===(practiceSet?practiceLast:flash.last))):mode==='order'?Math.max(0,pool.findIndex(q=>q.id===practiceLast)):0;document.querySelectorAll('[data-mode]').forEach(b=>b.classList.toggle('active',b.dataset.mode===mode));render();}
function render(){document.body.classList.toggle('flash-mode',mode==='flash');if(typeof stopFlash==='function')stopFlash(false);if(mode==='flash'){renderFlash();return;}$('keywordTools').hidden=mode!=='keywords';if(mode==='keywords'){renderKeywords();return;}selected=[];locked=false;revealed=false;stats();$('feedback').innerHTML='';$('options').innerHTML='';$('submit').hidden=true;$('selection').textContent='';const q=pool[at];$('prev').disabled=!q||at===0;$('next').disabled=!q;$('star').hidden=!q;$('next').textContent=at===pool.length-1?'再练一轮 ↻':'下一题 →';if(!q){$('position').textContent='暂无题目';$('progress').style.width='0';$('question').innerHTML=`<div class="empty"><h2>${mode==='wrong'?'暂时没有错题': '还没有收藏'}</h2><p class="muted">${mode==='wrong'?'答错的题会自动收进这里。':'遇到想再看的题，点右上角收藏。'}</p><button id="back" style="margin-top:18px">去顺序练习</button></div>`;$('back').onclick=()=>start('order');return;}rememberPracticeQuestion(q.id);$('position').textContent=`第 ${at+1} / ${pool.length} 题 · 原题 ${q.id}`;$('progress').style.width=`${(at+1)/pool.length*100}%`;$('star').textContent=state.stars.includes(q.id)?'★ 已收藏':'☆ 收藏';const count=q.correct_answers.length;const dispute=typeof DISPUTED_QUESTIONS!=='undefined'&&DISPUTED_QUESTIONS[q.id];$('question').innerHTML=`<span class="type">${count>1?'多选 · 选 '+count+' 项':'单选 · 选 1 项'}</span>${mode==='memory'?'<span class="type" style="margin-left:8px">先回想，再翻卡</span>':''}<div class="question-text">${esc(q.question_zh||q.question)}</div><details><summary>查看英文原题</summary><p>${esc(q.question)}</p></details>${dispute?'<div class="warning">此题答案存在争议，作答后可查看题库与社区的差异。</div>':''}`;
if(mode==='memory'){$('question').innerHTML=`<span class="type">直接背题 · 原题 ${q.id}</span><details><summary>需要时展开原题</summary><p>${esc(q.question_zh||q.question)}</p></details>`;revealed=true;showFeedback(q,null,false);return;}
if(mode==='order'){
 const cue=FLASH_CARDS[q.id];
 $('question').insertAdjacentHTML('beforeend',`<section class="inline-flash" aria-label="本题5秒闪记"><div class="inline-flash-head"><strong>5 秒闪记 · 边看边选</strong><button id="toggleInlineFlash" class="quiet" aria-expanded="true">收起提示</button></div><div id="inlineFlashWords"><p><span>题眼</span><b>${esc(cue.when)}</b></p><p><span>找词</span><b>${esc(flashAnswerWords(cue.target))}</b></p><small>答案字母已隐藏，直接在下方选答案${QUICK_ANSWER_CARDS[q.id].disputed||QUICK_ANSWER_CARDS[q.id].legacyMismatch?' · 此题存疑，答后核对':''}。</small></div></section>`);
 $('toggleInlineFlash').onclick=()=>{const content=$('inlineFlashWords');content.hidden=!content.hidden;$('toggleInlineFlash').textContent=content.hidden?'展开闪记提示':'收起提示';$('toggleInlineFlash').setAttribute('aria-expanded',String(!content.hidden));};
}
q.options.forEach(o=>{const b=document.createElement('button');b.className='option';b.dataset.letter=o.letter;b.setAttribute('aria-pressed','false');b.innerHTML=`<span class="letter">${esc(o.letter)}</span><span>${esc(o.text_zh||o.text)}</span>`;b.onclick=()=>choose(o.letter);$('options').appendChild(b);});if(count>1){$('submit').hidden=false;$('submit').disabled=true;$('selection').textContent=`已选 0 / ${count} 项`;}const peek=document.createElement('button');peek.className='peek-answer';peek.textContent=mode==='order'?'直接核对答案（不计分）':'直接看 5 秒闪记（不计分）';peek.onclick=()=>{revealed=true;locked=true;$('submit').hidden=true;document.querySelectorAll('.option').forEach(b=>b.disabled=true);peek.remove();showFeedback(q,null);};$('options').appendChild(peek);}
function choose(letter){if(locked)return;const q=pool[at];if(q.correct_answers.length===1){selected=[letter];grade();return;}if(selected.includes(letter))selected=selected.filter(x=>x!==letter);else if(selected.length<q.correct_answers.length)selected.push(letter);document.querySelectorAll('.option').forEach(b=>{b.classList.toggle('selected',selected.includes(b.dataset.letter));b.setAttribute('aria-pressed',String(selected.includes(b.dataset.letter)));});$('selection').textContent=`已选 ${selected.length} / ${q.correct_answers.length} 项`;$('submit').disabled=selected.length!==q.correct_answers.length;}
function grade(){if(locked)return;const q=pool[at];if(selected.length!==q.correct_answers.length)return;locked=true;const correct=[...selected].sort().join() === [...q.correct_answers].sort().join();state.answers[q.id]={correct,selected:[...selected]};save();stats();$('submit').hidden=true;document.querySelectorAll('.option').forEach(b=>{b.disabled=true;const letter=b.dataset.letter;const right=q.correct_answers.includes(letter);b.classList.toggle('correct',right);b.classList.toggle('incorrect',selected.includes(letter)&&!right);if(right)b.querySelector('.letter').textContent=letter+' ✓';else if(selected.includes(letter))b.querySelector('.letter').textContent=letter+' ×';});showFeedback(q,correct);}
function showFeedback(q,correct,scroll=true){const exp=QUESTION_EXPLANATIONS[q.id]||{},dispute=typeof DISPUTED_QUESTIONS!=='undefined'&&DISPUTED_QUESTIONS[q.id];$('options').querySelector('.peek-answer')?.remove();$('feedback').innerHTML=`<div class="result ${correct===false?'danger':''}">${correct===null?'直接背题 · 不计分':correct?'✓ 答对了':'✕ 再记一下'} · 题库答案 ${esc(q.correct_answers.join('、'))}</div>${buildTwentyReview(q)}<button id="reviewNext" class="primary review-next">记住了，下一题 →</button>${dispute?`<details><summary>查看此题争议</summary><div class="warning">${esc(dispute.reason)}<br>题库：${esc(dispute.current)} · 社区：${esc(dispute.community)}（${esc(dispute.vote)}）</div></details>`:''}<details><summary>${getLearningLesson(q).uncertain?'核对原始资料（存在争议，不作为定论）':'展开原始完整解析'}</summary>${q.options.filter(o=>q.correct_answers.includes(o.letter)).map(o=>`<p><b>${esc(o.letter)}.</b> ${esc(o.text_zh||o.text)}</p>`).join('')}${[['题目条件',exp.requirements],['解题做法',exp.solutions||exp.solution],['操作步骤',Array.isArray(exp.steps)?exp.steps.join('\n'):exp.steps]].filter(([,v])=>v).map(([k,v])=>`<p><b>${k}</b><br>${esc(v)}</p>`).join('')}${Object.entries(exp.options||{}).map(([k,v])=>`<p><b>${esc(k)}.</b> ${esc(v)}</p>`).join('')}</details>`;$('reviewNext').onclick=advanceQuestion;renderLearningDiagrams($('feedback'));if(scroll){$('feedback').scrollIntoView({block:'start',behavior:'instant'});$('feedback').querySelector('.learning-review').focus({preventScroll:true});}}
$('modes').onclick=e=>{const b=e.target.closest('[data-mode]');if(b)start(b.dataset.mode);};$('submit').onclick=grade;$('prev').onclick=()=>{if(at>0){at--;render();}};$('next').onclick=advanceQuestion;$('star').onclick=()=>{const q=pool[at];if(!q)return;state.stars=state.stars.includes(q.id)?state.stars.filter(x=>x!==q.id):[...state.stars,q.id];save();$('star').textContent=state.stars.includes(q.id)?'★ 已收藏':'☆ 收藏';};$('jump').max=Math.max(...CHOICE_QUESTIONS.map(q=>q.id));$('jumpForm').onsubmit=e=>{e.preventDefault();const id=Number($('jump').value);$('jumpNote').textContent='';if(!PRACTICE_IDS.has(id)){$('jumpNote').textContent=practiceSet?`第 ${id} 题不在当前集合中。请选集合内题号，或点击上方“退出集合，练全部题目”。`:'没有这个题号，请检查后重试。';return;}practiceLast=id;if(mode==='keywords'){$('keywordSearch').value='';start('keywords');at=pool.findIndex(q=>q.id===id);render();}else if(mode==='flash'){flash.scope='all';pool=[...PRACTICE_QUESTIONS];at=pool.findIndex(q=>q.id===id);render();}else start('order');};render();if(!storageOK)$('saveNote').textContent='浏览器未允许保存；本次练习仍可继续。';

function renderKeywords(){
 stats();$('feedback').innerHTML='';$('options').innerHTML='';$('submit').hidden=true;$('selection').textContent='只背题眼和答案词';
 const term=$('keywordSearch').value.trim().toLowerCase();
 const cards=findQuickCards(PRACTICE_REVIEW_CARDS,QUICK_SEARCH_INDEX,term);
 pool=cards.map(c=>CHOICE_QUESTIONS.find(q=>q.id===c.id));if(at>=pool.length)at=0;
 $('keywordCount').textContent=`${PRACTICE_REVIEW_CARDS.length} 组题眼速记 · 当前匹配 ${pool.length} 组 · 题干、选项和速记均可检索`;
 const c=cards[at],q=pool[at];$('prev').disabled=!q||at===0;$('next').disabled=!q;$('star').hidden=!q;
 $('next').textContent=at===pool.length-1?'再背一轮 ↻':'下一张 →';
 if(!q){$('position').textContent='没有匹配的速记卡';$('progress').style.width='0';$('question').innerHTML='<div class="empty"><h2>换一个关键词试试</h2><p>可搜服务名、场景或题号。可在当前练习范围内按题号前往。</p></div>';return;}
 $('position').textContent=`秒选卡 ${at+1} / ${pool.length} · 对应原题 ${q.id}`;
 $('progress').style.width=`${(at+1)/pool.length*100}%`;$('star').textContent=state.stars.includes(q.id)?'★ 已收藏':'☆ 收藏';
 rememberPracticeQuestion(q.id);
 const disputed=typeof DISPUTED_QUESTIONS!=='undefined'&&DISPUTED_QUESTIONS[q.id];
 $('question').innerHTML=`<h2 class="keyword-title">${esc(c.title)}</h2><div class="signal-label">① 题目出现这组字眼</div><div class="signal-chips">${c.when.map(t=>`<strong>${esc(t)}</strong>`).join('<span>＋</span>')}</div><div class="target-box"><div class="signal-label">② 选项里找这几个词</div><h3 id="keywordAnswer">${esc(c.target)}</h3><p>对应原题 ${q.id}：${esc(q.correct_answers.join(' + '))}${q.correct_answers.length>1?' · 多选，需全部选中':''}</p><button id="coverAnswer" class="quiet" aria-expanded="true">遮住答案，考自己</button></div>${renderAvoid(c.avoid)}${disputed?`<div class="warning">原题答案有争议：${esc(disputed.reason)}。本卡按题库整理。</div>`:''}<details class="original"><summary>需要核对时，展开原题和选项</summary><p>${esc(q.question_zh||q.question)}</p>${q.options.map(o=>`<p><b>${esc(o.letter)}.</b> ${esc(o.text_zh||o.text)}</p>`).join('')}<button id="practiceOriginal">去做这道原题</button></details>`;
 $('coverAnswer').onclick=()=>{const answer=$('keywordAnswer'),hidden=!answer.hidden;answer.hidden=hidden;answer.nextElementSibling.hidden=hidden;$('coverAnswer').textContent=hidden?'显示答案':'遮住答案，考自己';$('coverAnswer').setAttribute('aria-expanded',String(!hidden));};
 $('practiceOriginal').onclick=()=>{practiceLast=q.id;start('order');};
}
$('keywordSearch').addEventListener('input',()=>{at=0;renderKeywords();});

function advanceQuestion(){if(mode==='flash'){flashMove();return;}if(at<pool.length-1){at++;render();}else if(mode==='order'){practiceLast=pool[0]?.id||PRACTICE_QUESTIONS[0]?.id;start(mode);}else start(mode);$('practice').scrollIntoView({block:'start',behavior:'instant'});}
