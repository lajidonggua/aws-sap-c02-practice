(function(root){
 'use strict';
 const M=root.ProgressModel,ACTIVE='sap-learning-active-v1',PREFIX='sap-learning-profile-v1:';
 const listeners=new Set(),snapshots=new Map();let clock=0,storageOK=true;
 let device;try{device=crypto.randomUUID().replaceAll('-','');}catch{device=Math.random().toString(36).slice(2).padEnd(12,'0');}
 const validOwner=value=>typeof value==='string'&&/^[a-zA-Z0-9_-]{1,128}$/.test(value);
 function nativeGet(key){try{return localStorage.getItem(key);}catch{storageOK=false;return null;}}
 let owner=nativeGet(ACTIVE)||'guest';if(!validOwner(owner))owner='guest';
 function readProfile(who){
  for(const suffix of ['',':backup']){try{const raw=nativeGet(PREFIX+who+suffix);if(raw){const data=JSON.parse(raw);if(data.version!==1)continue;return {version:1,cells:M.validate(data.cells)};}}catch{}}
  return {version:1,cells:{}};
 }
 let profile=readProfile(owner);
 function tick(){for(const entry of Object.values(profile.cells))clock=Math.max(clock,Number(entry.stamp.slice(0,16)));clock=Math.max(Date.now(),clock+1);return String(clock).padStart(16,'0')+'-'+device;}
 function notify(source,keys=[]){const event={source,keys,owner,storageOK};for(const listener of listeners)listener(event);if(typeof document!=='undefined')document.dispatchEvent(new CustomEvent('sap-progress-change',{detail:event}));}
 function persist(){
  try{const key=PREFIX+owner,previous=localStorage.getItem(key);if(previous){try{const data=JSON.parse(previous);M.validate(data.cells);localStorage.setItem(key+':backup',previous);}catch{}}
   localStorage.setItem(key,JSON.stringify(profile));storageOK=true;
  }catch(error){storageOK=false;throw error;}
 }
 function fieldsFor(key){const result={};for(const [cell,entry]of Object.entries(profile.cells))if(cell.startsWith(key+'|'))result[cell.slice(key.length+1)]=entry.value;return result;}
 function migrate(key){
  if(owner!=='guest'||Object.keys(fieldsFor(key)).length)return;
  const raw=nativeGet(key);if(!raw)return;
  try{const fields=M.encode(key,JSON.parse(raw));for(const [field,value]of Object.entries(fields))profile.cells[key+'|'+field]={value,stamp:tick()};persist();}catch{}
 }
 function getItem(key){if(!M.known.has(key))return null;migrate(key);const fields=fieldsFor(key);snapshots.set(key,M.clone(fields));const value=M.decode(key,fields);return value===null?null:JSON.stringify(value);}
 function setItem(key,raw){
  const fields=M.encode(key,JSON.parse(raw)),previous=snapshots.get(key)||fieldsFor(key);let changed=false;
  for(const field of new Set([...Object.keys(previous),...Object.keys(fields)])){
   const value=Object.prototype.hasOwnProperty.call(fields,field)?fields[field]:null;
   if(JSON.stringify(previous[field]??null)!==JSON.stringify(value)){profile.cells[key+'|'+field]={value,stamp:tick()};changed=true;}
  }
  snapshots.set(key,M.clone(fields));if(!changed)return;
  try{persist();}finally{notify('local',[key]);}
 }
 function merge(cells,source='cloud'){
  const validated=M.validate(cells),next=M.merge(profile.cells,validated);if(JSON.stringify(next)===JSON.stringify(profile.cells))return false;
  profile.cells=next;try{persist();}finally{notify(source);}return true;
 }
 function setOwner(next){if(!validOwner(next))throw new Error('账号标识无效。');if(next===owner)return;owner=next;profile=readProfile(owner);snapshots.clear();try{localStorage.setItem(ACTIVE,owner);}catch{storageOK=false;}notify('account');}
 function exportBackup(){return JSON.stringify({format:'sap-learning-progress',version:1,exportedAt:new Date().toISOString(),cells:profile.cells},null,2);}
 function importBackup(raw){if(typeof raw!=='string'||raw.length>1500000)throw new Error('请选择本站导出的学习进度备份。');const data=JSON.parse(raw);if(data.format!=='sap-learning-progress'||data.version!==1)throw new Error('这不是本站的学习进度备份。');return merge(data.cells,'import');}
 function guestCells(){const guest=readProfile('guest');return M.clone(guest.cells);}
 function importGuest(){const cells=guestCells(),updates={};for(const [key,entry]of Object.entries(cells))if(!profile.cells[key])updates[key]={value:entry.value,stamp:tick()};return merge(updates,'import');}
 root.LearningProgress={getItem,setItem,get:(key,fallback=null)=>{const raw=getItem(key);return raw?JSON.parse(raw):fallback;},put:(key,value)=>setItem(key,JSON.stringify(value)),snapshot:()=>M.clone(profile.cells),merge,setOwner,owner:()=>owner,guestCells,importGuest,exportBackup,importBackup,subscribe:fn=>{listeners.add(fn);return()=>listeners.delete(fn);},status:()=>({owner,storageOK,cells:Object.keys(profile.cells).length})};
 if(root.addEventListener)root.addEventListener('storage',event=>{if(event.key===PREFIX+owner&&event.newValue){try{const incoming=JSON.parse(event.newValue);merge(incoming.cells,'tab');}catch{}}else if(event.key===ACTIVE){notify('account-tab');}});
})(globalThis);
