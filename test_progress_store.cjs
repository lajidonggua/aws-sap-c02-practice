const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm');
const M=require('./progress_model.js'),K=M.KEYS;
function context(storage=new Map()){
 const sandbox=vm.createContext({crypto:require('node:crypto').webcrypto,Date,Math,JSON,Set,Map,localStorage:{getItem:key=>storage.get(key)||null,setItem:(key,value)=>storage.set(key,String(value)),removeItem:key=>storage.delete(key)}});
 vm.runInContext(fs.readFileSync('progress_model.js','utf8')+'\n'+fs.readFileSync('progress_store.js','utf8'),sandbox);
 return {S:sandbox.LearningProgress,storage};
}
const storage=new Map([[K.practice,JSON.stringify({answers:{24:{correct:false,selected:['A']}},stars:[24],last:24})]]);
let {S}=context(storage);assert.equal(S.get(K.practice).last,24,'legacy records migrate');
S.put(K.study,{read:['foundations'],quiz:{foundations:1},last:'networking'});
assert.equal(context(storage).S.get(K.study).quiz.foundations,1,'quiz and reading survive restart');
const guest=S.exportBackup();S.setOwner('user-a');assert.equal(S.get(K.practice),null,'account starts separately');S.importGuest();assert.equal(S.get(K.practice).last,24);S.setOwner('user-b');assert.equal(S.get(K.practice),null,'accounts must not inherit other users');S.setOwner('user-a');assert.equal(S.get(K.practice).answers[24].correct,false);
const device2=context().S;device2.setOwner('user-a');device2.merge(S.snapshot());
const a=S.get(K.practice),b=device2.get(K.practice);
a.answers[40]={correct:true,selected:['B']};S.put(K.practice,a);
b.answers[61]={correct:false,selected:['C']};device2.put(K.practice,b);
S.merge(device2.snapshot());device2.merge(S.snapshot());
assert.deepEqual(Object.keys(S.get(K.practice).answers).sort(),['24','40','61']);
assert.deepEqual(JSON.parse(JSON.stringify(S.snapshot())),JSON.parse(JSON.stringify(device2.snapshot())),'devices converge');
// A page holding an earlier snapshot must not delete unseen cloud answers.
const stale=S.get(K.practice);const newer=device2.get(K.practice);newer.answers[69]={correct:true,selected:['A']};device2.put(K.practice,newer);S.merge(device2.snapshot());stale.stars.push(40);S.put(K.practice,stale);assert(S.get(K.practice).answers[69]);
const saved=S.get(K.practice);saved.stars=saved.stars.filter(id=>id!==24);S.put(K.practice,saved);device2.merge(S.snapshot());assert(!device2.get(K.practice).stars.includes(24),'removal is retained as a tombstone');
const exported=JSON.parse(S.exportBackup());assert.equal(exported.format,'sap-learning-progress');assert(!JSON.stringify(exported).includes('token'));assert(!JSON.stringify(exported).includes('password'));
assert.throws(()=>S.importBackup(JSON.stringify({format:'sap-learning-progress',version:1,cells:{'sap-quick-practice-v1|__proto__':{value:{},stamp:'0001700000000000-device123'}}})));
const destination=context().S;destination.importBackup(guest);assert.equal(destination.get(K.practice).last,24);
assert.throws(()=>S.importBackup('{"format":"other"}'));
// Recover the previous good snapshot when the main local record is corrupt.
S.put(K.practice,{...S.get(K.practice),last:40});S.put(K.practice,{...S.get(K.practice),last:61});storage.set('sap-learning-profile-v1:user-a','{broken');assert.equal(context(storage).S.get(K.practice).last,40);
// A browser that denies persistent storage can still keep this session in memory and export it.
const denied=vm.createContext({crypto:require('node:crypto').webcrypto,Date,Math,JSON,Set,Map,localStorage:{getItem(){throw Error('blocked');},setItem(){throw Error('blocked');}}});
vm.runInContext(fs.readFileSync('progress_model.js','utf8')+'\n'+fs.readFileSync('progress_store.js','utf8'),denied);assert.throws(()=>denied.LearningProgress.put(K.review,{overview:true}));assert.equal(denied.LearningProgress.get(K.review).overview,true);assert.equal(denied.LearningProgress.status().storageOK,false);
console.log('Progress migration, restart, per-account isolation, cross-device merge, deletion, stale pages, backups, validation and denied storage passed.');
