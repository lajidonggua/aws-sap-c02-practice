/* Compile individually reviewed evidence into the single bank used by every route. */
const fs=require('fs'),path=require('path'),vm=require('vm');
const root=path.resolve(__dirname,'..');
const read=n=>fs.readFileSync(path.join(root,n),'utf8');
const context=vm.createContext({});
vm.runInContext(read('sap_questions.js')+'\n'+read('sap_explanations.js')+'\n;this.questions=CHOICE_QUESTIONS;this.explanations=QUESTION_EXPLANATIONS;',context);
const rows=['q001-140.json','q141-280.json','q281-420.json','q421-529.json'].flatMap(n=>JSON.parse(read('docs/answer-audit/'+n))).sort((a,b)=>a.id-b.id);
if(rows.length!==529||new Set(rows.map(r=>r.id)).size!==529)throw Error('Audit incomplete: '+rows.length+'/529');
const disputes={};let changed=0,ambiguous=0;
for(const [i,r] of rows.entries()){
 if(r.id!==i+1)throw Error('Missing Q'+(i+1));
 const q=context.questions.find(q=>q.id===r.id);if(!q)throw Error('Unknown question '+r.id);
 if(!['confirmed','corrected','ambiguous'].includes(r.status)||!r.summary||!r.sources.length)throw Error('Incomplete review '+r.id);
 for(const s of r.sources){const url=new URL(s.url);if(url.protocol!=='https:'||!(/(^|\.)amazon\.com$|(^|\.)amazonaws\.com$|(^|\.)repost\.aws$|(^|\.)aws\.github\.io$/.test(url.hostname)))throw Error('Non-AWS source Q'+r.id+': '+s.url);}
 for(const repair of r.optionLabelRepair||[]){const option=q.options[repair.index];if(![repair.from,repair.to].includes(option.letter))throw Error('Bad label repair Q'+r.id);option.letter=repair.to;}
 for(const [letter,text] of Object.entries(r.optionTextZhRepairs||{})){q.options.find(o=>o.letter===letter).text_zh=text;}
 const letters=q.options.map(o=>o.letter);if(new Set(letters).size!==letters.length)throw Error('Duplicate option Q'+r.id);
 if(r.answers.length!==q.multi_count||!r.answers.every(a=>letters.includes(a)))throw Error('Invalid answer Q'+r.id);
 if(r.originalAnswers.slice().sort().join()!== (q.answer_audit?.originalAnswers||q.correct_answers).slice().sort().join())throw Error('Incorrect provenance Q'+r.id);
 if(letters.some(l=>!r.optionReasons[l]))throw Error('Missing option analysis Q'+r.id);
 const baseline=q.answer_audit?.originalAnswers||r.originalAnswers;
 q.correct_answers=r.answers;q.is_multi=r.answers.length>1;
 const actualChanged=baseline.slice().sort().join()!==r.answers.slice().sort().join();
 if(actualChanged)changed++;
 q.answer_audit={...r,originalAnswers:baseline,revision:'2026-11-16',changed:actualChanged};
 const old=context.explanations[q.id]||{};
 // Legacy diagrams/steps were authored against unverified keys. Preserve them in Git history,
 // and replace their conclusions with the current per-option review rather than teach stale architecture.
 context.explanations[q.id]={
  blocker:q.question_zh||q.question,
  requirements:'按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。',
  steps:r.answers.map(l=>l+'：'+r.optionReasons[l]),
  solutions:(r.status==='ambiguous'?'参考选择为 ':'正确答案为 ')+r.answers.join('、')+'。'+r.summary,
  result_flow:r.caveat||'检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。',
  options:r.optionReasons,
  sources:r.sources,
  audit_caveat:r.caveat||'',
  audit_status:r.status
 };
 if(r.status==='ambiguous'){
  ambiguous++;
  disputes[q.id]={current:r.answers.join('、'),community:(q.community_vote||[]).join('、')||'无',vote:q.vote_percentage||'无',reason:r.caveat||r.summary,audited:true};
 }
}
fs.writeFileSync(path.join(root,'sap_questions.js'),'/* English questions preserved; answers individually reviewed against AWS sources, 2026-11-16. */\nconst CHOICE_QUESTIONS = '+JSON.stringify(context.questions,null,2)+';\n\nconst DISPUTED_QUESTIONS = '+JSON.stringify(disputes,null,2)+';\n');
fs.writeFileSync(path.join(root,'sap_explanations.js'),'/* Source-backed individual option analysis; not an official AWS exam answer key. */\nconst QUESTION_EXPLANATIONS = '+JSON.stringify(context.explanations,null,2)+';\n');
const overrides=JSON.parse(read('quick_overrides.json'));
for(const r of rows){if(r.originalAnswers.slice().sort().join()!==r.answers.slice().sort().join()||r.optionLabelRepair){if(overrides[r.id]){delete overrides[r.id].answerCues;delete overrides[r.id].avoid;}}}
fs.writeFileSync(path.join(root,'quick_overrides.json'),JSON.stringify(overrides,null,2)+'\n');
fs.writeFileSync(path.join(root,'docs/answer-audit/summary.json'),JSON.stringify({revision:'2026-11-16',reviewed:rows.length,changed,ambiguous,changedIds:rows.filter(r=>r.originalAnswers.slice().sort().join()!==r.answers.slice().sort().join()).map(r=>r.id),ambiguousIds:rows.filter(r=>r.status==='ambiguous').map(r=>r.id)},null,2)+'\n');
console.log({reviewed:rows.length,changed,ambiguous});
