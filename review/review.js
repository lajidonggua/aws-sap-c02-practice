(function(){
 'use strict';
 const S=LearningProgress,K=ProgressModel.KEYS;
 const chapters=[...document.querySelectorAll('section.chapter')],valid=new Set(chapters.map(section=>section.id));
 let progress=S.get(K.review,{}),reviewed=S.get(K.reviewed,{}),position=S.get(K.position,null),timer;
 const boxes=[...document.querySelectorAll('input[data-done]')],links=[];
 const note=document.getElementById('reviewSaveNote');
 function save(key,value){try{S.put(key,value);note.textContent='阅读位置和学习记录已保存在本浏览器。';}catch{note.textContent='浏览器暂时无法保存。可以在学习进度页下载本次记录备份。';}}
 let theme;try{theme=localStorage.getItem('sapc02-theme');if(theme)theme=JSON.parse(theme);}catch{}
 if(['dark','light'].includes(theme))document.documentElement.dataset.theme=theme;
 document.getElementById('themeBtn').onclick=()=>{const dark=document.documentElement.dataset.theme==='dark'||(!document.documentElement.dataset.theme&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.dataset.theme=dark?'light':'dark';try{localStorage.setItem('sapc02-theme',JSON.stringify(dark?'light':'dark'));}catch{}};
 for(const section of chapters){const li=document.createElement('li'),a=document.createElement('a');a.href='#'+section.id;a.dataset.sec=section.id;const text=document.createElement('span');text.textContent=section.dataset.title;const mark=document.createElement('span');mark.className='done-mark';mark.textContent='✓';a.append(text,mark);li.append(a);links.push(a);
  const subs=section.querySelectorAll('h3[id]');if(subs.length){const list=document.createElement('ol');for(const heading of subs){const item=document.createElement('li'),link=document.createElement('a');link.href='#'+heading.id;link.textContent=heading.textContent;item.append(link);list.append(item);}li.append(list);}document.getElementById('tocList').append(li);
 }
 function renderProgress(){const count=boxes.filter(box=>progress[box.dataset.done]).length;for(const a of links)a.classList.toggle('done',!!progress[a.dataset.sec]);document.getElementById('pbar').style.width=count/boxes.length*100+'%';document.getElementById('plabel').textContent='已读 '+count+' / '+boxes.length+' 章';}
 for(const box of boxes){box.checked=!!progress[box.dataset.done];box.onchange=()=>{progress[box.dataset.done]=box.checked;save(K.review,progress);renderProgress();};}renderProgress();
 const questions=[...document.querySelectorAll('.q')],questionNote=document.createElement('p');questionNote.id='reviewQuestionProgress';questionNote.className='muted';document.querySelector('#practice h2').after(questionNote);
 function renderQuestions(){questionNote.textContent='已看过 '+questions.filter((_,index)=>reviewed[index+1]).length+' / '+questions.length+' 道解析。点击展开答案后会自动记录。';}
 questions.forEach((question,index)=>{const id=index+1,details=question.querySelector('details');question.dataset.reviewed=String(!!reviewed[id]);details.addEventListener('toggle',()=>{if(details.open&&!reviewed[id]){reviewed[id]=true;question.dataset.reviewed='true';save(K.reviewed,reviewed);renderQuestions();}});});renderQuestions();
 let open=false;document.getElementById('ansBtn').onclick=function(){open=!open;for(const question of questions)question.querySelector('details').open=open;this.textContent=open?'收起全部答案':'展开全部答案';};
 const headings=[...document.querySelectorAll('section.chapter,h3[id]')],resume=document.getElementById('resumeReview');
 if(position&&document.getElementById(position.anchor)){resume.href='#'+position.anchor;const target=document.getElementById(position.anchor);resume.textContent='继续上次阅读：'+(target.dataset.title||target.textContent.trim());resume.onclick=event=>{event.preventDefault();history.replaceState(null,'','#'+target.id);window.scrollTo({top:target.getBoundingClientRect().top+scrollY+position.offset,behavior:'instant'});};}
 function savePosition(){let target=headings[0];for(const heading of headings){if(heading.getBoundingClientRect().top<=120)target=heading;else break;}if(!target)return;position={anchor:target.id,offset:Math.round(Math.max(0,scrollY-(target.getBoundingClientRect().top+scrollY)))};save(K.position,position);for(const link of links)link.classList.toggle('active',link.dataset.sec===(valid.has(target.id)?target.id:target.closest('.chapter')?.id));}
 window.addEventListener('scroll',()=>{clearTimeout(timer);timer=setTimeout(savePosition,450);},{passive:true});window.addEventListener('pagehide',()=>{clearTimeout(timer);savePosition();});
 const toc=document.getElementById('toc');document.getElementById('menuBtn').onclick=()=>toc.classList.toggle('open');toc.addEventListener('click',event=>{if(event.target.closest('a')&&innerWidth<=900)toc.classList.remove('open');});
})();
