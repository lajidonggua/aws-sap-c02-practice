'use strict';
const FLASH_KEY='sap-five-second-v1';
let flash={again:[],known:[],last:1,scope:'all',recall:false},flashPlaying=false,flashTimer=null,flashDeadline=0;
try{const saved=JSON.parse(LearningProgress.getItem(FLASH_KEY));if(saved){for(const key of ['again','known'])if(Array.isArray(saved[key]))flash[key]=saved[key].filter(id=>CHOICE_QUESTIONS.some(q=>q.id===id));if(CHOICE_QUESTIONS.some(q=>q.id===saved.last))flash.last=saved.last;}}catch{}
function renderFlashAvoid(text){return text?`<p><b>别选错：</b>${String(text).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}</p>`:'';}
function saveFlash(){try{LearningProgress.setItem(FLASH_KEY,JSON.stringify({again:flash.again,known:flash.known,last:flash.last}));}catch{$('saveNote').textContent='浏览器未允许保存；本次闪记仍可继续。';}}
function stopFlash(pause=true){clearInterval(flashTimer);flashTimer=null;if(pause)flashPlaying=false;}
function flashMove(){if(at<pool.length-1){at++;render();}else{stopFlash();$('flashStatus').textContent='这一轮已结束。可重新过一轮，或只背没记住的题。';$('flashPlay').textContent='重新播放这一轮';$('flashPlay').onclick=()=>{if(flash.scope==='again')pool=PRACTICE_QUESTIONS.filter(q=>flash.again.includes(q.id));at=0;flashPlaying=true;render();};}}
function flashMark(known){const q=pool[at];if(!q)return;flash.again=flash.again.filter(id=>id!==q.id);flash.known=flash.known.filter(id=>id!==q.id);flash[known?'known':'again'].push(q.id);saveFlash();flashMove();if($('flashAgainCount'))$('flashAgainCount').textContent=flash.again.filter(id=>PRACTICE_IDS.has(id)).length;}
function flashScope(scope){stopFlash();flash.scope=scope;pool=PRACTICE_QUESTIONS.filter(q=>scope==='all'||flash.again.includes(q.id));at=0;render();}
function revealFlash(){const a=$('flashAnswer');if(a){a.hidden=false;$('flashReveal').hidden=true;}}
function runFlashTimer(){if(!flashPlaying||!pool[at])return;flashDeadline=Date.now()+5000;flashTimer=setInterval(()=>{const left=Math.max(0,flashDeadline-Date.now());const bar=$('flashClockBar');if(!bar){stopFlash();return;}bar.style.width=(left/50)+'%';$('flashSeconds').textContent=(left/1000).toFixed(1)+' 秒';if(flash.recall&&left<=3000)revealFlash();if(left===0){stopFlash(false);flashMove();}},100);}
function renderFlash(){
 $('keywordTools').hidden=true;$('feedback').innerHTML='';$('options').innerHTML='';$('submit').hidden=true;$('selection').textContent='';stats();
 const q=pool[at];$('prev').disabled=!q||at===0;$('next').disabled=!q;$('star').hidden=!q;$('next').textContent=at===pool.length-1?'结束本轮':'下一张 →';
 if(!q){$('position').textContent='再背清单为空';$('progress').style.width='0';$('question').innerHTML=`<div class="empty"><h2>暂时没有要再背的题</h2><p>遇到卡住的题，按「没记住」收进这里。</p><button id="flashAll">${practiceSet?'背本集合全部题目':'背全部题目'}</button></div>`;$('flashAll').onclick=()=>flashScope('all');stopFlash();return;}
 rememberPracticeQuestion(q.id);if(!practiceSet){flash.last=q.id;saveFlash();}const c=FLASH_CARDS[q.id],full=QUICK_ANSWER_CARDS[q.id];
 $('position').textContent=`${flash.scope==='all'?(practiceSet?'当前集合':'全部题目'):'再背清单'} ${at+1} / ${pool.length} · 原题 ${q.id}`;$('progress').style.width=((at+1)/pool.length*100)+'%';$('star').textContent=state.stars.includes(q.id)?'★ 已收藏':'☆ 收藏';
 $('question').innerHTML=`<div class="flash-settings"><button id="flashAll" class="${flash.scope==='all'?'active':''}">${practiceSet?'本集合':'全部'} ${PRACTICE_QUESTIONS.length} 题</button><button id="flashAgain" class="${flash.scope==='again'?'active':''}">只背没记住的 <span id="flashAgainCount">${flash.again.filter(id=>PRACTICE_IDS.has(id)).length}</span></button><label><input type="checkbox" id="flashRecall" ${flash.recall?'checked':''}>也遮住关键词，练回想</label></div>
 <div class="flash-cue"><span class="signal-label">看到这组题眼</span><h2>${esc(c.when)}</h2></div><div class="flash-arrow">↓ 对照原题，找这些答案词</div>
 <div class="flash-answer-box"><div id="flashAnswer" ${flash.recall?'hidden':''}><h2>${esc(flashAnswerWords(c.target))}</h2><p>${q.correct_answers.length>1?'多选 '+q.correct_answers.length+' 项，不能漏选':'单选'}${flash.known.includes(q.id)?' · 已标记记住':''}</p></div><button id="flashReveal" ${flash.recall?'':'hidden'}>回想一下，点此看关键词</button></div>
 <div class="flash-compare"><a href="${practiceSet?window.location.pathname+window.location.search:(q.correct_answers.length>1?'multi':'choice')+'/index.html?q='+q.id}" target="_blank" rel="noopener">另开本题，对照做题 ↗</a><details><summary>做完再核对答案字母</summary><p>本题答案：${esc(q.correct_answers.join(' + '))}</p></details></div>
 ${(full.disputed||full.legacyMismatch)?'<p class="flash-caution">此题有争议或旧解析不一致 · 按当前题库记，展开核对</p>':''}
 <div class="flash-clock"><div id="flashClockBar"></div></div><div class="flash-playback"><button id="flashPlay">${flashPlaying?'暂停':'开始 5 秒自动翻题'}</button><span id="flashSeconds">5.0 秒</span></div>
 <div class="flash-decisions"><button id="flashMiss">没记住 · 稍后再背 <kbd>←</kbd></button><button id="flashKnown" class="primary">记住了 · 下一题 <kbd>→</kbd></button></div><p id="flashStatus" class="muted">${flash.recall?'自动播放：2 秒回想 + 3 秒看关键词。':'答案字母默认隐藏；先对照关键词自己选。'} 空格暂停 / 继续。</p>
 <details id="flashDetails"><summary>停下来理解：知识点、名词和图解</summary>${renderFlashAvoid(full.avoid)}<p>${esc(q.question_zh||q.question)}</p>${q.options.map(o=>`<p class="${q.correct_answers.includes(o.letter)?'flash-correct':''}"><b>${esc(o.letter)}${q.correct_answers.includes(o.letter)?' ✓':''}</b> ${esc(o.text_zh||o.text)}</p>`).join('')}<p>本卡只帮助识别当前原题；遇到条件变化，请核对完整选项。</p>${buildLearningReview(q)}</details>`;
 $('flashAll').onclick=()=>flashScope('all');$('flashAgain').onclick=()=>flashScope('again');$('flashReveal').onclick=revealFlash;
 $('flashRecall').onchange=e=>{flash.recall=e.target.checked;render();};
 $('flashPlay').onclick=()=>{if(flashPlaying){stopFlash();$('flashPlay').textContent='继续 5 秒自动翻题';$('flashSeconds').textContent='已暂停';}else{flashPlaying=true;$('flashPlay').textContent='暂停';runFlashTimer();}};
 $('flashMiss').onclick=()=>flashMark(false);$('flashKnown').onclick=()=>flashMark(true);
 $('flashDetails').ontoggle=()=>{if($('flashDetails').open){renderLearningDiagrams($('flashDetails'));stopFlash();$('flashPlay').textContent='继续 5 秒自动翻题';$('flashSeconds').textContent='已暂停';}};
 runFlashTimer();
}
document.addEventListener('visibilitychange',()=>{if(document.hidden&&mode==='flash'){stopFlash();if($('flashPlay'))$('flashPlay').textContent='继续 5 秒自动翻题';if($('flashSeconds'))$('flashSeconds').textContent='已暂停';}});
document.addEventListener('keydown',e=>{if(mode!=='flash'||/INPUT|TEXTAREA|SELECT|BUTTON|SUMMARY/.test(e.target.tagName)||e.altKey||e.ctrlKey||e.metaKey||e.repeat)return;if(e.code==='Space'){e.preventDefault();$('flashPlay')?.click();}else if(e.code==='ArrowLeft'){e.preventDefault();flashMark(false);}else if(e.code==='ArrowRight'){e.preventDefault();flashMark(true);}});
start('order');
