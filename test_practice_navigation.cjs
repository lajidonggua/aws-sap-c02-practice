const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const base=process.env.SAP_TEST_BASE||'http://127.0.0.1:8000/';
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.SAP_TEST_CHROMIUM?{executablePath:process.env.SAP_TEST_CHROMIUM}:{})});
 try{
 const context=await browser.newContext({viewport:{width:1365,height:1000}});
 const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 async function goto(path){await page.goto(base+path);await page.waitForLoadState('networkidle');}
 async function position(id){await page.waitForFunction(id=>new RegExp('原题 '+id+'$').test(document.getElementById('position').textContent),id);}
 async function jump(id){await page.locator('#jump').fill(String(id));await page.locator('#jumpForm button').click();await position(id);}
 async function mode(name){await page.locator('[data-mode="'+name+'"]').click();}
 await goto('learn/index.html#foundations');
 const data=await page.evaluate(()=>{
  const ids=getStudyChapterQuestions(STUDY_CHAPTERS[0]);
  return {ids,outside:CHOICE_QUESTIONS.find(q=>!ids.includes(q.id)).id,chapters:STUDY_CHAPTERS.map(c=>({id:c.id,ids:getStudyChapterQuestions(c)})),term:getStudyRelatedQuestions('vpc')};
 });
 assert.deepEqual(data.ids.slice(0,4),[24,40,61,69]);
 await page.evaluate(({outside})=>{
  localStorage.setItem('sap-quick-practice-v1',JSON.stringify({answers:{40:{correct:false,selected:['A']},61:{correct:true,selected:['A']},[outside]:{correct:false,selected:['B']}},stars:[40,outside],last:2}));
  localStorage.setItem('sap-five-second-v1',JSON.stringify({again:[40,outside],known:[4],last:4}));
 },data);
 assert.equal(await page.locator('.practice-box .primary-link').getAttribute('href'),'../index.html?chapter=foundations&q=24');
 await page.locator('.practice-box .primary-link').click();await page.waitForLoadState('networkidle');await position(24);
 assert((await page.locator('#practiceSetBanner').innerText()).includes('380 题'));
 assert((await page.locator('#position').innerText()).includes('1 / 380'));
 await page.locator('#next').click();await position(40);await page.locator('#next').click();await position(61);await page.locator('#prev').click();await position(40);
 await page.locator('.peek-answer').click();await page.locator('#reviewNext').click();await position(61);
 assert.equal(new URL(page.url()).searchParams.get('q'),'61');await page.reload();await position(61);
 assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('sap-quick-practice-v1')).last),2);
 await jump(121);await page.locator('#next').click();await position(230);
 await page.locator('#jump').fill(String(data.outside));await page.locator('#jumpForm button').click();await position(230);assert((await page.locator('#jumpNote').innerText()).includes('不在当前集合'));
 await mode('wrong');await position(40);assert.deepEqual(await page.evaluate(()=>pool.map(q=>q.id)),[40]);await page.locator('#next').click();await position(40);
 await mode('star');await position(40);assert.deepEqual(await page.evaluate(()=>pool.map(q=>q.id)),[40]);
 await mode('random');const random=await page.evaluate(()=>pool.map(q=>q.id));assert.equal(random.length,380);assert(random.every(id=>data.ids.includes(id)));
 await mode('flash');await jump(24);await page.locator('#next').click();await position(40);await page.locator('#flashKnown').click();await position(61);
 await page.locator('#flashAgain').click();assert((await page.locator('#question').innerText()).includes('暂时没有要再背的题'));assert((await page.locator('#flashAll').innerText()).includes('本集合'));await page.locator('#flashAll').click();await position(24);
 // Mark within the set again and verify the external saved item is excluded.
 await page.locator('#flashMiss').click();await position(40);await page.locator('#flashAgain').click();await position(24);assert.deepEqual(await page.evaluate(()=>pool.map(q=>q.id)),[24]);
 await mode('keywords');await page.locator('#keywordSearch').fill('');await position(24);await page.locator('#next').click();await position(40);
 await page.locator('#keywordSearch').fill('S3');assert((await page.evaluate(()=>pool.map(q=>q.id))).every(id=>data.ids.includes(id)));
 await page.locator('#keywordSearch').fill('40');await position(40);await page.locator('details.original summary').click();await page.locator('#practiceOriginal').click();await position(40);await page.locator('#next').click();await position(61);
 await mode('memory');await position(24);await page.locator('#reviewNext').click();await position(40);
 await mode('order');await jump(data.ids.at(-1));assert((await page.locator('#next').innerText()).includes('再练一轮'));await page.locator('#next').click();await position(24);
 await page.locator('#practiceSetBanner a').first().click();await page.waitForURL('**#foundations');
 await page.locator('.study-question-links a').nth(1).click();await position(40);assert((await page.locator('#position').innerText()).includes('2 / 380'));await page.locator('#next').click();await position(61);
 // Each chapter uses the exact list shown by its own guide.
 for(const chapter of data.chapters){
  await goto('learn/index.html#'+chapter.id);await page.locator('.practice-box .primary-link').click();await position(chapter.ids[0]);assert.deepEqual(await page.evaluate(()=>pool.map(q=>q.id)),chapter.ids);await page.locator('#next').click();await position(chapter.ids[1]);
 }
 await goto('learn/index.html#foundations');await page.locator('#term-vpc .term-links a').filter({hasText:'练习相关题'}).click();await position(data.term[0]);assert(new URL(page.url()).searchParams.get('term')==='vpc');assert.deepEqual(await page.evaluate(()=>pool.map(q=>q.id)),data.term);await page.locator('#next').click();await position(data.term[1]);await page.locator('#practiceSetBanner a').first().click();await page.waitForLoadState('networkidle');assert(new URL(page.url()).searchParams.get('term')==='vpc');assert.equal(await page.locator('#studySearch').inputValue(),'VPC');
 await goto('index.html?chapter=foundations&q=24');await page.setViewportSize({width:390,height:844});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.screenshot({path:require('node:path').join(require('node:os').tmpdir(),'sap-practice-set-mobile.png')});await page.locator('#next').click();await position(40);
 await page.locator('#practiceSetBanner a').last().click();await position(2);assert(await page.locator('#practiceSetBanner').isHidden());
 await goto('index.html?q=24');await position(24);await page.locator('#next').click();await position(25);assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('sap-quick-practice-v1')).last),25);
 await goto('index.html?chapter=invalid&q=24');await position(24);assert(await page.locator('#practiceSetBanner').isHidden());
 const blocked=await browser.newContext();await blocked.addInitScript(()=>Object.defineProperty(window,'localStorage',{get(){throw new DOMException('blocked','SecurityError')}}));const blockedPage=await blocked.newPage();await blockedPage.goto(base+'index.html?chapter=foundations&q=24');await blockedPage.waitForLoadState('networkidle');await blockedPage.locator('#next').click();await blockedPage.waitForFunction(()=>document.getElementById('position').textContent.endsWith('原题 40'));assert((await blockedPage.locator('#position').innerText()).endsWith('原题 40'));await blocked.close();
 assert.deepEqual(errors,[]);console.log('Scoped practice passed: 24→40→61, guide chips, all 13 chapters, term sets, answer-next, refresh, filters, flash, search, boundaries, preserved full-bank progress, mobile and blocked storage.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
