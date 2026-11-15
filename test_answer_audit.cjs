const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const c=vm.createContext({});vm.runInContext(['sap_questions.js','sap_explanations.js','quick_answer_cards.js'].map(f=>fs.readFileSync(f,'utf8')).join('\n')+';this.q=CHOICE_QUESTIONS;this.e=QUESTION_EXPLANATIONS;this.d=DISPUTED_QUESTIONS;this.cards=QUICK_ANSWER_CARDS;',c);
assert.equal(c.q.length,529);
const ids=new Set();
for(const q of c.q){
 assert(!ids.has(q.id));ids.add(q.id);
 const a=q.answer_audit;assert(a,`Q${q.id} missing audit`);
 assert(a.summary.length>15);assert(a.sources.length>0);
 assert.equal(new Set(q.options.map(o=>o.letter)).size,q.options.length,`Q${q.id} duplicate options`);
 assert.deepEqual(Array.from(q.correct_answers),Array.from(a.answers));
 assert.equal(q.correct_answers.length,q.multi_count);
 for(const o of q.options){assert(a.optionReasons[o.letter]?.length>4,`Q${q.id}${o.letter} missing reasoning`);assert.equal(c.e[q.id].options[o.letter],a.optionReasons[o.letter]);}
 for(const s of a.sources){assert(/^https:\/\//.test(s.url));assert(s.title&&s.supports);}
 assert.equal(Boolean(c.d[q.id]),a.status==='ambiguous');
 assert.equal(c.cards[q.id].disputed,a.status==='ambiguous',`Q${q.id} stale dispute flag`);
 assert.equal(c.cards[q.id].legacyMismatch,false,`Q${q.id} stale explanation`);
 assert(!c.e[q.id].diagram_after,`Q${q.id} unreviewed old diagram`);
}
for(const [id,key]of Object.entries({33:'A',55:'ADF',137:'ACF',152:'D',179:'A',196:'CE',200:'BDF',440:'AC',442:'DE',444:'BE',446:'B',450:'D',453:'A',471:'ACE',492:'AB',502:'CD',503:'CD',509:'ADE',514:'AE',524:'C',526:'B',529:'AE'}))assert.equal(c.q.find(q=>q.id===Number(id)).correct_answers.join(''),key,`Regression Q${id}`);
console.log(`529 audit records and rendered data agree; ${Object.keys(c.d).length} ambiguous items clearly marked.`);
