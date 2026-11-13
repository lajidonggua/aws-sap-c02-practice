(function(){
 'use strict';
 const $=id=>document.getElementById(id),esc=t=>String(t??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const S=LearningProgress,K=ProgressModel.KEYS.path,M=LearningPathModel,lessons=SAP_PATH.lessons;
 const byId=new Map(lessons.map(l=>[l.id,l]));
 let current,minutes=5,draft=null,recallShown=false,spaceReview=false,lastCompleted=null;
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
  $('sessionPlan').textContent=minutes===5?'学 1 点 → 回想并对答案 → 做 1 道小测，带走一句要点。':minutes===10?'学 1 点 → 回想并对答案 → 做小测；有余力再练最多 2 道关联题。':'复习到期卡，再学 1 点；对照答案、做小测和最多 3 道关联题。';
  document.querySelectorAll('[data-minutes]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.minutes)===minutes)));
 }
 function route(){
  const p=state(),now=Date.now();
  $('route').innerHTML=SAP_PATH.stages.map((stage,i)=>`<details class="route-stage" ${current?.stage===stage.id?'open':''}><summary>${String(i+1).padStart(2,'0')} · ${esc(stage.title)}</summary><p>${esc(stage.why)}</p>${lessons.filter(l=>l.stage===stage.id).map(l=>{const r=p.reviews?.[l.id];return `<a href="#${l.id}" ${current?.id===l.id?'aria-current="page"':''}><span>${esc(l.title)}</span><small>${r?r.dueAt<=now?'待巩固':'已完成一轮':'未开始'}</small></a>`;}).join('')}</details>`).join('');
 }
 function choose(id,scroll=false,fresh=false){
  current=byId.get(id)||lessons[0];
  const p=state();
  const previous=p.reviews?.[current.id],expired=previous?.dueAt<=Date.now()&&previous.reviewedAt>=p.draft?.openedAt;
  draft=!fresh&&!expired&&p.draft?.id===current.id?{...p.draft}:{id:current.id,folded:!!previous,answer:null,openedAt:Date.now(),minutes};
  recallShown=false;spaceReview=false;
  minutes=draft.minutes;
  save({last:current.id,minutes,draft});
  const url=new URL(location.href);url.hash=current.id;history.replaceState(null,'',url);
  render();route();sessionInfo();
  if(scroll){$('lesson').scrollIntoView({block:'start',behavior:'instant'});$('lessonTitle').focus({preventScroll:true});}
 }
 function storeDraft(){save({last:current.id,minutes,draft:{...draft}});}
 function render(){
  const l=current,stage=SAP_PATH.stages.find(s=>s.id===l.stage),index=lessons.indexOf(l),p=state(),completed=p.reviews?.[l.id]?.reviewedAt>=draft.openedAt;
  const attempted=draft.answer!==null;
  $('lesson').innerHTML=`${lastCompleted&&lastCompleted.id!==l.id?`<div class="progress-celebration" role="status">✓ 已完成上一节：${esc(lastCompleted.title)}<span>已完成 ${lessons.filter(item=>p.reviews?.[item.id]).length} / ${lessons.length} 节的一轮学习。现在继续下一点。</span></div>`:''}<div class="lesson-head"><p class="eyebrow">${esc(stage.title)} · 第 ${index+1} / ${lessons.length} 张</p><h2 id="lessonTitle" tabindex="-1">${esc(l.title)}</h2><p class="goal">${esc(l.goal)}</p><p class="lesson-links"><a href="../learn/index.html#${esc(l.chapter)}">需要更多解释？查这一章 ↗</a></p></div><div class="lesson-body">
   <div id="concept" ${draft.folded?'hidden':''}><p class="step-label">01 / 看懂 · 只抓这几个点</p><div class="terms">${l.terms.map(t=>`<div class="term"><b>${esc(t.name)}</b><span>${esc(t.meaning)}</span></div>`).join('')}</div><ol class="points">${l.points.map(t=>`<li>${esc(t)}</li>`).join('')}</ol><p class="step-label">顺着这条线记</p><div class="memory-flow" aria-label="记忆顺序">${l.flow.map((t,i)=>(i?'<span class="arrow" aria-hidden="true">→</span>':'')+`<span class="node">${esc(t)}</span>`).join('')}</div><div class="contrast"><strong>${esc(l.contrast.a)} / ${esc(l.contrast.b)}</strong><p>${esc(l.contrast.rule)}</p></div></div>
   <button id="foldConcept" class="${draft.folded?'quiet':'primary'}" aria-expanded="${!draft.folded}" aria-controls="concept">${draft.folded?'需要时，再看知识点':'试着回想，再对照答案 →'}</button>
   <div id="recall" class="recall-box" ${draft.folded||attempted?'':'hidden'}><p class="step-label">02 / 回想与对照 · 想完就能核对</p><h3>${esc(l.recall)}</h3><p>先用自己的话说一说，再看参考答案。意思对上就可以，不必背原句。</p><button id="showRecallAnswer" aria-expanded="${recallShown}" aria-controls="recallAnswer">${recallShown?'收起参考答案':'看看参考答案，核对我的想法'}</button><div id="recallAnswer" class="recall-answer" ${recallShown?'':'hidden'}><h4>参考答案</h4><p>${esc(l.recallAnswer.summary)}</p><p class="answer-check-title">说到这些要点，就抓住了关键：</p><ul>${l.recallAnswer.checks.map(t=>`<li>${esc(t)}</li>`).join('')}</ul><p class="fine">漏了一点也没关系，补上这一点，再用下面的小场景试试。</p></div></div>
   <section id="quiz" class="quiz" ${draft.folded||attempted?'':'hidden'}><p class="step-label">03 / 小测与收获 · 用一个场景试试</p><h3>${esc(l.quiz.question)}</h3><div class="quiz-choices">${l.quiz.options.map((t,i)=>`<button class="quiz-choice ${attempted&&i===l.quiz.answer?'correct':''} ${attempted&&i===draft.answer&&i!==l.quiz.answer?'incorrect':''}" data-answer="${i}" aria-pressed="${draft.answer===i}" ${attempted?'disabled':''}><span class="letter">${String.fromCharCode(65+i)}</span><span>${esc(t)}</span></button>`).join('')}</div><div id="quizResult" class="quiz-result" ${attempted?'':'hidden'}>${attempted?quizFeedback(l):''}</div></section>
   <div id="afterQuiz" ${attempted?'':'hidden'}><section class="lesson-win"><p class="step-label">本节带走一句话</p><h3>${esc(l.takeaway)}</h3>${completed?completionHtml(l,p):`<p class="muted">小测已经做完。记下这条判断依据，就可以继续。</p><div class="completion-actions"><button id="completeContinue" class="primary">${index<lessons.length-1?'完成本节，继续下一节 →':'完成本节 ✓'}</button><button id="completeStop">这次先学到这里</button></div><p class="fine">完成后自动记下进度，默认安排明天巩固。</p><details class="review-choice"><summary>这一点已熟悉？调整复习间隔</summary><label><input id="spaceReview" type="checkbox" ${spaceReview?'checked':''}> 我已能解释，按间隔复习</label><p class="fine">连续选择后按 1、3、7、14 天逐步拉开；小测答对不会自动改变安排。</p></details>`}</section>${practiceHtml(l)}</div>
  </div>`;
  $('foldConcept').onclick=()=>{draft.folded=!draft.folded;storeDraft();render();if(draft.folded)$('recall').scrollIntoView({block:'center',behavior:'instant'});};
  $('showRecallAnswer').onclick=()=>{recallShown=!recallShown;$('recallAnswer').hidden=!recallShown;$('showRecallAnswer').setAttribute('aria-expanded',String(recallShown));$('showRecallAnswer').textContent=recallShown?'收起参考答案':'看看参考答案，核对我的想法';};
  document.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>{if(draft.answer!==null)return;draft.answer=Number(b.dataset.answer);draft.folded=true;storeDraft();render();$('quizResult').scrollIntoView({block:'center',behavior:'instant'});$('announcement').textContent=draft.answer===l.quiz.answer?'选对了，看看你抓住的关键条件。':'看看两个方案的具体差别，补上这一点就可以继续。';});
  if($('retryQuiz'))$('retryQuiz').onclick=()=>{draft.answer=null;draft.folded=true;storeDraft();render();};
  if($('spaceReview'))$('spaceReview').onchange=e=>{spaceReview=e.target.checked;};
  if($('completeStop'))$('completeStop').onclick=()=>{if(!completeLesson())return;render();route();sessionInfo();$('completionStatus').scrollIntoView({block:'center',behavior:'instant'});};
  if($('completeContinue'))$('completeContinue').onclick=()=>{if(completeLesson())continueLesson();};
  if($('continuePath'))$('continuePath').onclick=continueLesson;
 }
 function quizFeedback(l){
  const correct=draft.answer===l.quiz.answer;
  return `<h3>${correct?'✓ 选对了，你抓住了这个场景的关键。':'关键差别在这里，看完就能补上。'}</h3>${correct?'':`<p class="chosen-reason"><b>你选了 ${String.fromCharCode(65+draft.answer)}，差在：</b><br>${esc(l.quiz.explanations[draft.answer])}</p>`}<p class="correct-reason"><b>${String.fromCharCode(65+l.quiz.answer)} 符合条件，因为：</b><br>${esc(l.quiz.explanations[l.quiz.answer])}</p><details class="other-options"><summary>看看${correct?'其他':'其余'}选项为什么不合适</summary>${l.quiz.explanations.map((t,i)=>i!==l.quiz.answer&&(correct||i!==draft.answer)?`<p><b>${String.fromCharCode(65+i)}.</b> ${esc(t)}</p>`:'').join('')}</details><p class="transfer">换个条件看：${esc(l.quiz.change)}</p><button class="quiet" id="retryQuiz">想再试一次？重做小测</button>`;
 }
 function completeLesson(){
  const latest=state();if(draft.answer===null||latest.reviews?.[current.id]?.reviewedAt>=draft.openedAt)return false;
  // The default is a next-day reminder, not an inferred confidence rating.
  const reviews={...latest.reviews,[current.id]:M.review(latest.reviews?.[current.id],spaceReview?'clear':'fuzzy')};
  save({reviews});lastCompleted={id:current.id,title:current.title};$('announcement').textContent='本节已完成。'+reviewMessage(reviews[current.id]);return true;
 }
 function continueLesson(){
  const p=state();if(!(p.reviews?.[current.id]?.reviewedAt>=draft.openedAt))return;
  const next=nextLesson(p);
  if(next){choose(next.id,true,true);return;}
  render();route();sessionInfo();$('completionStatus')?.scrollIntoView({block:'center',behavior:'instant'});
 }
 function nextLesson(p){return lessons[lessons.indexOf(current)+1]||lessons.find(l=>!p.reviews?.[l.id]);}
 function completionHtml(l,p){
  const count=lessons.filter(item=>p.reviews?.[item.id]).length,stageCount=lessons.filter(item=>item.stage===l.stage&&p.reviews?.[item.id]).length;
  return `<div id="completionStatus" class="completion-status" role="status"><h4>✓ 本节这一轮完成了，收获已经记下。</h4><p>已完成 ${count} / ${lessons.length} 节 · 当前阶段 ${stageCount} / 3 节</p><p class="fine">${S.status().storageOK?reviewMessage(p.reviews[l.id]):'本次学习已完成；浏览器无法保存，关闭页面后可能丢失。'}</p></div><div class="lesson-next">${nextLesson(p)?'<button id="continuePath" class="primary">继续下一节 →</button>':'<a class="primary" href="#methods">24 节已完成一轮，看看怎样巩固 ↓</a>'}<a href="../account/index.html">查看我的学习进度</a></div>`;
 }
 function reviewMessage(r){return '下次巩固：'+new Date(r.dueAt).toLocaleDateString('zh-CN',{month:'long',day:'numeric'})+'（约 '+Math.max(0,Math.ceil((r.dueAt-Date.now())/M.DAY))+' 天后）。';}
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
