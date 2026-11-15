/* Shared answer review for the home trainer, legacy practice and exam review. */
function reviewEscape(text){return String(text??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function renderTwentyAvoid(text){return text?`<details><summary>分不清时看易错点</summary><p>${reviewEscape(text)}</p></details>`:'';}
function buildTwentyReview(q){
 if(q.answer_audit){
  const a=q.answer_audit,letters=(a.answers||q.correct_answers).join(' + ');
  const selected=q.options.filter(o=>(a.answers||q.correct_answers).includes(o.letter));
  const memory=`<section class="twenty-review" tabindex="-1" aria-label="第 ${q.id} 题，校准要点"><div class="twenty-top"><strong>回看校准要点</strong><span>${a.status==='ambiguous'?'参考建议':'校准答案'} ${reviewEscape(letters)}</span></div><p>${reviewEscape(a.summary)}</p>${selected.map(o=>`<p><b>${reviewEscape(o.letter)}</b> ${reviewEscape(o.text_zh||o.text)}</p>`).join('')}${a.caveat?`<p class="twenty-note">${reviewEscape(a.caveat)}</p>`:''}</section>`;
  return buildLearningReview(q)+`<details class="lesson-memory"><summary>最后回看本题要点</summary>${memory}</details>`;
 }
 const c=QUICK_ANSWER_CARDS[q.id];
 const brief=typeof FLASH_CARDS!=='undefined'?FLASH_CARDS[q.id]:c;
 if(!c)throw new Error('Missing review for question '+q.id);
 const memory = `<section class="twenty-review" tabindex="-1" aria-label="第 ${q.id} 题，5 秒闪记"><div class="twenty-top"><strong>5 秒闪记</strong><span>题库答案 ${reviewEscape(q.correct_answers.join(' + '))}${q.correct_answers.length>1?' · 全部选中':''}</span></div><div class="twenty-row"><span class="twenty-label">看到</span><strong>${reviewEscape(brief.when)}</strong></div><div class="twenty-row twenty-answer"><span class="twenty-label">就找</span><strong>${reviewEscape(brief.target)}</strong></div>${renderTwentyAvoid(c.avoid)}${c.legacyMismatch?'<p class="twenty-note">旧解析与当前答案不一致；上方已按当前选项整理。</p>':''}${c.disputed?'<p class="twenty-note">本题尚有疑问；请对照完整选项与服务文档核对后再总结规律。</p>':''}${c.originalTerms?`<details class="review-english"><summary>核对英文原名（可跳过）</summary><p>题眼：${reviewEscape(c.originalTerms.when)}</p><p>答案词：${reviewEscape(c.originalTerms.target)}</p></details>`:''}</section>`;
 return buildLearningReview(q) + `<details class="lesson-memory"><summary>最后用 5 秒闪记巩固</summary>${memory}</details>`;
}
function showInlineQuick(q,scroll=true){
 const card=document.getElementById('questionCard');if(!card)return;
 card.querySelector('.inline-quick-review')?.remove();
 const wrapper=document.createElement('div');wrapper.className='inline-quick-review';wrapper.innerHTML=buildTwentyReview(q);card.appendChild(wrapper);
 renderLearningDiagrams(wrapper);
 if(scroll)wrapper.scrollIntoView({block:'start',behavior:'instant'});
}
