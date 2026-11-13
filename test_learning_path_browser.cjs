const {chromium}=require('playwright'),assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.SAP_TEST_CHROMIUM?{executablePath:process.env.SAP_TEST_CHROMIUM}:{})});
 try{
  const base=process.env.SAP_TEST_BASE||'http://127.0.0.1:8765/',errors=[];
  async function device(blocked=false){
   const context=await browser.newContext({viewport:{width:1365,height:1000}});
   await context.route('**/account_config.js*',r=>r.fulfill({contentType:'application/javascript',body:'window.SAP_ACCOUNT_CONFIG={apiBase:""}'}));
   if(blocked)await context.addInitScript(()=>{Storage.prototype.setItem=function(){throw new Error('Storage denied')};});
   const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));return {page,context};
  }
  const {page:p}=await device();
  await p.goto(base+'path/index.html');await p.waitForLoadState('networkidle');
  assert.equal(await p.locator('.route-stage').count(),8);assert.equal(await p.locator('#route a').count(),24);
  assert.equal(await p.locator('#concept').isVisible(),true);assert.equal(await p.locator('#quiz').isVisible(),false);
  await p.locator('[data-minutes="10"]').click();
  await p.locator('#foldConcept').click();assert.equal(await p.locator('#concept').isVisible(),false);
  assert.equal(await p.locator('#quizResult').isVisible(),false);
  const first=await p.evaluate(()=>SAP_PATH.lessons[0]);
  await p.locator('[data-answer="'+first.quiz.answer+'"]').click();assert(await p.locator('#quizResult').isVisible());
  await p.reload();assert(await p.locator('#quizResult').isVisible());assert.equal(await p.locator('[data-minutes="10"]').getAttribute('aria-pressed'),'true');
  await p.locator('#coverCheck').click();assert.equal(await p.locator('#quiz').isVisible(),false);await p.locator('[data-rating="clear"]').click();assert.equal(await p.locator('#reviewedCount').innerText(),'1');
  let review=await p.evaluate(()=>LearningProgress.get(ProgressModel.KEYS.path).reviews.architecture);assert.equal(review.streak,1);assert.equal(review.reviews,1);
  assert.equal(await p.locator('[data-rating="clear"]').isDisabled(),true);
  await p.locator('#continuePath').click();assert(p.url().endsWith('#network-boundary'));assert.equal(await p.locator('#quiz').isVisible(),false);
  await p.locator('#foldConcept').click();const second=await p.evaluate(()=>SAP_PATH.lessons[1]);
  await p.locator('[data-answer="'+((second.quiz.answer+1)%3)+'"]').click();assert((await p.locator('#quizResult').innerText()).includes('容易混淆'));
  await p.goto(base+'path/index.html');await p.waitForLoadState('networkidle');assert(p.url().endsWith('#network-boundary'));assert(await p.locator('#quizResult').isVisible());
  await p.locator('#coverCheck').click();await p.locator('[data-rating="again"]').click();assert.equal(await p.locator('#reviewedCount').innerText(),'2');
  await p.evaluate(()=>{const k=ProgressModel.KEYS.path,s=LearningProgress.get(k);s.reviews.architecture={...s.reviews.architecture,reviewedAt:Date.now()-172800000,dueAt:Date.now()-1};LearningProgress.put(k,s);});
  await p.reload();assert.equal(await p.locator('#dueCount').innerText(),'1');
  await p.locator('#startSession').click();assert(p.url().endsWith('#architecture'));assert.equal(await p.locator('#quizResult').isVisible(),false);
  // Every lesson renders and every explanation is gated until a selection.
  const ids=await p.evaluate(()=>SAP_PATH.lessons.map(l=>l.id));
  for(const id of ids){
   await p.goto(base+'path/index.html#'+id);await p.waitForLoadState('networkidle');
   const lesson=await p.evaluate(id=>SAP_PATH.lessons.find(l=>l.id===id),id);
   assert.equal(await p.locator('#lessonTitle').innerText(),lesson.title);
   if(await p.locator('#concept').isVisible())await p.locator('#foldConcept').click();
   if(await p.locator('[data-answer="0"]').isEnabled())await p.locator('[data-answer="'+lesson.quiz.answer+'"]').click();
   assert(await p.locator('#quizResult').isVisible());assert.equal(await p.locator('.quiz-choice').count(),3);
  }
  const withBank=await p.evaluate(()=>SAP_PATH.lessons.find(l=>l.questions.length>=2));
  assert(withBank,'at least one lesson must offer a multi-question set');
  await p.goto(base+'path/index.html#'+withBank.id);await p.waitForLoadState('networkidle');
  await p.locator('[data-minutes="10"]').click();if(await p.locator('#concept').isVisible())await p.locator('#foldConcept').click();await p.locator('[data-answer="'+withBank.quiz.answer+'"]').click();await p.locator('#practiceLesson').click();await p.waitForLoadState('networkidle');
  assert.equal(await p.evaluate(()=>PRACTICE_QUESTIONS.length),2);assert.equal(await p.locator('#inlineFlashWords').isVisible(),false);
  await p.locator('#next').click();assert((await p.locator('#position').innerText()).includes('原题 '+withBank.questions[1]));
  await p.locator('#next').click();await p.waitForLoadState('networkidle');assert(p.url().endsWith('#'+withBank.id));assert(await p.locator('#quizResult').isVisible());
  for(const width of [390,320]){
   await p.setViewportSize({width,height:844});assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  }
  await p.setViewportSize({width:390,height:844});await p.locator('#lesson').scrollIntoViewIfNeeded();await p.screenshot({path:'/tmp/sap-path-mobile.png',fullPage:true});
  await p.setViewportSize({width:1365,height:1000});await p.goto(base+'path/index.html#private-access');await p.waitForLoadState('networkidle');await p.screenshot({path:'/tmp/sap-path-desktop.png',fullPage:true});
  const denied=await device(true);await denied.page.goto(base+'path/index.html');await denied.page.waitForLoadState('networkidle');await denied.page.locator('#foldConcept').click();await denied.page.locator('[data-answer="0"]').click();assert(await denied.page.locator('#quizResult').isVisible());assert((await denied.page.locator('#saveStatus').innerText()).includes('无法保存'));
  assert.deepEqual(errors,[]);
  console.log('Path browser flow passed: 24 lessons, hidden recall/answers, correct/wrong explanations, saved draft, rating/review queue, short-bank return, 320/390px layout and denied storage.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
