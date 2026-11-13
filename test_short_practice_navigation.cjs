const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const base=process.env.SAP_TEST_BASE||'http://127.0.0.1:8765/';

(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.SAP_TEST_CHROMIUM?{executablePath:process.env.SAP_TEST_CHROMIUM}:{})});
 try{
  const context=await browser.newContext({viewport:{width:390,height:844}});
  // Controlled content tests the navigation contract independently of curriculum edits.
  const fixture={stage:'first',goal:'理解示例',terms:[{name:'名词',meaning:'职责'}],points:['一个要点'],flow:['条件','方案'],contrast:{a:'甲',b:'乙',rule:'不同职责'},recall:'如何选择？',recallAnswer:{summary:'先明确条件，再比较方案职责。',checks:['核对题目条件。','排除职责不符的方案。']},takeaway:'按条件和职责选择方案。',quiz:{question:'示例条件',options:['甲','乙','丙'],answer:0,explanations:['正确','不适用','不适用'],change:'换一个条件'},chapter:'foundations'};
  const curriculum={stages:[{id:'first',title:'第一步',why:'建立概念'}],lessons:[{...fixture,id:'sample',title:'短时练习示例',questions:[24,40,61]},{...fixture,id:'intro',title:'概念入门',questions:[]}]};
  await context.route('**/learning_path_data.js*',route=>route.fulfill({contentType:'application/javascript',body:'globalThis.SAP_PATH='+JSON.stringify(curriculum)+';'}));
  const page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  async function goto(query){await page.goto(base+'index.html?'+query);await page.waitForLoadState('networkidle');}
  async function position(id){await page.waitForFunction(id=>document.getElementById('position').textContent.endsWith('原题 '+id),id);}
  await goto('lesson=sample&count=2');await position(24);
  assert.deepEqual(await page.evaluate(()=>pool.map(q=>q.id)),[24,40]);
  assert((await page.locator('#practiceSetBanner').innerText()).includes('小节练习 · 2 题'));
  assert(await page.locator('#inlineFlashWords').isHidden(),'answer cues must be opt-in');
  assert.equal(await page.locator('#toggleInlineFlash').getAttribute('aria-expanded'),'false');
  await page.locator('#toggleInlineFlash').click();assert(await page.locator('#inlineFlashWords').isVisible());
  await page.locator('#next').click();await position(40);
  assert(await page.locator('#inlineFlashWords').isHidden(),'the next question starts without cues again');
  assert((await page.locator('#next').innerText()).includes('返回小节'));
  assert.equal(await page.evaluate(()=>LearningProgress.get(ProgressModel.KEYS.practice,{answers:{}}).answers[24]),undefined,'skipping is not a correct attempt');
  await page.reload();await position(40);
  await page.locator('.peek-answer').click();assert((await page.locator('#reviewNext').innerText()).includes('返回小节'));
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'mobile should not overflow');
  await page.locator('#reviewNext').click();await page.waitForURL('**/path/index.html#sample');
  await goto('lesson=sample&count=1');await position(24);await page.locator('#next').click();await page.waitForURL('**/path/index.html#sample');
  await goto('lesson=sample&count=99');assert.equal(await page.evaluate(()=>pool.length),3);
  await page.locator('[data-mode="flash"]').click();await position(24);
  await page.locator('#flashKnown').click();await position(40);await page.locator('#flashKnown').click();await position(61);await page.locator('#flashKnown').click();
  assert((await page.locator('#flashStatus').innerText()).includes('本组已看完'));
  await page.locator('#flashPlay').click();await page.waitForURL('**/path/index.html#sample');
  await goto('lesson=intro');assert.equal(await page.evaluate(()=>pool.length),0);
  assert((await page.locator('#question').innerText()).includes('入门场景题'));
  await page.locator('#back').click();await page.waitForURL('**/path/index.html#intro');
  // All-bank practice and chapter navigation still use their own order.
  await goto('q=24');await position(24);assert(await page.locator('#inlineFlashWords').isHidden());await page.locator('#next').click();await position(25);
  await goto('chapter=foundations&q=24');await page.locator('#next').click();await position(40);
  await page.evaluate(()=>LearningProgress.put(ProgressModel.KEYS.practice,{answers:{24:{correct:false,selected:['A']}},stars:[],last:1}));
  await goto('mode=wrong');assert.equal(await page.evaluate(()=>mode),'wrong');assert.deepEqual(await page.evaluate(()=>pool.map(q=>q.id)),[24]);
  assert.deepEqual(errors,[]);
  console.log('Short practice passed: bounded sets, hidden cues, mobile layout, refresh, skip without grading, end/flash return, empty lessons, chapter and full-bank order.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
