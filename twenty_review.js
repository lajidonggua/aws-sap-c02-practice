/* Shared answer review for the home trainer, legacy practice and exam review. */
function reviewEscape(text){return String(text??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function buildTwentyReview(q){
 const c=QUICK_ANSWER_CARDS[q.id];
 const brief=typeof FLASH_CARDS!=='undefined'?FLASH_CARDS[q.id]:c;
 if(!c)throw new Error('Missing review for question '+q.id);
 return `<section class="twenty-review" tabindex="-1" aria-label="第 ${q.id} 题，5 秒闪记"><div class="twenty-top"><strong>5 秒闪记</strong><span>题库答案 ${reviewEscape(q.correct_answers.join(' + '))}${q.correct_answers.length>1?' · 全部选中':''}</span></div><div class="twenty-row"><span class="twenty-label">看到</span><strong>${reviewEscape(brief.when)}</strong></div><div class="twenty-row twenty-answer"><span class="twenty-label">就找</span><strong>${reviewEscape(brief.target)}</strong></div><details><summary>分不清时看易错点</summary><p>${reviewEscape(c.avoid)}</p></details>${c.legacyMismatch?'<p class="twenty-note">旧解析与当前答案不一致；上方已按当前选项整理。</p>':''}${c.disputed?'<p class="twenty-note">此题有争议 / 原解析存疑，仅按题库记，不泛化为通用规则。</p>':''}${c.originalTerms?`<details class="review-english"><summary>核对英文原名（可跳过）</summary><p>题眼：${reviewEscape(c.originalTerms.when)}</p><p>答案词：${reviewEscape(c.originalTerms.target)}</p></details>`:''}</section>`;
}
function showInlineQuick(q,scroll=true){
 const card=document.getElementById('questionCard');if(!card)return;
 card.querySelector('.inline-quick-review')?.remove();
 const wrapper=document.createElement('div');wrapper.className='inline-quick-review';wrapper.innerHTML=buildTwentyReview(q);card.appendChild(wrapper);
 if(scroll)wrapper.scrollIntoView({block:'start',behavior:'instant'});
}
