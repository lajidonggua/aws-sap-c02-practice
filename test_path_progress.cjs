const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm'),cp=require('node:child_process');
const M=require('./progress_model.js'),K=M.KEYS,PREFIX='sap-learning-profile-v1:';
const current=['progress_model.js','progress_store.js'].map(file=>fs.readFileSync(file,'utf8')).join('\n');
// Use the actually deployed pre-path client to exercise its strict reader, not a mock.
const old=['progress_model.js','progress_store.js'].map(file=>cp.execFileSync('git',['show','7578dee:'+file],{encoding:'utf8'})).join('\n');
function context(storage=new Map(),source=current){
 const listeners={};const sandbox=vm.createContext({crypto:require('node:crypto').webcrypto,Date,Math,JSON,Set,Map,localStorage:{getItem:key=>storage.get(key)||null,setItem:(key,value)=>storage.set(key,String(value)),removeItem:key=>storage.delete(key)},addEventListener:(type,fn)=>{listeners[type]=fn;}});
 vm.runInContext(source,sandbox);return {S:sandbox.LearningProgress,M:sandbox.ProgressModel,storage,event:detail=>listeners.storage(detail)};
}
const now=Date.now(),review={reviewedAt:now,dueAt:now+86400000,rating:'clear',reviews:1,streak:1};
const draft={id:'architecture',folded:true,answer:2,openedAt:now,minutes:10};
const state={reviews:{architecture:review},last:'architecture',minutes:10,draft};
const storage=new Map(),a=context(storage);
a.S.put(K.practice,{answers:{24:{correct:true,selected:['B']}},stars:[24],last:24});
a.S.put(K.path,state);
assert.deepEqual(JSON.parse(a.S.getItem(K.path)),state);
assert(!Object.keys(JSON.parse(storage.get(PREFIX+'guest')).cells).some(cell=>cell.startsWith(K.path+'|')),'legacy canonical excludes unsupported fields');
assert(Object.keys(JSON.parse(storage.get(PREFIX+'guest:path')).cells).every(cell=>cell.startsWith(K.path+'|')),'sidecar contains only the new key');
const legacy=context(storage,old);assert.equal(legacy.S.get(K.practice).last,24,'old client reads its original profile');
assert.equal(legacy.S.status().cells,3,'old client sees only answer, star and position');
legacy.S.put(K.practice,{...legacy.S.get(K.practice),last:40});
const afterOld=context(storage);assert.equal(afterOld.S.get(K.practice).last,40);assert.deepEqual(JSON.parse(afterOld.S.getItem(K.path)),state,'old saves preserve path sidecar');
// Independent writes in two tabs survive even if the storage events have not arrived.
const b=context(storage),stale=a.S.get(K.path),other=b.S.get(K.path);
other.reviews['iam-role']={...review,rating:'fuzzy',streak:0};b.S.put(K.path,other);
stale.reviews['network-boundary']={...review,rating:'again',streak:0};a.S.put(K.path,stale);
assert.deepEqual(Object.keys(context(storage).S.get(K.path).reviews).sort(),['architecture','iam-role','network-boundary']);
b.event({key:PREFIX+'guest:path',newValue:storage.get(PREFIX+'guest:path')});assert(b.S.get(K.path).reviews['network-boundary'],'sidecar storage event merges');
// Unseen cloud fields survive a save from a page holding an older decoded snapshot.
const c=context(),d=context();c.S.put(K.path,state);d.S.merge(c.S.snapshot());const oldPage=c.S.get(K.path),remote=d.S.get(K.path);
remote.reviews['traffic-entry']=review;d.S.put(K.path,remote);c.S.merge(d.S.snapshot());oldPage.minutes=15;c.S.put(K.path,oldPage);assert(c.S.get(K.path).reviews['traffic-entry']);
const changed=c.S.get(K.path);changed.draft=null;c.S.put(K.path,changed);d.S.merge(c.S.snapshot());assert.equal(d.S.get(K.path).draft,undefined,'draft removal syncs as a tombstone');
assert.equal(d.S.snapshot()[K.path+'|draft'].value,null);
const backup=c.S.exportBackup();assert.equal(JSON.parse(backup).version,2);assert.throws(()=>legacy.S.importBackup(backup),'old importer rejects version 2 explicitly');
const restored=context().S;restored.importBackup(backup);assert.equal(restored.get(K.path).minutes,15);assert(restored.get(K.path).reviews['traffic-entry']);
const v1=legacy.S.exportBackup();restored.importBackup(v1);assert.equal(restored.get(K.practice).last,40,'new importer still accepts old backups');
c.S.setOwner('user-a');assert.equal(c.S.get(K.path),null);c.S.importGuest();assert(c.S.get(K.path).reviews.architecture);c.S.setOwner('user-b');assert.equal(c.S.get(K.path),null);c.S.setOwner('user-a');assert(c.S.get(K.path).reviews.architecture);
// Recovery is independent: a damaged sidecar never invalidates the original profile.
const recover=context();recover.S.put(K.practice,{answers:{},stars:[],last:24});recover.S.put(K.path,state);recover.S.put(K.path,{...state,minutes:15});recover.storage.set(PREFIX+'guest:path','{broken');const recovered=context(recover.storage);assert.equal(recovered.S.get(K.practice).last,24);assert.equal(recovered.S.get(K.path).minutes,10);
const cell=value=>({[K.path+'|reviews/architecture']:{value,stamp:'0001700000000000-device123'}});
for(const value of [{...review,dueAt:now-1},{...review,reviews:0},{...review,streak:5},{...review,extra:true},{...review,rating:'mastered'}])assert.throws(()=>M.validate(cell(value)));
assert.throws(()=>M.encode(K.path,{draft:{...draft,answer:3}}));assert.throws(()=>M.encode(K.path,{minutes:30}));assert.throws(()=>M.validate({[K.path+'|reviews/__proto__']:{value:review,stamp:'0001700000000000-device123'}}));
assert.equal(Object.keys(M.forSchema(a.S.snapshot(),1)).some(key=>key.startsWith(K.path+'|')),false);assert(Object.keys(M.forSchema(a.S.snapshot(),2)).some(key=>key.startsWith(K.path+'|')));
console.log('Path persistence passed: actual old-client compatibility, sidecar recovery, delayed tab events, stale cloud pages, draft tombstones, per-user isolation, v1/v2 backups and strict field validation.');
