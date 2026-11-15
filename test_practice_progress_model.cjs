const assert=require('node:assert/strict');
const M=require('./practice_progress_model.js');
const Progress=require('./progress_model.js');

const questions=[{id:24},{id:40},{id:61},{id:69}];
const answers={24:{correct:true,selected:['A']},40:{correct:false,selected:['B']}};
assert.equal(M.answered(answers,24),true);
assert.equal(M.answered(answers,40),true,'a wrong submission is still an answered question');
assert.equal(M.answered(answers,61),false,'a skip or reveal without a submission remains unanswered');
assert.equal(M.answered({24:{correct:'false'}},24),false);
assert.equal(M.answered(Object.create({24:{correct:true}}),24),false);
assert.equal(M.answered({24:Object.create({correct:true})},24),false);
assert.equal(M.answered(null,24),false);
assert.deepEqual(M.summarize(questions,answers),{total:4,answered:2,remaining:2,correct:1,wrong:1});
assert.deepEqual(M.summarize([24,24,40,0,530,null,NaN,true,'1e2'],answers),{total:2,answered:2,remaining:0,correct:1,wrong:1},'duplicate/invalid IDs never inflate completion');
assert.deepEqual(M.unanswered(questions,answers),[questions[2],questions[3]]);
assert.equal(M.unanswered(questions,answers)[0],questions[2],'question objects retain their identity');
assert.equal(M.nextUnanswered(questions,answers,61),61,'resume an unanswered current question');
assert.equal(M.nextUnanswered(questions,answers,61,false),69,'advance past the current question');
assert.equal(M.nextUnanswered(questions,answers,69,false),61,'wrap to unfinished earlier questions once');
assert.equal(M.nextUnanswered(questions,answers,999,false),61,'unknown anchors start from the first unanswered');
assert.equal(M.nextUnanswered([],answers,24),null);
assert.equal(M.nextUnanswered([24,40],answers,24),null,'completed sets end instead of repeating');

// Every unique submission reduces remaining work exactly once, including wrong answers.
const allAnswers={};
for(const id of M.BANK_IDS){
 allAnswers[id]={correct:id%2===0,selected:['A']};
 assert.equal(M.summarize(M.BANK_IDS,allAnswers).remaining,529-id);
}
assert.equal(M.nextUnanswered(M.BANK_IDS,allAnswers,529,false),null);
allAnswers[24]={correct:false,selected:['B']};
assert.equal(M.summarize(M.BANK_IDS,allAnswers).answered,529,'retries do not count twice');
delete allAnswers[7];delete allAnswers[500];
assert.equal(M.nextUnanswered(M.BANK_IDS,allAnswers,501),7);
assert.equal(M.nextUnanswered(M.BANK_IDS,allAnswers,7,false),500);

// These navigation fields fit the deployed cloud schema and remain account-owned records.
const scopes={[M.KEYS.order]:61,[M.KEYS.random]:69,[M.KEYS.mode]:2};
const fields=Progress.encode(Progress.KEYS.scopes,scopes);
assert.deepEqual(Progress.decode(Progress.KEYS.scopes,fields),scopes);
const cells=Object.fromEntries(Object.entries(fields).map(([key,value])=>[Progress.KEYS.scopes+'|'+key,{value,stamp:'0000000000000001-test-device'}]));
assert.deepEqual(Progress.validate(cells),cells);
assert.deepEqual(Progress.forSchema(cells,1),cells,'old supported schema accepts navigation keys');

