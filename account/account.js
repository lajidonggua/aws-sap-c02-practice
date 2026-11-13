(function(){
 'use strict';
 const S=LearningProgress,K=ProgressModel.KEYS,A=LearningAccount,$=id=>document.getElementById(id);
 let register=false,pendingImport=null,busy=false;
 function addResume(label,href){const a=document.createElement('a');a.textContent=label;a.href=href;$('resumeLinks').append(a);}
 function renderProgress(){
  const practice=S.get(K.practice,{answers:{},stars:[],last:1}),study=S.get(K.study,{read:[],last:'foundations'}),review=S.get(K.review,{}),seen=S.get(K.reviewed,{}),path=S.get(K.path,{reviews:{}}),reviews=Object.values(path.reviews);
  $('progressStats').replaceChildren();for(const [value,label]of [[reviews.length+' / 24','短课已完成一轮'],[reviews.filter(item=>item.dueAt<=Date.now()).length,'短课待巩固'],[Object.keys(practice.answers).length+' / 529','已练题目'],[Object.values(practice.answers).filter(answer=>!answer.correct).length,'错题'],[study.read.length+' / 13','入门章节已读'],[Object.values(review).filter(Boolean).length+' / 11','详细手册章节已读']]){const div=document.createElement('div');div.className='account-stat';const strong=document.createElement('strong');strong.textContent=value;const span=document.createElement('span');span.textContent=label;div.append(strong,span);$('progressStats').append(div);}
  $('resumeLinks').replaceChildren();addResume('继续短时学习','../path/index.html'+(path.draft?.id||path.last?'#'+encodeURIComponent(path.draft?.id||path.last):''));addResume('继续刷题 · 第 '+practice.last+' 题','../index.html?q='+practice.last);addResume('继续入门知识手册','../learn/index.html#'+study.last);addResume('继续详细复习手册 · 已看 '+Object.values(seen).filter(Boolean).length+' / 18 道解析','../review/index.html');
 }
 function renderAccount(){
  const state=A.state(),signedIn=!!state.user&&state.status!=='expired';
  $('profileTitle').textContent=state.user?'账号学习记录':'本机访客记录';$('profileDescription').textContent=state.user?'当前记录属于 '+state.user.email+'。':'未登录也能学习，进度会保存在当前浏览器。';
  $('cloudUnavailable').hidden=state.configured;$('authForms').hidden=!state.configured||signedIn;$('signedIn').hidden=!signedIn;
  const labels={local:'已开启本机保存',checking:'正在检查账号…','signed-out':'未登录 · 本机记录仍会保存','signing-in':'正在登录…',syncing:'正在同步学习进度…',synced:'云端已同步',offline:'暂时离线 · 记录保存在本机',expired:'请重新登录以继续同步'};
  $('syncStatus').textContent=labels[state.status]||'本机记录已保存';if(state.lastSync&&state.status==='synced')$('syncStatus').textContent+=' · '+state.lastSync.toLocaleTimeString('zh-CN',{hour:'2-digit',minute:'2-digit'});
  if(!state.storageOK)$('syncStatus').textContent+=' · 浏览器暂时不允许持久保存，请及时下载备份';$('syncStatus').classList.toggle('error',['offline','expired'].includes(state.status)||!state.storageOK);
  if(signedIn){$('signedInEmail').textContent='已登录：'+state.user.email;const guest=S.guestCells(),current=S.snapshot();$('guestImport').hidden=!Object.keys(guest).some(key=>!current[key]);}
  if(state.message)$('accountMessage').textContent=state.message;renderProgress();
 }
 function setRegister(next){register=next;$('loginTab').classList.toggle('selected',!register);$('registerTab').classList.toggle('selected',register);$('loginTab').setAttribute('aria-pressed',String(!register));$('registerTab').setAttribute('aria-pressed',String(register));$('confirmPasswordGroup').hidden=!register;$('confirmPassword').required=register;$('password').autocomplete=register?'new-password':'current-password';$('loginSubmit').textContent=register?'注册并开始同步':'登录并同步';$('accountMessage').textContent='';}
 $('loginTab').onclick=()=>setRegister(false);$('registerTab').onclick=()=>setRegister(true);
 async function action(fn){if(busy)return;busy=true;for(const button of document.querySelectorAll('#loginForm button,#signedIn button'))button.disabled=true;try{await fn();}catch(error){$('accountMessage').textContent=error.message;}finally{busy=false;for(const button of document.querySelectorAll('#loginForm button,#signedIn button'))button.disabled=false;}}
 $('loginForm').onsubmit=event=>{event.preventDefault();if(register&&$('password').value!==$('confirmPassword').value){$('accountMessage').textContent='两次输入的密码不一致。';return;}action(async()=>{await A.login($('email').value.trim(),$('password').value,register);$('password').value='';$('confirmPassword').value='';renderAccount();});};
 $('syncNow').onclick=()=>action(()=>A.sync());$('logout').onclick=()=>action(()=>A.logout());
 $('mergeGuest').onclick=()=>action(async()=>{S.importGuest();await A.sync();$('accountMessage').textContent='访客记录已合入当前账号。';renderAccount();});
 $('passwordForm').onsubmit=event=>{event.preventDefault();action(async()=>{await A.changePassword($('oldPassword').value,$('newPassword').value);$('passwordForm').reset();$('accountMessage').textContent='密码已修改，其他设备需要重新登录。';});};
 $('exportProgress').onclick=()=>{const blob=new Blob([S.exportBackup()],{type:'application/json'}),url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download='sap-learning-progress-'+new Date().toISOString().slice(0,10)+'.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);$('backupMessage').textContent='备份已下载，包含当前学习记录，不含登录凭证。';};
 $('importProgress').onchange=async event=>{pendingImport=null;$('importPreview').hidden=true;try{const file=event.target.files[0];if(!file)return;if(file.size>1500000)throw new Error('备份文件过大。');const raw=await file.text(),data=JSON.parse(raw);if(data.format!=='sap-learning-progress'||![1,2].includes(data.version))throw new Error('请选择本站导出的学习进度备份。');const cells=ProgressModel.validate(data.cells);pendingImport=raw;$('importSummary').textContent='此备份包含 '+Object.keys(cells).length+' 条学习记录。合并会保留每项记录中较新的版本。';$('importPreview').hidden=false;$('backupMessage').textContent='';}catch(error){$('backupMessage').textContent=error.message;}};
 $('confirmImport').onclick=()=>{try{S.importBackup(pendingImport);pendingImport=null;$('importPreview').hidden=true;$('importProgress').value='';$('backupMessage').textContent='学习记录已合并。';renderProgress();}catch(error){$('backupMessage').textContent=error.message;}};
 $('cancelImport').onclick=()=>{pendingImport=null;$('importPreview').hidden=true;$('importProgress').value='';};
 A.subscribe(renderAccount);S.subscribe(renderProgress);renderAccount();
})();
