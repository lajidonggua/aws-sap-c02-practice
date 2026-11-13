(function(root){
 'use strict';
 const DAY=86400000,intervals=[1,3,7,14];
 function review(previous,rating,now=Date.now()){
  if(!['again','fuzzy','clear'].includes(rating))throw new Error('请选择回想情况。');
  const streak=rating==='clear'?Math.min(4,(previous?.streak||0)+1):0;
  const days=streak?intervals[streak-1]:1;
  return {reviewedAt:now,dueAt:now+days*DAY,rating,reviews:(previous?.reviews||0)+1,streak};
 }
 function due(lessons,progress,now=Date.now()){
  return lessons.filter(l=>progress.reviews?.[l.id]?.dueAt<=now).sort((a,b)=>progress.reviews[a.id].dueAt-progress.reviews[b.id].dueAt);
 }
 function recommend(lessons,progress,now=Date.now()){
  const draft=progress.draft;
  if(draft&&lessons.some(l=>l.id===draft.id)&&!(progress.reviews?.[draft.id]?.reviewedAt>=draft.openedAt))return {id:draft.id,reason:'继续上次的小任务'};
  const pending=due(lessons,progress,now);
  if(pending.length)return {id:pending[0].id,reason:'先回想一张到期卡'};
  const fresh=lessons.find(l=>!progress.reviews?.[l.id]);
  if(fresh)return {id:fresh.id,reason:'按顺序学下一个要点'};
  return {id:lessons.some(l=>l.id===progress.last)?progress.last:lessons[0].id,reason:'今天没有到期卡，可练错题或休息'};
 }
 root.LearningPathModel={DAY,intervals,review,due,recommend};
 if(typeof module!=='undefined'&&module.exports)module.exports=root.LearningPathModel;
})(globalThis);