// Legacy last results have no trustworthy attempt order; preserve coverage without inventing history.
assert.deepEqual(M.recent(answers),{total:0,correct:0,rate:null,attempts:[]});
const attempted={24:{correct:true,selected:['A']}};
for(let i=0;i<12;i++)attempted[24]=M.recordAnswer(attempted,24,i%2===0,['A'],1000,'repeat-'+String(i).padStart(2,'0'));
assert.equal(M.summarize(M.BANK_IDS,attempted).answered,1,'twelve attempts of one question still cover only one question');
assert.equal(attempted[24].attempts.length,10,'per-question history stays bounded');
assert.deepEqual(attempted[24].attempts.map(a=>a.at),[1011,1010,1009,1008,1007,1006,1005,1004,1003,1002],'rapid/repeated timestamps become monotonic');
assert.equal(M.recent(attempted).total,10);assert.equal(M.recent(attempted).correct,5);assert.equal(M.recent(attempted).rate,50);
attempted[40]=M.recordAnswer(attempted,40,true,['B'],900,'another-question');
assert.equal(attempted[40].attempts[0].at,1012,'ordering is monotonic across different questions too');
assert.equal(M.recent(attempted).attempts[0].id,'another-question');
assert.equal(M.recent(attempted,3).rate,67,'short samples use the actual denominator and round percentage');
assert.equal(M.recent(attempted,0).rate,null);
const duplicate=M.recordAnswer({},61,false,['C'],2000,'same-attempt');
const malformed={id:'bad-time',at:Infinity,correct:true};
const mixed={61:duplicate,69:{correct:false,selected:['C'],attempts:[duplicate.attempts[0],malformed,{id:'bad-result',at:2001,correct:'yes'},{id:'',at:2002,correct:true}]}};
assert.equal(M.recent(mixed).total,1,'malformed entries are ignored and duplicate IDs count once globally');
assert.equal(M.recent(mixed).rate,0);
const tied={1:{correct:true,selected:['A'],attempts:[{id:'b',at:3000,correct:true},{id:'a',at:3000,correct:false}]}};
assert.deepEqual(M.recent(tied).attempts.map(a=>a.id),['a','b'],'equal timestamps have deterministic ID order');
const selection=['A'];const original={1:{correct:false,selected:['B'],attempts:[{id:'old',at:100,correct:false}]}};
const snapshot=JSON.stringify(original),newAnswer=M.recordAnswer(original,1,true,selection,200,'new');selection.push('B');
assert.equal(JSON.stringify(original),snapshot,'recording returns a new answer without mutating prior state');
assert.deepEqual(newAnswer.selected,['A'],'selected letters are copied');
assert.equal(typeof M.recordAnswer({},1,true,['A']).attempts[0].id,'string');
const answerFields=Progress.encode(Progress.KEYS.practice,{answers:attempted,stars:[24],last:40});
const answerCells=Object.fromEntries(Object.entries(answerFields).map(([key,value])=>[Progress.KEYS.practice+'|'+key,{value,stamp:'0000000000000001-test-device'}]));
assert.deepEqual(Progress.validate(answerCells),answerCells,'deployed answer validation accepts bounded attempt metadata');
const restored=Progress.decode(Progress.KEYS.practice,answerFields);
assert.deepEqual(M.recent(restored.answers),M.recent(attempted),'existing serialization preserves attempt history');
assert.deepEqual(restored.stars,[24]);assert.equal(restored.last,40);
console.log('Practice progress passed: unique coverage, bounded navigation, recent10 attempts including repeats, monotonic timestamps, legacy history, dedup/validation, and deployed-schema serialization.');

// Revised answer keys derive the latest result from selections, never mutate saved history.
const calibrated=[
 {id:1,correct_answers:['B'],answer_audit:{status:'corrected',changed:true,revision:'2026-11-16'}},
 {id:2,correct_answers:['A'],answer_audit:{status:'confirmed',changed:false,revision:'2026-11-16'}},
 {id:3,correct_answers:['C'],answer_audit:{status:'ambiguous',changed:true,revision:'2026-11-16'}}
];
const oldResults={1:{correct:true,selected:['A'],attempts:[{id:'old-key-attempt',at:5000,correct:true}]},2:{correct:false,selected:['A'],attempts:[{id:'unchanged-attempt',at:5001,correct:true}]},3:{correct:false,selected:['A'],attempts:[{id:'ambiguous-attempt',at:5002,correct:false}]}};
const oldSnapshot=JSON.stringify(oldResults);
assert.equal(M.result(calibrated[0],oldResults[1]),false,'old answer now wrong is derived from selected letters');
assert.equal(M.result(calibrated[1],oldResults[2]),true,'old false flag cannot override correct selection');
assert.equal(M.result(calibrated[2],oldResults[3]),null,'ambiguous items have no scored result');
assert.deepEqual(M.summarize(calibrated,oldResults),{total:3,answered:3,remaining:0,correct:1,wrong:1},'ambiguous submissions cover the question but are neither right nor wrong');
assert.equal(M.recent(oldResults,10,calibrated).total,1,'old attempts of changed keys and all ambiguous attempts are omitted');
assert.equal(M.recent(oldResults,10,calibrated).rate,100);
assert.equal(JSON.stringify(oldResults),oldSnapshot,'calculating corrected views preserves original saved records');
const revised={...oldResults,1:M.recordAnswer(oldResults,calibrated[0],true,['B'],6000,'new-key-attempt')};
assert.equal(revised[1].attempts.length,1,'new submission prunes unrescorable pre-revision attempts only for that question');
assert.ok(revised[1].attempts[0].id.startsWith('audit:2026-11-16:'));
assert.equal(M.recent(revised,10,calibrated).total,2,'post-revision submissions count normally');
revised[1]=M.recordAnswer(revised,calibrated[0],false,['A'],6001,'new-wrong');
assert.equal(M.recent(revised,10,calibrated).total,3,'multiple post-revision submissions remain in recent history');
assert.equal(M.recent(revised,10,calibrated).rate,67);
revised[3]=M.recordAnswer(revised,calibrated[2],true,['C'],6002,'neutral-new');
assert.equal(M.recent(revised,10,calibrated).total,3,'even matching the reference on an ambiguous item is not scored');
const revisedFields=Progress.encode(Progress.KEYS.practice,{answers:revised,stars:[],last:3});
const revisedCells=Object.fromEntries(Object.entries(revisedFields).map(([key,value])=>[Progress.KEYS.practice+'|'+key,{value,stamp:'0000000000000001-test-device'}]));
assert.deepEqual(Progress.validate(revisedCells),revisedCells,'revision IDs and neutral-compatible boolean storage stay valid in deployed schema');
console.log('Calibration scoring passed: selection-derived current results, neutral ambiguity, legacy attempts excluded, fresh attempts counted, original history preserved.');
