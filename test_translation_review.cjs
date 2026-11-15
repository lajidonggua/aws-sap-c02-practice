const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),crypto=require('node:crypto');
const read=n=>fs.readFileSync(n,'utf8'),c=vm.createContext({});
vm.runInContext(read('sap_questions.js')+';this.questions=CHOICE_QUESTIONS;this.disputed=DISPUTED_QUESTIONS;',c);
const rows=fs.readdirSync('docs/translation-review').filter(n=>/^q\d+-\d+\.json$/.test(n)).flatMap(n=>JSON.parse(read('docs/translation-review/'+n))).sort((a,b)=>a.id-b.id);
assert.equal(rows.length,529);
rows.forEach((r,i)=>{assert.equal(r.id,i+1);assert.equal(r.reviewed,true);assert(r.notes?.trim());});
let options=0;
for(const q of c.questions){
 assert.equal(q.translation_review?.reviewed,true,'Q'+q.id+' must be explicitly reviewed');
 for(const [t,en] of [[q.question_zh,q.question],...q.options.map(o=>[o.text_zh,o.text])]){
  const literal=t===en&&(/^[a-z0-9-]+:[A-Za-z0-9*]+$/.test(t)||/^(?:Amazon|AWS) [A-Za-z0-9 -]+$/.test(t));
  assert(t&&(/[\u3400-\u9fff]/.test(t)||literal),'Missing Chinese in Q'+q.id);
  assert(!/[\ufffd\u200b\ufeff⟦⟧⧟⧦]/.test(t),'Broken translation markers in Q'+q.id);
 }
 options+=q.options.length;
}
assert.equal(options,2273);
// The reference English, option identities and already audited scoring must survive translation changes exactly.
const source=c.questions.map(q=>({id:q.id,question:q.question,options:q.options.map(o=>({letter:o.letter,text:o.text})),correct_answers:q.correct_answers,answer_audit:q.answer_audit}));
const baseline=JSON.parse(read('docs/translation-review/source-integrity.json'));
const hash=v=>crypto.createHash('sha256').update(JSON.stringify(v)).digest('hex');
assert.equal(hash(source),baseline.sourceFieldsHash,'Translation work must not change English or grading');
assert.equal(hash(c.disputed),baseline.disputedHash);
// Policy code is content, not translatable prose: preserve exact keys, actions, resources and true/false.
for(const letter of ['C','D']){
 const o=c.questions.find(q=>q.id===364).options.find(o=>o.letter===letter);
 assert.deepEqual(JSON.parse(o.text_zh.slice(o.text_zh.indexOf('{'))),JSON.parse(o.text.slice(o.text.indexOf('{'))));
}
const q439=c.questions.find(q=>q.id===439).question_zh;
assert(q439.includes('同一 AWS 区域')&&q439.includes('新 AWS 账户'),'Cross-account migration must remain in one Region');
assert(c.questions.find(q=>q.id===153).options.find(o=>o.letter==='E').text_zh.includes('英文原题未提供具体值'),'Do not invent a missing path pattern');
console.log('529 bilingual reviews and 2273 Chinese options verified; English, option identities, audited answers and policy code preserved.');
