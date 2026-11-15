const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const c=vm.createContext({URL});vm.runInContext(fs.readFileSync('sap_questions.js','utf8')+'\n'+fs.readFileSync('learning_review.js','utf8')+';this.questions=CHOICE_QUESTIONS;this.render=renderOriginalOption;',c);
let options=0;for(const q of c.questions)for(const o of q.options){const html=c.render(o);assert(html.includes('data-original-letter="'+o.letter+'"'));assert(html.includes('lang="en"'));assert(html.includes('查看 '+o.letter+' 的英文原选项'));assert(!html.includes('onclick='));options++;}
const escaped=c.render({letter:'A',text:'<script>danger()</script> & "test"'});assert(!escaped.includes('<script>'));assert(escaped.includes('&lt;script&gt;'));
console.log(options+' English option disclosures rendered with safe, independent controls.');
