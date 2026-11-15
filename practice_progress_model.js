(function(root){
 'use strict';
 const KEYS=Object.freeze({order:'bank:order',random:'bank:random',mode:'bank:mode'});
 const BANK_IDS=Object.freeze(Array.from({length:529},(_,index)=>index+1));
 const own=(value,key)=>value!==null&&typeof value==='object'&&Object.prototype.hasOwnProperty.call(value,key);
 function questionId(question){
  const raw=question&&typeof question==='object'?question.id:question;
  if(typeof raw!=='number'&&!(typeof raw==='string'&&/^\d+$/.test(raw)))return null;
  const value=Number(raw);
  return Number.isInteger(value)&&value>=1&&value<=BANK_IDS.length?value:null;
 }
 function uniqueQuestions(questions){
  const seen=new Set();
  return (Array.isArray(questions)?questions:[]).filter(question=>{
   const id=questionId(question);if(id===null||seen.has(id))return false;seen.add(id);return true;
  });
 }
 function answered(answers,id){
  const key=questionId(id);
  return key!==null&&own(answers,key)&&own(answers[key],'correct')&&typeof answers[key].correct==='boolean';
 }
 function isAmbiguous(question){return question?.answer_audit?.status==='ambiguous';}
 // Derive current correctness from the saved selection without rewriting the original record.
 function result(question,answer){
  if(!answer||typeof answer.correct!=='boolean'||isAmbiguous(question))return null;
  if(Array.isArray(question?.correct_answers)&&Array.isArray(answer.selected))return [...answer.selected].sort().join(',')===[...question.correct_answers].sort().join(',');
  return answer.correct;
 }
 function summarize(questions,answers){
  const unique=uniqueQuestions(questions),done=unique.filter(q=>answered(answers,questionId(q)));
  const correct=done.filter(q=>result(q,answers[questionId(q)])===true).length;
  const wrong=done.filter(q=>result(q,answers[questionId(q)])===false).length;
  return {total:unique.length,answered:done.length,remaining:unique.length-done.length,correct,wrong};
 }
 function revisionPrefix(question){return 'audit:'+String(question?.answer_audit?.revision||'calibrated').replace(/[^a-zA-Z0-9._-]/g,'_').slice(0,40)+':';}
 function unanswered(questions,answers){return uniqueQuestions(questions).filter(question=>!answered(answers,questionId(question)));}
 function nextUnanswered(questions,answers,afterId,includeCurrent=true){
  const ids=uniqueQuestions(questions).map(questionId);
  const index=ids.indexOf(questionId(afterId));
  const start=index<0?0:index+(includeCurrent?0:1);
  for(let offset=0;offset<ids.length;offset++){
   const id=ids[(start+offset)%ids.length];if(!answered(answers,id))return id;
  }
  return null;
 }
 const validAttempt=attempt=>attempt&&typeof attempt==='object'&&!Array.isArray(attempt)&&own(attempt,'id')&&typeof attempt.id==='string'&&attempt.id.length>0&&attempt.id.length<=128&&attempt.id.trim().length>0&&own(attempt,'at')&&typeof attempt.at==='number'&&Number.isFinite(attempt.at)&&attempt.at>=0&&attempt.at<Number.MAX_SAFE_INTEGER&&own(attempt,'correct')&&typeof attempt.correct==='boolean';
 const byRecent=(a,b)=>b.at-a.at||(a.id<b.id?-1:a.id>b.id?1:0);
 function cleanAttempts(attempts){
  const seen=new Set();
  return (Array.isArray(attempts)?attempts:[]).filter(validAttempt).map(({id,at,correct})=>({id,at,correct})).sort(byRecent).filter(attempt=>{if(seen.has(attempt.id))return false;seen.add(attempt.id);return true;});
 }
 function recent(answers,limit=10,questions=[]){
  const count=Number.isInteger(limit)?Math.max(0,Math.min(10,limit)):10;
  const records=[],questionMap=new Map(uniqueQuestions(questions).map(q=>[questionId(q),q]));
  for(const id of Object.keys(answers||{}))if(answered(answers,id)&&own(answers[id],'attempts')){
   const q=questionMap.get(Number(id));if(isAmbiguous(q))continue;
   // Old attempts have no selections, so their correctness cannot be reconstructed after a key change.
   const attempts=cleanAttempts(answers[id].attempts).filter(a=>!q?.answer_audit?.changed||a.id.startsWith(revisionPrefix(q)));
   records.push(...attempts);
  }
  const attempts=cleanAttempts(records).slice(0,count),correct=attempts.filter(attempt=>attempt.correct).length,total=attempts.length;
  return {total,correct,rate:total?Math.round(correct/total*100):null,attempts};
 }
 let attemptSequence=0;
 function makeAttemptId(){
  try{if(root.crypto&&typeof root.crypto.randomUUID==='function')return root.crypto.randomUUID();}catch{}
  return 'attempt-'+Date.now().toString(36)+'-'+(++attemptSequence).toString(36)+'-'+Math.random().toString(36).slice(2);
 }
 function recordAnswer(answers,qid,correct,selected,now=Date.now(),attemptId){
  const id=questionId(qid);
  if(id===null||typeof correct!=='boolean'||!Array.isArray(selected)||selected.length>8||!selected.every(letter=>typeof letter==='string'&&/^[A-H]$/.test(letter)))throw new TypeError('作答记录格式不正确。');
  const q=qid&&typeof qid==='object'?qid:null;
  const generated=attemptId===undefined?makeAttemptId():attemptId;
  const attempt={id:q?.answer_audit?.changed?revisionPrefix(q)+generated:generated,at:0,correct};
  const latest=recent(answers,1).attempts[0];
  const time=typeof now==='number'&&Number.isFinite(now)&&now>=0&&now<Number.MAX_SAFE_INTEGER?now:Date.now();
  attempt.at=Math.max(time,latest?latest.at+1:0);
  if(!validAttempt(attempt))throw new TypeError('作答时间或标识格式不正确。');
  const previous=answered(answers,id)&&own(answers[id],'attempts')?cleanAttempts(answers[id].attempts).filter(a=>!q?.answer_audit?.changed||a.id.startsWith(revisionPrefix(q))):[];
  const attempts=cleanAttempts([attempt,...previous.filter(item=>item.id!==attempt.id)]).slice(0,10);
  return {correct,selected:[...selected],attempts};
 }
 const api={KEYS,BANK_IDS,answered,isAmbiguous,result,summarize,unanswered,nextUnanswered,recent,recordAnswer};
 root.PracticeProgress=api;
 if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(globalThis);
