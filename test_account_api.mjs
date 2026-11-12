import assert from 'node:assert/strict';
import {randomBytes} from 'node:crypto';
const base=process.env.SAP_API_BASE||'http://127.0.0.1:8787';
const tag=Date.now().toString(36),password=randomBytes(20).toString('hex');
const origin=process.env.SAP_TEST_ORIGIN||'http://127.0.0.1:8000';
async function call(path,body,token,customOrigin=origin){const headers={'Content-Type':'application/json',Origin:customOrigin,'CF-Connecting-IP':'127.0.0.55'};if(token)headers.Authorization='Bearer '+token;const response=await fetch(base+path,{method:body===undefined?'GET':'POST',headers,body:body===undefined?undefined:JSON.stringify(body)});let data;try{data=await response.json();}catch{data={message:'invalid JSON'}};return{status:response.status,data,token:response.headers.get('set-auth-token'),headers:response.headers};}
async function register(suffix){const result=await call('/api/auth/sign-up/email',{email:'sap-qa-'+tag+'-'+suffix+'@example.invalid',password,name:'QA '+suffix});assert.equal(result.status,200,JSON.stringify(result.data));assert(result.token,'signed bearer token required');assert.equal(result.headers.get('access-control-allow-origin'),origin);return result;}
const a=await register('a'),b=await register('b');const token=a.token;
assert.equal((await call('/api/progress')).status,401);
assert.equal((await call('/api/progress',undefined,token+'tampered')).status,401);
assert.equal((await call('/api/progress',undefined,token,'https://invalid.example')).status,403);
assert((await call('/api/auth/get-session',undefined,token)).data.user.id===a.data.user.id);
const stamp=String(Date.now()).padStart(16,'0');
const cell=(qid,n,correct)=>({['sap-quick-practice-v1|answers/'+qid]:{stamp:stamp+'-'+n,value:{correct,selected:['A']}}});
await Promise.all([call('/api/progress',{cells:cell(24,'device-a',true)},token),call('/api/progress',{cells:cell(40,'device-b',false)},token)]);
await call('/api/progress',{cells:{'sapc02-progress-v1|overview':{stamp:stamp+'-device-a',value:true}}},token);
const merged=(await call('/api/progress',undefined,token)).data.cells;assert(merged['sap-quick-practice-v1|answers/24']);assert(merged['sap-quick-practice-v1|answers/40']);assert.equal(merged['sapc02-progress-v1|overview'].value,true);
assert.deepEqual((await call('/api/progress',undefined,b.token)).data.cells,{},'second account must not see first account');
const malformed=await call('/api/progress',{cells:{'secret|token':{stamp:stamp+'-device-a',value:'leak'}}},token);assert.equal(malformed.status,400);
const old=cell(24,'device-a',false);old['sap-quick-practice-v1|answers/24'].stamp='0000000000000001-device-a';await call('/api/progress',{cells:old},token);assert((await call('/api/progress',undefined,token)).data.cells['sap-quick-practice-v1|answers/24'].value.correct);
assert.equal((await call('/api/auth/sign-out',{},token)).status,200);assert.equal((await call('/api/progress',undefined,token)).status,401);
const wrong=await call('/api/auth/sign-in/email',{email:a.data.user.email,password:'wrong-password-123'});assert.equal(wrong.status,401);
const login=await call('/api/auth/sign-in/email',{email:a.data.user.email,password,rememberMe:true});assert.equal(login.status,200,JSON.stringify(login.data));assert(login.token);assert.equal(Object.keys((await call('/api/progress',undefined,login.token)).data.cells).length,3);
console.log('Real local D1 API passed: registration, signed bearer login, revoked sessions, wrong passwords, per-user isolation, concurrent merge, stale writes, CORS and malformed input.');
