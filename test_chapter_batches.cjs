const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const path=require('node:path'),os=require('node:os');
const base=process.env.SAP_TEST_BASE||'http://127.0.0.1:8765/';

(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.SAP_TEST_CHROMIUM?{executablePath:process.env.SAP_TEST_CHROMIUM}:{})});
 try{
  const errors=[];
  async function device(blocked=false){
   const context=await browser.newContext({viewport:{width:1365,height:1000}});
   await context.route('**/account_config.js*',route=>route.fulfill({contentType:'application/javascript',body:'window.SAP_ACCOUNT_CONFIG={apiBase:""};'}));
   if(blocked)await context.addInitScript(()=>Object.defineProperty(window,'localStorage',{get(){throw new DOMException('blocked','SecurityError');}}));
   const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));return {context,page};
  }
  const {page:p}=await device();
  async function go(url){await p.goto(base+url);await p.waitForLoadState('networkidle');}
  async function position(id){await p.waitForFunction(id=>document.getElementById('position').textContent.endsWith('原题 '+id),id);}
  async function ids(){return p.evaluate(()=>PRACTICE_QUESTIONS.map(q=>q.id));}
  async function finish(){for(let i=0;i<10&&!(await p.locator('#batchCompletion').count());i++)await p.locator('#next').click();assert(await p.locator('#batchCompletion').isVisible(),'a bounded group must finish instead of wrapping');}
  function query(chapter,size,from,q=from){return 'index.html?chapter='+chapter+'&count='+size+'&from='+from+'&q='+q;}

  await go('learn/index.html#networking');
  const data=await p.evaluate(()=>{
   const chapter=STUDY_CHAPTERS.find(c=>c.id==='networking'),at=STUDY_CHAPTERS.indexOf(chapter),last=STUDY_CHAPTERS.at(-1);
   return {ids:getStudyChapterQuestions(chapter),next:STUDY_CHAPTERS[at+1],last:{id:last.id,ids:getStudyChapterQuestions(last)}};
  });
  assert.equal(data.ids.length,159,'reported networking collection should remain available in the background');
  assert.equal(await p.locator('[data-study-practice-size="5"]').getAttribute('aria-pressed'),'true');
  assert.equal(await p.locator('#chapterPractice .study-question-links a').count(),5);
  assert((await p.locator('#practiceBatchSummary').innerText()).includes('只练 5 题'));
  assert.equal(await p.locator('.practice-extra').getAttribute('open'),null,'the full collection is optional and collapsed');
  await p.locator('[data-quiz-choice="1"]').click();
  await p.locator('[data-study-practice-size="10"]').click();
  assert.equal(await p.locator('#chapterPractice .study-question-links a').count(),10);
  assert.equal(await p.locator('[data-quiz-choice="1"]').getAttribute('aria-pressed'),'true','changing batch size preserves chapter quiz');
  assert((await p.locator('#practiceBatchSummary').innerText()).includes('只练 10 题'));
  for(const href of await p.locator('#chapterPractice .study-question-links a').evaluateAll(links=>links.map(a=>a.href))){
   const u=new URL(href);assert.equal(u.searchParams.get('count'),'10');assert.equal(u.searchParams.get('from'),String(data.ids[0]));
  }
  await p.locator('[data-study-practice-size="5"]').click();
  await p.locator('#chapterPractice .primary-link').click();await p.waitForLoadState('networkidle');
  assert.deepEqual(await ids(),data.ids.slice(0,5));await position(data.ids[0]);
  await p.locator('#next').click();await position(data.ids[1]);
  assert.equal(new URL(p.url()).searchParams.get('from'),String(data.ids[0]));
  await p.reload();await p.waitForLoadState('networkidle');await position(data.ids[1]);assert.deepEqual(await ids(),data.ids.slice(0,5));
  for(let i=2;i<5;i++){await p.locator('#next').click();await position(data.ids[i]);}
  await p.locator('#next').click();assert(await p.locator('#batchCompletion').isVisible());
  assert.equal(await p.evaluate(()=>Object.keys(LearningProgress.get(ProgressModel.KEYS.practice,{answers:{}}).answers).length),0,'skipping is not a graded attempt');
  assert.equal(await p.evaluate(()=>LearningProgress.get(ProgressModel.KEYS.study,{read:[]}).read.includes('networking')),false,'a practice boundary does not silently mark a chapter read');
  assert.equal(await p.locator('#batchNextChapter').getAttribute('href'),'learn/index.html#'+data.next.id);
  const more=new URL(await p.locator('#batchMore').getAttribute('href'),p.url());assert.equal(more.searchParams.get('from'),String(data.ids[5]));assert.equal(more.searchParams.get('count'),'5');
  await p.locator('#batchNextChapter').click();await p.waitForLoadState('networkidle');assert(p.url().endsWith('#'+data.next.id));assert.equal(await p.locator('#chapterTitle').innerText(),data.next.title);

  // Each batch size and anchor has its own continuation point.
  await go(query('networking',5,data.ids[0],data.ids[1]));await position(data.ids[1]);
  await go(query('networking',10,data.ids[0],data.ids[3]));await position(data.ids[3]);assert.deepEqual(await ids(),data.ids.slice(0,10));
  await go('learn/index.html#networking');
  let link=new URL(await p.locator('#chapterPractice .primary-link').getAttribute('href'),p.url());assert.equal(link.searchParams.get('q'),String(data.ids[1]));assert.equal(link.searchParams.get('count'),'5');
  await p.locator('[data-study-practice-size="10"]').click();
  link=new URL(await p.locator('#chapterPractice .primary-link').getAttribute('href'),p.url());assert.equal(link.searchParams.get('q'),String(data.ids[3]));assert.equal(link.searchParams.get('count'),'10');
  await p.locator('#chapterPractice .primary-link').click();await p.waitForLoadState('networkidle');await position(data.ids[3]);await finish();assert(await p.locator('#batchCompletion').isVisible());
  assert.equal(new URL(await p.locator('#batchMore').getAttribute('href'),p.url()).searchParams.get('from'),String(data.ids[10]));

  // A subsequent group is a new fixed slice, and a short tail never wraps around.
  await go(query('networking',5,data.ids[0],data.ids[4]));await p.locator('#next').click();await p.locator('#batchMore').click();await p.waitForLoadState('networkidle');assert.deepEqual(await ids(),data.ids.slice(5,10));
  await p.reload();await p.waitForLoadState('networkidle');assert.deepEqual(await ids(),data.ids.slice(5,10));
  await go('learn/index.html#networking');link=new URL(await p.locator('#chapterPractice .primary-link').getAttribute('href'),p.url());assert.equal(link.searchParams.get('from'),String(data.ids[5]));
  await go(query('networking',10,data.ids.at(-2)));assert.deepEqual(await ids(),data.ids.slice(-2));await finish();assert.equal(await p.locator('#batchMore').count(),0);await p.locator('#batchRepeat').click();await position(data.ids.at(-2));assert.deepEqual(await ids(),data.ids.slice(-2));

  // Random, filtered and flash modes cannot expand or loop the selected group.
  await go(query('networking',5,data.ids[0]));await p.locator('[data-mode="random"]').click();assert.deepEqual((await p.evaluate(()=>pool.map(q=>q.id))).sort((a,b)=>a-b),data.ids.slice(0,5).sort((a,b)=>a-b));await finish();assert(await p.locator('#batchCompletion').isVisible());
  await p.locator('#batchRepeat').click();await position(data.ids[0]);assert.equal(await p.evaluate(()=>mode),'order');
  await p.evaluate(id=>LearningProgress.put(ProgressModel.KEYS.practice,{answers:{[id]:{correct:false,selected:['A']}},stars:[],last:2}),data.ids[1]);
  await go(query('networking',5,data.ids[0]));await p.locator('[data-mode="wrong"]').click();assert.deepEqual(await p.evaluate(()=>pool.map(q=>q.id)),[data.ids[1]]);await p.locator('#next').click();assert(await p.locator('#batchCompletion').isVisible());
  await go(query('networking',5,data.ids[0]));await p.locator('[data-mode="flash"]').click();for(let i=0;i<5;i++)await p.locator('#flashKnown').click();assert(await p.locator('#batchCompletion').isVisible());await p.locator('#batchRepeat').click();await position(data.ids[0]);
  assert.equal(await p.evaluate(()=>LearningProgress.get(ProgressModel.KEYS.practice).last),2,'bounded practice preserves full-bank continuation');

  // The last chapter does not invent a next chapter.
  await go(query(data.last.id,5,data.last.ids.at(-1)));assert.equal(await p.evaluate(()=>practiceSet.nextChapterHref),null);await finish();assert(!(await p.locator('#batchCompletion').innerText()).includes('继续下一章'));assert.equal(await p.locator('#batchMore').count(),0);

  // Real answers reach the same boundary, with an accurate small-group result.
  await go(query('networking',5,data.ids[0]));
  for(const id of data.ids.slice(0,5)){
   await position(id);const correct=await p.evaluate(()=>pool[at].correct_answers);
   for(const letter of correct)await p.locator('.option[data-letter="'+letter+'"]').click();
   if(correct.length>1)await p.locator('#submit').click();
   await p.locator('#reviewNext').click();
  }
  assert.deepEqual(await p.locator('.batch-results strong').allTextContents(),['5 / 5','5']);
  await p.keyboard.press('ArrowRight');assert(await p.locator('#batchCompletion').isVisible());
  await p.evaluate(()=>LearningProgress.put(ProgressModel.KEYS.scopes,{}));
  for(const width of [390,320]){
   await p.setViewportSize({width,height:844});await go('learn/index.html#networking');assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
   await p.locator('[data-study-practice-size="10"]').click();assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  }
  await p.setViewportSize({width:390,height:844});await p.locator('#chapterPractice').screenshot({path:path.join(os.tmpdir(),'sap-chapter-batch-guide-mobile.png')});
  await go(query('networking',5,data.ids[0],data.ids[4]));await p.locator('#next').click();assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await p.locator('#batchCompletion').screenshot({path:path.join(os.tmpdir(),'sap-chapter-batch-complete-mobile.png')});
  const denied=await device(true);await denied.page.goto(base+'learn/index.html#networking');await denied.page.waitForLoadState('networkidle');await denied.page.locator('[data-study-practice-size="10"]').click();await denied.page.locator('#chapterPractice .primary-link').click();await denied.page.waitForLoadState('networkidle');assert.equal(await denied.page.evaluate(()=>PRACTICE_QUESTIONS.length),10);for(let i=0;i<10;i++)await denied.page.locator('#next').click();assert(await denied.page.locator('#batchCompletion').isVisible());
  assert.deepEqual(errors,[]);
  console.log('Chapter batches passed: 5/10 selection, fixed slices and refresh, isolated continuation, stop and next chapter, next group and tails, modes/flash, ungraded skips, final chapter, mobile and blocked storage.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
