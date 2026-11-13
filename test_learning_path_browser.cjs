const {chromium}=require('playwright'),assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.SAP_TEST_CHROMIUM?{executablePath:process.env.SAP_TEST_CHROMIUM}:{})});
 try{
  const base=process.env.SAP_TEST_BASE||'http://127.0.0.1:8765/',errors=[],DAY=86400000;
  async function device(blocked=false){
   const context=await browser.newContext({viewport:{width:1365,height:1000}});
   await context.route('**/account_config.js*',r=>r.fulfill({contentType:'application/javascript',body:'window.SAP_ACCOUNT_CONFIG={apiBase:""}'}));
   if(blocked)await context.addInitScript(()=>{Storage.prototype.setItem=function(){throw new Error('Storage denied')};});
   const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));return {page,context};
  }
  async function go(page,path='path/index.html'){
   await page.goto(base+path);await page.waitForLoadState('networkidle');
  }
  async function enterRecall(page){
   if(await page.locator('#concept').isVisible())await page.locator('#foldConcept').click();
   assert(await page.locator('#recall').isVisible());
   assert.equal(await page.locator('#recallAnswer').isVisible(),false,'reference answer stays concealed until requested');
  }
  async function checkReference(page,lesson){
   await page.locator('#showRecallAnswer').click();
   assert.equal(await page.locator('#showRecallAnswer').getAttribute('aria-expanded'),'true');
   assert.equal(await page.locator('#recallAnswer > p').first().innerText(),lesson.recallAnswer.summary);
   assert.deepEqual(await page.locator('#recallAnswer li').allTextContents(),lesson.recallAnswer.checks);
   await page.locator('#showRecallAnswer').click();
   assert.equal(await page.locator('#recallAnswer').isVisible(),false);
  }
  async function review(page,id){
   return page.evaluate(id=>LearningProgress.get(ProgressModel.KEYS.path,{reviews:{}}).reviews[id],id);
  }
  async function makeDue(page,id){
   await page.evaluate(id=>{const k=ProgressModel.KEYS.path,s=LearningProgress.get(k),now=Date.now();s.reviews[id]={...s.reviews[id],reviewedAt:now-172800000,dueAt:now-1};s.draft=null;LearningProgress.put(k,s);},id);
  }

  const {page:p}=await device();await go(p);
  assert.equal(await p.locator('.route-stage').count(),8);assert.equal(await p.locator('#route a').count(),24);
  assert.equal(await p.locator('#concept').isVisible(),true);assert.equal(await p.locator('#quiz').isVisible(),false);
  assert.equal(await p.locator('#coverCheck,[data-rating]').count(),0,'no repeated concealment or rating gate');
  await p.locator('[data-minutes="10"]').click();await enterRecall(p);
  const first=await p.evaluate(()=>SAP_PATH.lessons[0]);await checkReference(p,first);
  assert.equal(await p.locator('#quizResult').isVisible(),false);
  await p.locator('[data-answer="'+first.quiz.answer+'"]').click();
  assert((await p.locator('#quizResult h3').innerText()).includes('选对了'));
  assert.equal(await p.locator('.chosen-reason').count(),0);
  assert((await p.locator('.correct-reason').innerText()).includes(first.quiz.explanations[first.quiz.answer]));
  assert.equal(await p.locator('.other-options').getAttribute('open'),null,'secondary explanations are optional');
  assert.equal(await review(p,first.id),undefined,'a correct answer alone must not claim completion or confidence');
  await p.reload();await p.waitForLoadState('networkidle');
  assert(await p.locator('#quizResult').isVisible());assert.equal(await p.locator('#recallAnswer').isVisible(),false);
  assert.equal(await p.locator('[data-minutes="10"]').getAttribute('aria-pressed'),'true');
  assert.equal(await p.locator('#completeContinue').isEnabled(),true,'completion needs no extra concealment step');
  await p.locator('#completeContinue').click();
  assert(p.url().endsWith('#network-boundary'));
  let r=await review(p,first.id);
  assert.equal(r.rating,'fuzzy');assert.equal(r.streak,0);assert.equal(r.reviews,1);assert.equal(r.dueAt-r.reviewedAt,DAY);
  assert.equal(await p.locator('#reviewedCount').innerText(),'1');
  assert((await p.locator('.progress-celebration').innerText()).includes(first.title));
  assert.equal(await p.locator('#quiz').isVisible(),false);
  await p.reload();await p.waitForLoadState('networkidle');assert.equal((await review(p,first.id)).reviews,1);

  // A wrong answer can be understood and completed without repeating the quiz.
  await enterRecall(p);const second=await p.evaluate(()=>SAP_PATH.lessons[1]),wrong=(second.quiz.answer+1)%3;
  await p.locator('[data-answer="'+wrong+'"]').click();
  assert((await p.locator('.chosen-reason').innerText()).includes(second.quiz.explanations[wrong]));
  assert((await p.locator('.correct-reason').innerText()).includes(second.quiz.explanations[second.quiz.answer]));
  assert.equal(await p.locator('.lesson-win > h3').innerText(),second.takeaway);
  await go(p);assert(p.url().endsWith('#network-boundary'));assert(await p.locator('#quizResult').isVisible());
  assert.equal(await p.locator('#completeStop').isEnabled(),true);
  await p.locator('#completeStop').click();
  assert(p.url().endsWith('#network-boundary'));assert(await p.locator('#completionStatus').isVisible());
  assert((await p.locator('#completionStatus').innerText()).includes('2 / 24'));
  r=await review(p,second.id);assert.equal(r.rating,'fuzzy');assert.equal(r.streak,0);assert.equal(r.dueAt-r.reviewedAt,DAY);
  await p.reload();await p.waitForLoadState('networkidle');
  assert.equal((await review(p,second.id)).reviews,1);assert.equal(await p.locator('#completeStop,#completeContinue').count(),0);
  assert(await p.locator('#continuePath').isVisible());

  // Due reviews start unanswered; only an explicit opt-in extends the interval.
  await makeDue(p,first.id);await go(p);assert(p.url().endsWith('#architecture'));
  assert.equal(await p.locator('#dueCount').innerText(),'1');assert.equal(await p.locator('#concept').isVisible(),false);
  assert.equal(await p.locator('#quizResult').isVisible(),false);assert.equal(await p.locator('#recallAnswer').isVisible(),false);
  await p.locator('[data-answer="'+first.quiz.answer+'"]').click();
  assert.equal(await p.locator('#spaceReview').isChecked(),false);
  await p.locator('.review-choice summary').click();await p.locator('#spaceReview').check();await p.locator('#completeStop').click();
  r=await review(p,first.id);assert.equal(r.rating,'clear');assert.equal(r.streak,1);assert.equal(r.reviews,2);assert.equal(r.dueAt-r.reviewedAt,DAY);
  await makeDue(p,first.id);await go(p);await p.locator('[data-answer="'+first.quiz.answer+'"]').click();
  await p.locator('.review-choice summary').click();await p.locator('#spaceReview').check();await p.locator('#completeStop').click();
  r=await review(p,first.id);assert.equal(r.streak,2);assert.equal(r.reviews,3);assert.equal(r.dueAt-r.reviewedAt,3*DAY);
  await p.reload();await p.waitForLoadState('networkidle');assert.equal((await review(p,first.id)).reviews,3);

  // All cards have directly inspectable reference answers and a concrete takeaway.
  const {page:catalogue}=await device();await go(catalogue);
  const lessons=await catalogue.evaluate(()=>SAP_PATH.lessons);
  for(const lesson of lessons){
   await go(catalogue,'path/index.html#'+lesson.id);
   assert.equal(await catalogue.locator('#lessonTitle').innerText(),lesson.title);
   await enterRecall(catalogue);await checkReference(catalogue,lesson);
   await catalogue.locator('[data-answer="'+lesson.quiz.answer+'"]').click();
   assert(await catalogue.locator('#quizResult').isVisible());assert.equal(await catalogue.locator('.quiz-choice').count(),3);
   assert.equal(await catalogue.locator('.lesson-win > h3').innerText(),lesson.takeaway);
   assert.equal(await catalogue.locator('#coverCheck,[data-rating]').count(),0);
  }

  // Visiting the final card directly must not imply the entire course is done.
  const last=lessons[lessons.length-1];assert(catalogue.url().endsWith('#'+last.id));
  await catalogue.locator('#completeContinue').click();
  assert(catalogue.url().endsWith('#'+lessons[0].id));
  assert.equal(await catalogue.locator('#reviewedCount').innerText(),'1');
  assert(!(await catalogue.locator('#lesson').innerText()).includes('24 节已完成一轮'));
  await catalogue.evaluate(()=>{
   const k=ProgressModel.KEYS.path,s=LearningProgress.get(k),now=Date.now();
   s.reviews=Object.fromEntries(SAP_PATH.lessons.slice(0,-1).map(l=>[l.id,{reviewedAt:now-1000,dueAt:now+86400000,rating:'fuzzy',reviews:1,streak:0}]));
   s.draft=null;LearningProgress.put(k,s);
  });
  await go(catalogue,'path/index.html#'+last.id);await enterRecall(catalogue);
  await catalogue.locator('[data-answer="'+last.quiz.answer+'"]').click();await catalogue.locator('#completeContinue').click();
  assert.equal(await catalogue.locator('#reviewedCount').innerText(),'24');
  assert((await catalogue.locator('.lesson-next a[href="#methods"]').innerText()).includes('24 节已完成一轮'));
  assert.equal(await catalogue.locator('#continuePath').count(),0);

  const withBank=lessons.find(l=>l.questions.length>=2);assert(withBank);
  await go(p,'path/index.html#'+withBank.id);await p.locator('[data-minutes="10"]').click();await enterRecall(p);
  await p.locator('[data-answer="'+withBank.quiz.answer+'"]').click();
  assert(await p.evaluate(()=>Boolean(document.querySelector('.lesson-win').compareDocumentPosition(document.querySelector('.bank-practice'))&Node.DOCUMENT_POSITION_FOLLOWING)),'the optional question set follows the completion summary');
  await p.locator('#practiceLesson').click();await p.waitForLoadState('networkidle');
  assert.equal(await p.evaluate(()=>PRACTICE_QUESTIONS.length),2);assert.equal(await p.locator('#inlineFlashWords').isVisible(),false);
  await p.locator('#next').click();assert((await p.locator('#position').innerText()).includes('原题 '+withBank.questions[1]));
  await p.locator('#next').click();await p.waitForLoadState('networkidle');
  assert(p.url().endsWith('#'+withBank.id));assert(await p.locator('#quizResult').isVisible());assert.equal(await p.locator('#recallAnswer').isVisible(),false);
  assert.equal(await review(p,withBank.id),undefined,'leaving a question group must not silently complete the lesson');
  await p.locator('#completeStop').click();assert(await p.locator('#completionStatus').isVisible());

  // Inspect the exact Fargate card from the user's report at narrow widths.
  const fargate=lessons.find(l=>l.id==='compute-scale');assert(fargate);
  await go(p,'path/index.html#'+fargate.id);await enterRecall(p);await p.locator('#showRecallAnswer').click();
  await p.locator('[data-answer="'+fargate.quiz.answer+'"]').click();
  for(const width of [390,320]){await p.setViewportSize({width,height:844});assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));}
  await p.setViewportSize({width:390,height:844});await p.screenshot({path:'/tmp/sap-path-recall-mobile.png',fullPage:true});
  await p.setViewportSize({width:1365,height:1000});await p.screenshot({path:'/tmp/sap-path-recall-desktop.png',fullPage:true});
  const denied=await device(true);await go(denied.page);await enterRecall(denied.page);await denied.page.locator('#showRecallAnswer').click();
  await denied.page.locator('[data-answer="'+first.quiz.answer+'"]').click();await denied.page.locator('#completeStop').click();
  assert(await denied.page.locator('#completionStatus').isVisible());assert((await denied.page.locator('#saveStatus').innerText()).includes('无法保存'));
  assert((await denied.page.locator('#completionStatus').innerText()).includes('无法保存'));
  assert.deepEqual(errors,[]);
  console.log('Path browser passed: 24 reference answers, concise correct/wrong feedback, no repeated recall gate, completion/continue, default and opt-in review intervals, durable drafts, due review, bounded practice return, 320/390px layout and denied storage.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
