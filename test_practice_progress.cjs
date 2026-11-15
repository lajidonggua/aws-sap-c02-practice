const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const http=require('node:http'),fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const root=__dirname;
const mime={'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.webmanifest':'application/manifest+json','.png':'image/png','.svg':'image/svg+xml'};
const server=http.createServer((req,res)=>{
 let pathname;try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400).end();return;}
 let file=path.resolve(root,'.'+pathname);if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
 if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
 fs.readFile(file,(error,body)=>{if(error){res.writeHead(404).end('Not found');return;}res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'}).end(body);});
});

(async()=>{
 if(!process.env.SAP_TEST_BASE)await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const base=process.env.SAP_TEST_BASE||'http://127.0.0.1:'+server.address().port+'/';
 const browser=await chromium.launch({headless:true,...(process.env.SAP_TEST_CHROMIUM?{executablePath:process.env.SAP_TEST_CHROMIUM}:{})});
 const errors=[],contexts=[];
 try{
  async function device({blocked=false,legacy=null}={}){
   const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});contexts.push(context);
   await context.route('**/account_config.js*',route=>route.fulfill({contentType:'application/javascript',body:'window.SAP_ACCOUNT_CONFIG={apiBase:""};'}));
   if(blocked)await context.addInitScript(()=>Object.defineProperty(window,'localStorage',{get(){throw new DOMException('blocked','SecurityError');}}));
   if(legacy)await context.addInitScript(value=>{if(!localStorage.getItem('test-progress-seeded')){localStorage.setItem('sap-quick-practice-v1',JSON.stringify(value));localStorage.setItem('test-progress-seeded','1');}},legacy);
   const page=await context.newPage();page.on('pageerror',error=>errors.push(error.message));return {context,page};
  }
  async function go(page,query=''){await page.goto(base+'index.html'+(query?'?'+query:''));await page.waitForLoadState('networkidle');}
  async function position(page,id){await page.waitForFunction(id=>document.getElementById('position').textContent.endsWith('原题 '+id),id);}
  async function current(page){return page.evaluate(()=>pool[at]?.id);}
  async function answer(page,correct=true){
   const selection=await page.evaluate(correct=>{const q=pool[at];if(correct)return q.correct_answers;const wrong=q.options.find(option=>!q.correct_answers.includes(option.letter)).letter;return [wrong,...q.correct_answers.slice(1)];},correct);
   for(const letter of selection)await page.locator('.option[data-letter="'+letter+'"]').click();
   if(selection.length>1)await page.locator('#submit').click();
  }
  async function seedRemaining(page,remaining,last=1){
   await page.evaluate(({remaining,last})=>{const answers={};for(const q of CHOICE_QUESTIONS)if(!remaining.includes(q.id))answers[q.id]={correct:true,selected:[...q.correct_answers]};LearningProgress.put(ProgressModel.KEYS.practice,{answers,stars:[],last});LearningProgress.put(ProgressModel.KEYS.scopes,{});},{remaining,last});
  }
  async function count(page,name,value){await page.waitForFunction(({name,value})=>parseInt(document.querySelector('[data-progress-count="'+name+'"]').textContent,10)===value,{name,value});}
  async function total(page,answered,remaining,wrong){await count(page,'answered',answered);await count(page,'remaining',remaining);if(wrong!==undefined)await count(page,'wrong',wrong);}
  async function chooseMode(page,name){await page.locator('[data-mode="'+name+'"]').click();}

  if(!process.argv.includes('--recent-only')&&!process.argv.includes('--cloud-only')){
  // Existing saved answers immediately define done/remaining; a generic visit continues beyond a completed cursor.
  const old=await device({legacy:{answers:{1:{correct:true,selected:['A']},2:{correct:false,selected:['B']}},stars:[2],last:2}});
  await go(old.page);await position(old.page,3);await total(old.page,2,527,1);
  assert(await old.page.locator('#practiceProgress').isVisible());
  assert((await old.page.locator('#practiceProgress').innerText()).includes('529'));
  assert((await old.page.evaluate(()=>pool.map(q=>q.id))).every(id=>id!==1&&id!==2));
  await go(old.page,'q=2');await position(old.page,2);assert(await old.page.locator('#questionHistory').isVisible());
  assert(/已作答|已做过|上次|已经做过/.test(await old.page.locator('#questionHistory').innerText()));
  await total(old.page,2,527,1);await old.page.locator('#next').click();await position(old.page,3);
  await chooseMode(old.page,'wrong');assert.deepEqual(await old.page.evaluate(()=>pool.map(q=>q.id)),[2]);
  await chooseMode(old.page,'star');assert.deepEqual(await old.page.evaluate(()=>pool.map(q=>q.id)),[2]);
  await chooseMode(old.page,'order');assert((await old.page.evaluate(()=>pool.map(q=>q.id))).every(id=>id!==1&&id!==2));

  // With no random cursor, the first random entry genuinely shuffles instead of pinning order's default Q1.
  const firstRandom=await device();await firstRandom.context.addInitScript(()=>{Math.random=()=>0;});await go(firstRandom.page,'mode=random');
  assert.equal(await current(firstRandom.page),2,'deterministic fresh shuffle must not pin the default order question');

  // Order and random have separate continuation points, and random navigation survives reload/new tab.
  const continuity=await device();await go(continuity.page,'q=24');await position(continuity.page,24);
  await continuity.page.locator('#next').click();await position(continuity.page,25);
  await chooseMode(continuity.page,'random');const randomStart=await current(continuity.page);
  assert.equal(new URL(continuity.page.url()).searchParams.get('mode'),'random');
  assert.equal(new URL(continuity.page.url()).searchParams.get('q'),String(randomStart));
  await continuity.page.reload();await continuity.page.waitForLoadState('networkidle');await position(continuity.page,randomStart);
  assert.equal(await continuity.page.evaluate(()=>mode),'random');
  const reopened=await continuity.context.newPage();reopened.on('pageerror',error=>errors.push(error.message));await go(reopened);await position(reopened,randomStart);assert.equal(await reopened.evaluate(()=>mode),'random');
  await chooseMode(continuity.page,'order');await position(continuity.page,25);
  await chooseMode(continuity.page,'random');await position(continuity.page,randomStart);
  const scopes=await continuity.page.evaluate(()=>LearningProgress.get(ProgressModel.KEYS.scopes));
  assert.equal(scopes['bank:order'],25);assert.equal(scopes['bank:random'],randomStart);assert.equal(scopes['bank:mode'],2);
  await continuity.page.goto(base+'account/index.html');await continuity.page.waitForLoadState('networkidle');
  const resume=continuity.page.locator('#resumeLinks a[href*="mode=random"]');assert.equal(await resume.count(),1);assert.equal(new URL(await resume.getAttribute('href'),continuity.page.url()).searchParams.get('q'),String(randomStart));
  await resume.click();await position(continuity.page,randomStart);assert.equal(await continuity.page.evaluate(()=>mode),'random');

  // All remaining questions are visited once; peeking/skipping cannot silently complete the bank.
  const finish=await device();await go(finish.page);await seedRemaining(finish.page,[24,40,61],40);await go(finish.page);
  await position(finish.page,40);assert.deepEqual(await finish.page.evaluate(()=>pool.map(q=>q.id)),[40,61,24]);await total(finish.page,526,3,0);
  await answer(finish.page);await total(finish.page,527,2,0);await finish.page.locator('#reviewNext').click();await position(finish.page,61);
  await answer(finish.page,false);await total(finish.page,528,1,1);
  await go(finish.page,'q=40');await position(finish.page,40);assert(await finish.page.locator('#questionHistory').isVisible());await total(finish.page,528,1,1);
  await finish.page.locator('#next').click();await position(finish.page,24);
  await finish.page.locator('.peek-answer').click();await total(finish.page,528,1,1);await finish.page.locator('#reviewNext').click();
  assert(await finish.page.locator('#bankCompletion').isVisible());assert(await finish.page.locator('#continueUnanswered').isVisible());
  assert.equal(await finish.page.evaluate(()=>Object.keys(LearningProgress.get(ProgressModel.KEYS.practice).answers).length),528);
  await finish.page.locator('#continueUnanswered').click();await position(finish.page,24);await answer(finish.page);await total(finish.page,529,0,1);await finish.page.locator('#reviewNext').click();
  assert(await finish.page.locator('#bankCompletion').isVisible());assert(!(await finish.page.locator('#continueUnanswered').isVisible()));
  assert((await finish.page.locator('#bankCompletion').innerText()).includes('529'));
  await finish.page.locator('#reviewWrong').click();assert.equal(await finish.page.evaluate(()=>mode),'wrong');assert.deepEqual(await finish.page.evaluate(()=>pool.map(q=>q.id)),[61]);
  await go(finish.page);assert(await finish.page.locator('#bankCompletion').isVisible());
  await finish.page.locator('#reviewAll').click();assert.equal(new URL(finish.page.url()).searchParams.get('review'),'all');assert.equal(await finish.page.evaluate(()=>pool.length),529);await total(finish.page,529,0,1);
  await go(finish.page,'mode=order&review=all&q=529');await position(finish.page,529);await finish.page.locator('#next').click();await position(finish.page,1);await total(finish.page,529,0,1);
  await go(finish.page);assert(await finish.page.locator('#bankCompletion').isVisible(),'completed bank never starts automatically from question1');
  await finish.page.screenshot({path:path.join(os.tmpdir(),'sap-practice-complete-mobile.png')});

  // Random draws only unfinished IDs, never returning a graded question while any remain.
  const random=await device();await go(random.page);await seedRemaining(random.page,[24,40,61],24);await go(random.page,'mode=random');
  const drawn=[];
  for(let i=0;i<3;i++){
   const id=await current(random.page);assert([24,40,61].includes(id));assert(!drawn.includes(id));drawn.push(id);
   await answer(random.page);await random.page.locator('#reviewNext').click();
  }
  assert(await random.page.locator('#bankCompletion').isVisible());assert.equal(new Set(drawn).size,3);await total(random.page,529,0,0);

  // Updated records from another device are respected before the current draft is saved or navigation advances.
  const merged=await device();await go(merged.page);await seedRemaining(merged.page,[24,40,61],24);await go(merged.page);await position(merged.page,24);
  await merged.page.evaluate(()=>{
   const q=CHOICE_QUESTIONS.find(item=>item.id===40),cell=ProgressModel.KEYS.practice+'|answers/40';
   LearningProgress.merge({[cell]:{value:{correct:true,selected:[...q.correct_answers]},stamp:String(Date.now()+1000).padStart(16,'0')+'-remote-device123'}},'cloud');
  });
  await total(merged.page,527,2,0);await position(merged.page,24);await answer(merged.page);await merged.page.locator('#reviewNext').click();await position(merged.page,61);
  assert(await merged.page.evaluate(()=>LearningProgress.get(ProgressModel.KEYS.practice).answers[40]?.correct));await total(merged.page,528,1,0);

  // Fixed chapter groups keep their original ordering but display global and per-group progress separately.
  const scoped=await device();await go(scoped.page,'q=4');await position(scoped.page,4);
  const bankCursor=await scoped.page.evaluate(()=>LearningProgress.get(ProgressModel.KEYS.practice).last);
  await go(scoped.page,'chapter=networking&count=5&from=1&q=1');
  const group=await scoped.page.evaluate(()=>PRACTICE_QUESTIONS.map(q=>q.id));assert.equal(group.length,5);assert.equal(group[0],1);
  await answer(scoped.page);await total(scoped.page,1,528,0);assert(await scoped.page.locator('#scopeProgress').isVisible());
  await chooseMode(scoped.page,'random');assert.deepEqual((await scoped.page.evaluate(()=>pool.map(q=>q.id))).sort((a,b)=>a-b),[...group].sort((a,b)=>a-b));
  assert.equal(await scoped.page.evaluate(()=>LearningProgress.get(ProgressModel.KEYS.practice).last),bankCursor);
  const anchor=new URL(scoped.page.url()).searchParams.get('from');await scoped.page.reload();await scoped.page.waitForLoadState('networkidle');assert.equal(new URL(scoped.page.url()).searchParams.get('from'),anchor);assert.deepEqual(await scoped.page.evaluate(()=>PRACTICE_QUESTIONS.map(q=>q.id)),group);
  await go(scoped.page,'chapter=networking&count=10&from=1&q=1');assert.equal(await scoped.page.evaluate(()=>PRACTICE_QUESTIONS.length),10);

  // Denied persistent storage still allows a non-repeating session and honest counts.
  const denied=await device({blocked:true});await go(denied.page);await position(denied.page,1);await answer(denied.page);await total(denied.page,1,528,0);await denied.page.locator('#reviewNext').click();await position(denied.page,2);await chooseMode(denied.page,'random');assert(!(await denied.page.evaluate(()=>pool.map(q=>q.id))).includes(1));
  assert.equal(await denied.page.evaluate(()=>LearningProgress.status().storageOK),false);
  for(const width of [390,320]){
   await old.page.setViewportSize({width,height:844});await go(old.page);assert(await old.page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'progress and filters fit mobile');
   if(width===390)await old.page.screenshot({path:path.join(os.tmpdir(),'sap-practice-progress-mobile.png')});
  }
  }
  // A cloud cursor may arrive after a generic landing; it must not overwrite an active draft.
  {
  const landing=await device();await go(landing.page);await position(landing.page,1);
  const initialScopes=await landing.page.evaluate(()=>LearningProgress.get(ProgressModel.KEYS.scopes,{}));
  assert.equal(initialScopes['bank:order'],undefined);assert.equal(initialScopes['bank:random'],undefined);assert.equal(initialScopes['bank:mode'],undefined);
  await landing.page.evaluate(()=>{
   const stamp=String(Date.now()+1000).padStart(16,'0')+'-cloud-cursor123';
   LearningProgress.merge({
    [ProgressModel.KEYS.scopes+'|bank:random']:{value:4,stamp},[ProgressModel.KEYS.scopes+'|bank:mode']:{value:2,stamp},
    [ProgressModel.KEYS.practice+'|answers/1']:{value:{correct:true,selected:[...CHOICE_QUESTIONS.find(q=>q.id===1).correct_answers]},stamp},
    [ProgressModel.KEYS.practice+'|answers/2']:{value:{correct:false,selected:['A']},stamp}
   },'cloud');
  });
  await position(landing.page,4);assert.equal(await landing.page.evaluate(()=>mode),'random');await total(landing.page,2,527,1);
  const draft=await device();await go(draft.page);const multi=await draft.page.evaluate(()=>CHOICE_QUESTIONS.find(q=>q.correct_answers.length>1));
  await draft.page.locator('#jump').fill(String(multi.id));await draft.page.locator('#jumpForm button').click();await position(draft.page,multi.id);
  await draft.page.locator('.option[data-letter="'+multi.correct_answers[0]+'"]').click();
  await draft.page.evaluate(()=>{const stamp=String(Date.now()+1000).padStart(16,'0')+'-cloud-cursor123';LearningProgress.merge({[ProgressModel.KEYS.scopes+'|bank:random']:{value:529,stamp},[ProgressModel.KEYS.scopes+'|bank:mode']:{value:2,stamp}},'cloud');});
  await position(draft.page,multi.id);assert.equal(await draft.page.evaluate(()=>mode),'order');assert.deepEqual(await draft.page.evaluate(()=>selected),[multi.correct_answers[0]]);assert.equal(await draft.page.locator('.option[aria-pressed="true"]').count(),1);
  }
  if(!process.argv.includes('--cloud-only')){
  // Recent accuracy is chronological attempts, including retries, and never fabricated from legacy answers.
  const recent=await device({legacy:{answers:{1:{correct:true,selected:['A']},2:{correct:false,selected:['B']}},stars:[],last:2}});
  await go(recent.page);await total(recent.page,2,527,1);
  assert.equal((await recent.page.locator('#recentAccuracy').innerText()).trim(),'—');
  const attempts=[{id:24,correct:false},...Array.from({length:9},()=>({id:24,correct:true})),{id:24,correct:false}];
  for(const attempt of attempts){await go(recent.page,'q='+attempt.id);await position(recent.page,attempt.id);await answer(recent.page,attempt.correct);}
  await total(recent.page,3,526,2);
  assert.equal((await recent.page.locator('#recentAccuracy').innerText()).trim(),'90%');
  assert(/最近\s*10\s*次，答对\s*9\s*次/.test(await recent.page.locator('#recentAccuracyDetail').innerText()));
  for(const attempt of [{id:61,correct:true},{id:40,correct:false}]){await go(recent.page,'q='+attempt.id);await position(recent.page,attempt.id);await answer(recent.page,attempt.correct);}
  assert.equal((await recent.page.locator('#recentAccuracy').innerText()).trim(),'80%');
  assert(/最近\s*10\s*次，答对\s*8\s*次/.test(await recent.page.locator('#recentAccuracyDetail').innerText()));
  await recent.page.reload();await recent.page.waitForLoadState('networkidle');
  assert.equal((await recent.page.locator('#recentAccuracy').innerText()).trim(),'80%');
  await recent.page.locator('#next').click();await recent.page.locator('.peek-answer').click();await recent.page.locator('#reviewNext').click();
  assert.equal((await recent.page.locator('#recentAccuracy').innerText()).trim(),'80%');await total(recent.page,5,524,3);
  for(const width of [390,320]){await recent.page.setViewportSize({width,height:844});await recent.page.evaluate(()=>window.scrollTo(0,0));assert(await recent.page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await recent.page.screenshot({path:path.join(os.tmpdir(),'sap-practice-recent-accuracy-'+width+'.png')});}
  }
  assert.deepEqual(errors,[]);
  if(process.argv.includes('--cloud-only'))console.log('Late cloud cursor passed: fresh landing does not stamp defaultbankcursor, delayedremote records restore randomQ4, active multi-choice draft remains intact.');
  else if(process.argv.includes('--recent-only'))console.log('Recent accuracy passed: legacy records do not invent recent history,11 submissions/retries use latest10=90%, subsequent mixed IDs use80%, one-question coverage deduplication, refresh persistence, skipped/peeked questions ignored.');
  else console.log('Practice progress passed: legacy counts, order/random independent resume, reload/new tab, unanswered-only default, explicit review, no automatic wrap, real completion, skipped/peeked questions, scoped groups, cloud merge and late cursor arrival, preserved drafts, recent10 accuracy/retries, storage denial and mobile.');
 }finally{for(const context of contexts)await context.close();await browser.close();if(server.listening)await new Promise(resolve=>server.close(resolve));}
})().catch(error=>{console.error(error);server.close();process.exitCode=1;});
