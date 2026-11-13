(function(){
 'use strict';
 const $=id=>document.getElementById(id),esc=t=>String(t??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const S=LearningProgress,K=ProgressModel.KEYS.path,M=LearningPathModel,lessons=SAP_PATH.lessons;
 const byId=new Map(lessons.map(l=>[l.id,l]));
 let current,minutes=5,draft=null,checkHidden=false;
 const state=()=>S.get(K,{reviews:{}});
 function save(update){
  try{const latest=state();S.put(K,{...latest,...update});updateSaveStatus();return true;}
  catch{$('saveStatus').textContent='当前浏览器无法保存；仍可完成这次学习。';return false;}
 }
 function updateSaveStatus(){
  const account=globalThis.LearningAccount?.state();
  $('saveStatus').textContent=!S.status().storageOK?'当前浏览器无法保存；仍可完成这次学习。':account?.user?(account.status==='synced'?'进度已随账号同步。':account.status==='offline'?'已保存在本机，联网后继续同步。':account.status==='expired'?'本机已保存，重新登录后恢复同步。':'本机已保存，账号同步中。'):'本机自动保存；登录后随账号同步。';
 }
 function sessionInfo(){
  const p=state(),r=M.recommend(lessons,p);
  $('recommendation').textContent=lessons.every(l=>p.reviews?.[l.id])&&!M.due(lessons,p).length?'今天没有到期卡，可复盘错题或休息；也可继续当前卡。':r.reason+' · '+byId.get(r.id).title;
  $('reviewedCount').textContent=lessons.filter(l=>p.reviews?.[l.id]).length;
  $('dueCount').textContent=M.due(lessons,p).length;
  $('sessionPlan').textContent=minutes===5?'学 1 点 → 遮住回想 → 做 1 道小测。有余力再练 1 道关联题。':minutes===10?'学 1 点 → 遮住回想 → 做小测和最多 2 道关联题，说出选择理由。':'先回想到期卡，再学 1 点；做小测和最多 3 道关联题，补一句错因。';
  document.querySelectorAll('[data-minutes]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.minutes)===minutes)));
 }
 function route(){
  const p=state(),now=Date.now();
  $('route').innerHTML=SAP_PATH.stages.map((stage,i)=>`<details class="route-stage" ${current?.stage===stage.id?'open':''}><summary>${String(i+1).padStart(2,'0')} · ${esc(stage.title)}</summary><p>${esc(stage.why)}</p>${lessons.filter(l=>l.stage===stage.id).map(l=>{const r=p.reviews?.[l.id];return `<a href="#${l.id}" ${current?.id===l.id?'aria-current="page"':''}><span>${esc(l.title)}</span><small>${r?r.dueAt<=now?'待复习':'已回想':'未开始'}</small></a>`;}).join('')}</details>`).join('');
 }
 function choose(id,scroll=false,fresh=false){
  current=byId.get(id)||lessons[0];
  const p=state();
  const previous=p.reviews?.[current.id],expired=previous?.dueAt<=Date.now()&&previous.reviewedAt>=p.draft?.openedAt;
  draft=!fresh&&!expired&&p.draft?.id===current.id?{...p.draft}:{id:current.id,folded:!!previous,answer:null,openedAt:Date.now(),minutes};
  checkHidden=false;
  minutes=draft.minutes;
  save({last:current.id,minutes,draft});
  const url=new URL(location.href);url.hash=current.id;history.replaceState(null,'',url);
  render();route();sessionInfo();
  if(scroll){$('lesson').scrollIntoView({block:'start',behavior:'instant'});$('lessonTitle').focus({preventScroll:true});}
 }
 function storeDraft(){save({last:current.id,minutes,draft:{...draft}});}
 function render(){
  const l=current,stage=SAP_PATH.stages.find(s=>s.id===l.stage),index=lessons.indexOf(l),p=state(),rated=p.reviews?.[l.id]?.reviewedAt>=draft.openedAt;
  const attempted=draft.answer!==null;
  $('lesson').innerHTML=`<div class="lesson-head"><p class="eyebrow">${esc(stage.title)} · 第 ${index+1} / ${lessons.length} 张</p><h2 id="lessonTitle" tabindex="-1">${esc(l.title)}</h2><p class="goal">${esc(l.goal)}</p><p class="lesson-links"><a href="../learn/index.html#${esc(l.chapter)}">需要更多解释？查这一章 ↗</a></p></div><div class="lesson-body">
   <div id="concept" ${draft.folded?'hidden':''}><p class="step-label">01 / 看懂 · 只抓这几个点</p><div class="terms">${l.terms.map(t=>`<div class="term"><b>${esc(t.name)}</b><span>${esc(t.meaning)}</span></div>`).join('')}</div><ol class="points">${l.points.map(t=>`<li>${esc(t)}</li>`).join('')}</ol><p class="step-label">顺着这条线记</p><div class="memory-flow" aria-label="记忆顺序">${l.flow.map((t,i)=>(i?'<span class="arrow" aria-hidden="true">→</span>':'')+`<span class="node">${esc(t)}</span>`).join('')}</div><div class="contrast"><strong>${esc(l.contrast.a)} / ${esc(l.contrast.b)}</strong><p>${esc(l.contrast.rule)}</p></div></div>
   <button id="foldConcept" class="${draft.folded?'quiet':'primary'}" aria-expanded="${!draft.folded}" aria-controls="concept">${draft.folded?'忘了？再看一眼知识点':'遮住知识点，试着回想 →'}</button>
   <div id="recall" class="recall-box" ${draft.folded||attempted?'':'hidden'}><p class="step-label">02 / 回想 · 先在心里说，再检验</p><h3>${esc(l.recall)}</h3><p>用自己的话说 20～30 秒；说不清可以回看，不必背原句。</p></div>
   <section id="quiz" class="quiz" ${(draft.folded||attempted)&&!checkHidden?'':'hidden'}><p class="step-label">03 / 检验 · 一个小场景</p><h3>${esc(l.quiz.question)}</h3><div class="quiz-choices">${l.quiz.options.map((t,i)=>`<button class="quiz-choice ${attempted&&i===l.quiz.answer?'correct':''} ${attempted&&i===draft.answer&&i!==l.quiz.answer?'incorrect':''}" data-answer="${i}" aria-pressed="${draft.answer===i}" ${attempted?'disabled':''}><span class="letter">${String.fromCharCode(65+i)}</span><span>${esc(t)}</span></button>`).join('')}</div><div id="quizResult" class="quiz-result" ${attempted?'':'hidden'}>${attempted?`<h3>${draft.answer===l.quiz.answer?'这个场景判断正确。':'这里容易混淆，先看差别。'} 正确选项：${String.fromCharCode(65+l.quiz.answer)}</h3>${l.quiz.explanations.map((t,i)=>`<p><b>${String.fromCharCode(65+i)} · ${i===l.quiz.answer?'符合条件':'为什么不选'}</b><br>${esc(t)}</p>`).join('')}<p class="transfer">换个条件想一想：${esc(l.quiz.change)}</p><button class="quiet" id="retryQuiz">再遮住答案，重做一次</button>`:''}</div></section>
   <div id="afterQuiz" ${attempted?'':'hidden'}>${practiceHtml(l)}<section class="rating"><p class="step-label">04 / 留一个复习提醒</p><h3>现在遮住内容，能解释刚才的选择吗？</h3><p class="muted">答对一次不等于记住。按回想情况选择，系统只安排下次复习。</p><button id="coverCheck" class="quiet" aria-expanded="${!checkHidden}" aria-controls="quiz">${checkHidden?'再看小测和解析':'遮住小测和解析，再回想'}</button><div class="rating-buttons"><button data-rating="again" ${rated||!checkHidden?'disabled':''}>没想起<small>明天再看</small></button><button data-rating="fuzzy" ${rated||!checkHidden?'disabled':''}>还模糊<small>明天巩固</small></button><button data-rating="clear" ${rated||!checkHidden?'disabled':''}>能解释<small>逐步拉开间隔</small></button></div><p id="ratingStatus" class="rating-status" role="status">${rated?reviewMessage(p.reviews[l.id]):'先遮住小测和解析，说出选择理由，再评价。'}</p><div class="lesson-next" ${rated?'':'hidden'} id="lessonNext"><button id="continuePath" class="primary">${index<lessons.length-1?'下一张知识卡 →':'查看接下来学什么 →'}</button><a href="#methods">记忆与刷题方法</a></div></section></div>
  </div>`;
  $('foldConcept').onclick=()=>{checkHidden=false;draft.folded=!draft.folded;storeDraft();render();if(draft.folded)$('recall').scrollIntoView({block:'center',behavior:'instant'});};
  document.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>{if(draft.answer!==null)return;draft.answer=Number(b.dataset.answer);draft.folded=true;storeDraft();render();$('quizResult').scrollIntoView({block:'center',behavior:'instant'});$('announcement').textContent=draft.answer===l.quiz.answer?'小测回答正确，请解释选择理由。':'先看选项差别，再回想一次。';});
  if($('coverCheck'))$('coverCheck').onclick=()=>{checkHidden=!checkHidden;draft.folded=true;storeDraft();render();};
  if($('retryQuiz'))$('retryQuiz').onclick=()=>{checkHidden=false;draft.answer=null;draft.folded=true;storeDraft();render();};
  document.querySelectorAll('[data-rating]').forEach(b=>b.onclick=()=>{
   const latest=state();if(latest.reviews?.[l.id]?.reviewedAt>=draft.openedAt)return;
   const reviews={...latest.reviews,[l.id]:M.review(latest.reviews?.[l.id],b.dataset.rating)};
   save({reviews});render();route();sessionInfo();$('announcement').textContent=reviewMessage(reviews[l.id]);
  });
  if($('continuePath'))$('continuePath').onclick=()=>{const next=lessons[index+1];choose(next?.id||M.recommend(lessons,state()).id,true,true);};
 }
 function reviewMessage(r){return '本次回想已记录。下次复习：'+new Date(r.dueAt).toLocaleDateString('zh-CN',{month:'long',day:'numeric'})+'（约 '+Math.max(0,Math.ceil((r.dueAt-Date.now())/M.DAY))+' 天后）。';}
 function practiceHtml(l){
  const ids=l.questions.slice(0,minutes/5),scoped=S.get(ProgressModel.KEYS.scopes,{})['lesson:'+l.id];
  if(!ids.length)return '<section class="bank-practice"><h3>这一张先把基础说清楚</h3><p>本节的小测就足够作为第一次检验。接下来再进入服务选择和原题练习。</p></section>';
  const q=ids.includes(scoped)?scoped:ids[0],href='../index.html?lesson='+encodeURIComponent(l.id)+'&count='+ids.length+'&q='+q;
  return `<section class="bank-practice"><h3>有余力，再把概念放进原题</h3><p>本次最多 ${ids.length} 题，下一题仍在本组内；最后可返回这张卡。原题可能组合多个知识点，先关注本节的判断依据。</p><a id="practiceLesson" class="primary" href="${esc(href)}">练 ${ids.length} 道关联题 →</a></section>`;
 }
 document.querySelectorAll('[data-minutes]').forEach(b=>b.onclick=()=>{minutes=Number(b.dataset.minutes);if(draft){draft.minutes=minutes;storeDraft();render();}else save({minutes});sessionInfo();});
 $('startSession').onclick=()=>{const r=M.recommend(lessons,state());choose(r.id,true,r.reason!=='继续上次的小任务');};
 addEventListener('hashchange',()=>{const id=location.hash.slice(1);if(byId.has(id)&&id!==current?.id)choose(id,true);});
 document.addEventListener('sap-account-change',updateSaveStatus);
 S.subscribe(event=>{if(['cloud','tab'].includes(event.source)){sessionInfo();route();}});
 const p=state();minutes=[5,10,15].includes(p.minutes)?p.minutes:5;
 $('references').innerHTML=(SAP_PATH.sources||[]).map(s=>`<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.title)} ↗</a></li>`).join('');
 const requested=location.hash.slice(1);choose(byId.has(requested)?requested:M.recommend(lessons,p).id,byId.has(requested));
})();
