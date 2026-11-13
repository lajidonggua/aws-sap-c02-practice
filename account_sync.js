(function(root){
 'use strict';
 const S=LearningProgress,config=root.SAP_ACCOUNT_CONFIG||{},AUTH_KEY='sap-learning-session-v1';
 let session=null,timer,inFlight=false,again=false,epoch=0,status=config.apiBase?'checking':'local',message='',lastSync=null;
 try{const saved=JSON.parse(localStorage.getItem(AUTH_KEY));if(saved&&typeof saved.token==='string'&&saved.user&&typeof saved.user.id==='string')session=saved;}catch{}
 const base=String(config.apiBase||'').replace(/\/$/,'');
 const listeners=new Set();
 function state(){return {configured:!!base,user:session?.user||null,status,message,lastSync,storageOK:S.status().storageOK};}
 function notify(){for(const fn of listeners)fn(state());if(typeof document!=='undefined')document.dispatchEvent(new CustomEvent('sap-account-change',{detail:state()}));}
 function storeSession(value){session=value;epoch++;try{if(value)localStorage.setItem(AUTH_KEY,JSON.stringify(value));else localStorage.removeItem(AUTH_KEY);}catch{}S.setOwner(value?value.user.id:'guest');notify();}
 async function request(path,body,token=session?.token){
  const headers={'Content-Type':'application/json'};if(token)headers.Authorization='Bearer '+token;
  const response=await fetch(base+path,{method:body===undefined?'GET':'POST',headers,body:body===undefined?undefined:JSON.stringify(body),credentials:'omit',cache:'no-store',signal:AbortSignal.timeout(20000)});
  let data;try{data=await response.json();}catch{throw new Error('暂时无法连接账号服务，请稍后重试。');}
  if(!response.ok){const translations={USER_ALREADY_EXISTS:'这个邮箱已注册，请直接登录。',USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL:'这个邮箱已注册，请直接登录。',INVALID_EMAIL_OR_PASSWORD:'邮箱或密码不正确。',INVALID_PASSWORD:'当前密码不正确。',PASSWORD_TOO_SHORT:'密码至少需要 10 位。',INVALID_EMAIL:'邮箱格式不正确。'};const error=new Error(translations[data.code]||(response.status===401?'登录已失效，请重新登录。':response.status===429?'操作过于频繁，请稍后再试。':data.message||data.error||'操作未完成，请稍后重试。'));error.status=response.status;throw error;}
  return {data,token:response.headers.get('set-auth-token')};
 }
 async function sync(){
  clearTimeout(timer);if(!base||!session)return;if(inFlight){again=true;return;}
  inFlight=true;const currentEpoch=epoch,owner=session.user.id;status='syncing';notify();
  try{const {data}=await request('/api/progress',{schema:2,cells:S.snapshot()});if(currentEpoch!==epoch||S.owner()!==owner)return;S.merge(data.cells,'cloud');lastSync=new Date();status='synced';message='学习进度已同步。';}
  catch(error){if(currentEpoch!==epoch)return;status=error.status===401?'expired':'offline';message=error.status===401?'登录已失效，本机记录仍保留，重新登录后继续同步。':'暂时无法同步，记录已保存在本机，联网后会重试。';}
  finally{inFlight=false;if(currentEpoch===epoch)notify();if(again){again=false;timer=setTimeout(sync,800);}}
 }
 async function login(email,password,register=false){
  if(!base)throw new Error('云同步尚未开通。');status='signing-in';message='';notify();
  try{const {data,token}=await request(register?'/api/auth/sign-up/email':'/api/auth/sign-in/email',register?{email,password,name:email.split('@')[0]}:{email,password,rememberMe:true},null);
   const authToken=token||data.token;if(!authToken||!data.user)throw new Error('未能建立登录状态，请重试。');
   storeSession({token:authToken,user:{id:data.user.id,email:data.user.email,name:data.user.name}});await sync();return state();
  }catch(error){status='signed-out';message=error.message;notify();throw error;}
 }
 async function logout(){
  if(session&&base){try{await sync();await request('/api/auth/sign-out',{});}catch{}}
  storeSession(null);status='signed-out';message='已退出。账号记录留在该账号中，本机访客记录单独保留。';notify();
 }
 async function init(){
  if(!base){if(!session)S.setOwner('guest');status='local';notify();return;}
  if(!session){S.setOwner('guest');status='signed-out';notify();return;}
  S.setOwner(session.user.id);const current=epoch;
  try{const {data}=await request('/api/auth/get-session');if(current!==epoch)return;if(!data?.user){status='expired';message='请重新登录以继续同步。';notify();return;}await sync();}
  catch(error){if(current!==epoch)return;status=error.status===401?'expired':'offline';message='当前使用本机记录，连接恢复后会继续同步。';notify();}
 }
 S.subscribe(event=>{if(event.source==='account-tab'){location.reload();return;}if(['local','import'].includes(event.source)&&session){clearTimeout(timer);timer=setTimeout(sync,1000);}});
 root.LearningAccount={state,login,logout,sync,subscribe:fn=>{listeners.add(fn);return()=>listeners.delete(fn);},changePassword:async(currentPassword,newPassword)=>request('/api/auth/change-password',{currentPassword,newPassword,revokeOtherSessions:true})};
 if(root.addEventListener){root.addEventListener('online',sync);root.addEventListener('focus',()=>{if(session)sync();});root.addEventListener('storage',event=>{if(event.key===AUTH_KEY&&event.newValue!==event.oldValue)location.reload();});}
 if(typeof document!=='undefined'){
  document.addEventListener('visibilitychange',()=>{if(!document.hidden&&session)sync();});
  document.addEventListener('sap-account-change',()=>{for(const link of document.querySelectorAll('[data-account-link]'))link.textContent=session?'我的学习进度':'学习进度与登录';});
  S.subscribe(event=>{if(['cloud','tab','account-tab'].includes(event.source)&&!document.getElementById('accountPage')){
   let bar=document.getElementById('progressUpdate');if(!bar){bar=document.createElement('div');bar.id='progressUpdate';bar.className='progress-update';bar.setAttribute('role','status');bar.innerHTML='<span>学习进度有更新。</span><button type="button">载入最新进度</button>';bar.querySelector('button').onclick=()=>location.reload();document.body.append(bar);}
  }});
 }
 init();
})(globalThis);
