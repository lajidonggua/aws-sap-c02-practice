const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const flush=()=>new Promise(resolve=>setImmediate(resolve));
function harness(){
 const storage=new Map([['sap-learning-session-v1',JSON.stringify({token:'token-a',user:{id:'user-a',email:'a@example.invalid'}})]]),requests=[],timers=new Map();let timerId=0;
 const sandbox=vm.createContext({crypto:require('node:crypto').webcrypto,Date,Math,JSON,Set,Map,Promise,AbortSignal,SAP_ACCOUNT_CONFIG:{apiBase:'https://account.invalid'},localStorage:{getItem:key=>storage.get(key)||null,setItem:(key,value)=>storage.set(key,String(value)),removeItem:key=>storage.delete(key)},setTimeout:fn=>{timers.set(++timerId,fn);return timerId;},clearTimeout:id=>timers.delete(id),fetch:(url,options)=>new Promise((resolve,reject)=>requests.push({url,options,body:options.body?JSON.parse(options.body):undefined,resolve,reject}))});
 for(const file of ['progress_model.js','progress_store.js','account_sync.js'])vm.runInContext(fs.readFileSync(file,'utf8'),sandbox);
 function take(path){const index=requests.findIndex(item=>item.url.endsWith(path));assert(index>=0,'expected request '+path);return requests.splice(index,1)[0];}
 function respond(request,data,status=200,token=null){request.resolve({ok:status>=200&&status<300,status,json:async()=>data,headers:{get:name=>name==='set-auth-token'?token:null}});}
 return{S:sandbox.LearningProgress,A:sandbox.LearningAccount,K:sandbox.ProgressModel.KEYS,requests,timers,take,respond};
}
(async()=>{
 const h=harness(),{S,A,K}=h;
 h.respond(h.take('/api/auth/get-session'),{user:{id:'user-a'}});await flush();h.respond(h.take('/api/progress'),{cells:{}});await flush();assert.equal(A.state().status,'synced');
 const now=Date.now(),draft={id:'architecture',folded:true,answer:1,openedAt:now,minutes:10};
 S.put(K.path,{reviews:{},last:'architecture',minutes:10,draft});
 const first=A.sync(),before=h.take('/api/progress');assert.equal(before.body.schema,2);assert.equal(before.body.cells[K.path+'|draft'].value.id,'architecture');
 S.put(K.path,{...S.get(K.path),draft:null});const second=A.sync();assert.strictEqual(first,second,'overlapping callers share the draining promise');let finished=false;second.then(()=>{finished=true;});await flush();assert.equal(finished,false,'await cannot finish while the earlier request is still pending');
 h.respond(before,{cells:before.body.cells});await flush();const after=h.take('/api/progress');assert.equal(after.body.cells[K.path+'|draft'].value,null,'next request includes the latest local tombstone');assert.equal(finished,false,'await also covers the queued request');
 h.respond(after,{cells:after.body.cells});await second;assert.equal(finished,true);assert.equal(A.state().status,'synced');assert.equal(S.get(K.path).draft,undefined);assert.equal(h.requests.length,0);assert.equal(h.timers.size,0);
 // Local writes during flight join the same drain even without another explicit sync call.
 const third=A.sync(),old=h.take('/api/progress');S.put(K.path,{...S.get(K.path),minutes:15});h.respond(old,{cells:old.body.cells});await flush();const latest=h.take('/api/progress');assert.equal(latest.body.cells[K.path+'|minutes'].value,15);h.respond(latest,{cells:latest.body.cells});await third;assert.equal(h.timers.size,0);
 // A failed drain stops; the next online/manual trigger retries the preserved snapshot.
 const failed=A.sync(),unavailable=h.take('/api/progress');S.put(K.path,{...S.get(K.path),minutes:5});assert.strictEqual(A.sync(),failed);unavailable.reject(new Error('offline'));await failed;await flush();assert.equal(A.state().status,'offline');assert.equal(h.requests.length,0);assert.equal(h.timers.size,0,'failure must not spin on queued requests');assert.equal(S.get(K.path).minutes,5);
 const retry=A.sync(),retryRequest=h.take('/api/progress');assert.equal(retryRequest.body.cells[K.path+'|minutes'].value,5);h.respond(retryRequest,{cells:retryRequest.body.cells});await retry;assert.equal(A.state().status,'synced');
 // Changing accounts while a request is delayed never merges the old response into the new owner.
 const previous=A.sync(),previousRequest=h.take('/api/progress'),login=A.login('b@example.invalid','password-for-test');
 h.respond(h.take('/api/auth/sign-in/email'),{user:{id:'user-b',email:'b@example.invalid',name:'b'}},200,'token-b');await flush();assert.equal(S.owner(),'user-b');
 h.respond(previousRequest,{cells:previousRequest.body.cells});await flush();const newOwner=h.take('/api/progress');assert.equal(newOwner.options.headers.Authorization,'Bearer token-b');assert.deepEqual(newOwner.body.cells,{});h.respond(newOwner,{cells:{}});await login;await previous;assert.equal(S.get(K.path),null);assert.equal(A.state().user.id,'user-b');assert.equal(A.state().status,'synced');
 console.log('Account sync drain passed: shared await, latest in-flight edits and draft deletion, bounded offline retry, and account changes during delayed requests.');
})().catch(error=>{console.error(error);process.exitCode=1;});
