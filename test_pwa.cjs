const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const http=require('node:http'),fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const root=__dirname;
const pages=['index.html','path/index.html','learn/index.html','review/index.html','account/index.html','glossary/index.html','choice/index.html','multi/index.html','exam/index.html','disputed/index.html'];
const project='/aws-sap-c02-practice/';
const mime={'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.webmanifest':'application/manifest+json','.json':'application/json','.svg':'image/svg+xml','.png':'image/png'};
let apiReads=0;
const server=http.createServer((req,res)=>{
 let pathname;try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400).end();return;}
 if(pathname.startsWith(project))pathname=pathname.slice(project.length-1);
 if(pathname==='/pwa-test-api'){res.writeHead(200,{'Content-Type':'application/json'}).end(JSON.stringify({reads:++apiReads}));return;}
 if(pathname==='/account_config.js'){res.writeHead(200,{'Content-Type':'application/javascript'}).end('window.SAP_ACCOUNT_CONFIG={apiBase:""};');return;}
 let file=path.resolve(root,'.'+pathname);if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
 if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
 fs.readFile(file,(error,body)=>{if(error){res.writeHead(404).end('Not found');return;}res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'}).end(body);});
});

(async()=>{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const origin='http://127.0.0.1:'+server.address().port;
 const browser=await chromium.launch({headless:true,...(process.env.SAP_TEST_CHROMIUM?{executablePath:process.env.SAP_TEST_CHROMIUM}:{})});
 const errors=[],profiles=[],nativePromptReady=[];let persistent=null;
 try{
  for(const mount of ['/',project]){
   const profile=fs.mkdtempSync(path.join(os.tmpdir(),'sap-pwa-browser-'));profiles.push(profile);
   const base=origin+mount,context=await chromium.launchPersistentContext(profile,{headless:true,viewport:{width:390,height:844},...(process.env.SAP_TEST_CHROMIUM?{executablePath:process.env.SAP_TEST_CHROMIUM}:{})});persistent=context;const page=await context.newPage();
   page.on('pageerror',e=>errors.push(e.message));
   for(const route of pages){
    await page.goto(base+route);await page.waitForLoadState('networkidle');
    assert.equal(await page.locator('link[rel="manifest"]').count(),1,route+' needs one manifest');
    assert.equal(await page.locator('link[rel="manifest"]').evaluate(link=>link.href),base+'manifest.webmanifest');
    assert.equal(await page.locator('meta[name="theme-color"]').count(),1);
   }
   await page.goto(base+'path/index.html');await page.waitForLoadState('networkidle');
   const cdp=await context.newCDPSession(page),appManifest=await cdp.send('Page.getAppManifest');
   assert.equal(appManifest.url,base+'manifest.webmanifest');assert.deepEqual(appManifest.errors,[]);
   const manifest=JSON.parse(appManifest.data);
   assert.equal(new URL(manifest.scope,appManifest.url).href,base);assert.equal(new URL(manifest.start_url,appManifest.url).href,base+'path/index.html');
   assert.equal(manifest.display,'standalone');assert.equal(manifest.lang,'zh-CN');
   for(const size of ['192x192','512x512']){
    const icon=manifest.icons.find(icon=>icon.sizes===size&&(!icon.purpose||icon.purpose.split(' ').includes('any')));assert(icon,'missing regular icon '+size);
    assert.deepEqual(await page.evaluate(src=>new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>resolve([img.naturalWidth,img.naturalHeight]);img.onerror=reject;img.src=src;}),new URL(icon.src,appManifest.url).href),size.split('x').map(Number));
   }
   await page.evaluate(()=>navigator.serviceWorker.ready);
   await page.waitForFunction(()=>navigator.serviceWorker.controller!==null);
   assert.equal(await page.evaluate(async()=>(await navigator.serviceWorker.ready).scope),base);
   const installability=await cdp.send('Page.getInstallabilityErrors');
   assert.deepEqual(installability.installabilityErrors,[],'real Chromium installability checks at '+mount);
   await page.evaluate(()=>localStorage.setItem('pwa-test-progress','kept'));
   const previousReads=apiReads;assert.equal((await page.evaluate(async url=>(await fetch(url)).json(),base+'pwa-test-api')).reads,previousReads+1);
   const cachedURLs=await page.evaluate(async()=>{const urls=[];for(const key of await caches.keys()){for(const request of await(await caches.open(key)).keys())urls.push(request.url);}return urls;});
   assert(cachedURLs.some(url=>url===base+'offline.html'));
   assert(cachedURLs.every(url=>url===base+'offline.html'||url.startsWith(base+'icons/')),'only static offline shell assets may be cached');
   await context.setOffline(true);await page.goto(base+'learn/index.html#networking');
   assert((await page.locator('body').innerText()).includes('联网'),'offline fallback explains reconnect requirement');
   assert.equal(await page.evaluate(()=>localStorage.getItem('pwa-test-progress')),'kept');
   const apiOffline=await page.evaluate(async url=>{try{await fetch(url);return true;}catch{return false;}},base+'pwa-test-api');assert.equal(apiOffline,false,'API responses are never served from offline cache');
   await context.setOffline(false);await page.reload();await page.waitForLoadState('networkidle');
   assert.equal(await page.locator('#chapterPractice .study-question-links a').count(),5);
   await page.locator('#chapterPractice .primary-link').click();await page.waitForLoadState('networkidle');
   assert.equal(await page.evaluate(()=>PRACTICE_QUESTIONS.length),5);
   for(let i=0;i<5;i++)await page.locator('#next').click();assert(await page.locator('#batchCompletion').isVisible());
   assert.equal(await page.locator('#batchNextChapter').getAttribute('href'),'learn/index.html#compute');
   nativePromptReady.push({mount,ready:await page.locator('#pwaInstall').getAttribute('data-ready')});
   await context.close();persistent=null;
  }
  console.log('Chromium installability, scope and offline checks passed at both mounts; native event readiness: '+JSON.stringify(nativePromptReady));
  // Native dialogs need user choice; use controlled events to test the app's button lifecycle.
  const uiContext=await browser.newContext({viewport:{width:390,height:844}});
  await uiContext.addInitScript(()=>{window.__testPromptCount=0;window.addEventListener('beforeinstallprompt',event=>{if(event.isTrusted){event.preventDefault();event.stopImmediatePropagation();}});});
  const ui=await uiContext.newPage();ui.on('pageerror',error=>errors.push(error.message));
  await ui.goto(origin+'/index.html');await ui.waitForLoadState('networkidle');
  assert.equal(await ui.locator('#pwaInstall').getAttribute('data-ready'),'false');
  await ui.locator('#pwaInstall').click();assert(await ui.locator('#pwaHelp').isVisible());assert(await ui.locator('#pwaConfirmInstall').isHidden());
  assert((await ui.locator('#pwaHelp').innerText()).includes('浏览器会自行决定'));
  await ui.locator('#pwaClose').click();assert(await ui.locator('#pwaHelp').isHidden());
  async function promptEvent(outcome){return ui.evaluate(outcome=>{const event=new Event('beforeinstallprompt',{cancelable:true});Object.defineProperties(event,{prompt:{value:async()=>{window.__testPromptCount++;}},userChoice:{value:Promise.resolve({outcome})}});window.dispatchEvent(event);return event.defaultPrevented;},outcome);}
  assert(await promptEvent('dismissed'));assert.equal(await ui.evaluate(()=>window.__testPromptCount),0,'receiving an install event never prompts automatically');
  assert.equal(await ui.locator('#pwaInstall').getAttribute('data-ready'),'true');
  await ui.locator('#pwaInstall').click();await ui.waitForFunction(()=>document.getElementById('pwaInstallStatus').textContent.includes('已取消'));
  assert.equal(await ui.evaluate(()=>window.__testPromptCount),1);assert.equal(await ui.locator('#pwaInstall').getAttribute('data-ready'),'false');
  assert(await ui.locator('#pwaConfirmInstall').isHidden());await ui.locator('#pwaClose').click();await ui.locator('#pwaInstall').click();assert.equal(await ui.evaluate(()=>window.__testPromptCount),1,'a consumed event is never reused');
  assert(await promptEvent('accepted'));assert(await ui.locator('#pwaConfirmInstall').isVisible());
  await ui.locator('#pwaConfirmInstall').click();assert.equal(await ui.evaluate(()=>window.__testPromptCount),2);assert(await ui.locator('#pwaInstall').isDisabled());
  await ui.evaluate(()=>window.dispatchEvent(new Event('appinstalled')));assert(await ui.locator('#pwaInstall').isHidden());assert(await ui.locator('#pwaHelp').isHidden());
  for(const width of [390,320]){
   await ui.setViewportSize({width,height:844});
   for(const route of ['index.html','path/index.html','learn/index.html','review/index.html']){
    await ui.goto(origin+'/'+route);await ui.waitForLoadState('networkidle');
    assert(await ui.locator('#pwaInstall').isVisible());
    if(route==='review/index.html'){assert(await ui.evaluate(()=>{const entry=document.querySelector('.pwa-entry'),withEntry=document.documentElement.scrollWidth;entry.hidden=true;const baseline=document.documentElement.scrollWidth;entry.hidden=false;return withEntry<=baseline;}),'install entry must not add overflow to the existing review layout');}
    else assert(await ui.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'install entry should fit '+route+' at '+width);
    if(route==='review/index.html')await ui.locator('#menuBtn').click();
    if(width===390)await ui.screenshot({path:path.join(os.tmpdir(),'sap-pwa-'+route.split('/')[0].replace('.html','')+'-mobile.png')});
    await ui.locator('#pwaInstall').click();assert(await ui.locator('#pwaHelp').isVisible());
    assert(await ui.locator('#pwaHelp').evaluate(dialog=>dialog.scrollWidth<=dialog.clientWidth),'help should not overflow horizontally');
    if(width===320&&route==='index.html')await ui.screenshot({path:path.join(os.tmpdir(),'sap-pwa-help-mobile.png')});
    await ui.keyboard.press('Escape');assert(await ui.locator('#pwaHelp').isHidden());
   }
  }
  await uiContext.close();
  const standalone=await browser.newContext();await standalone.addInitScript(()=>Object.defineProperty(navigator,'standalone',{value:true}));
  const standalonePage=await standalone.newPage();standalonePage.on('pageerror',error=>errors.push(error.message));await standalonePage.goto(origin+'/path/index.html');await standalonePage.waitForLoadState('networkidle');
  assert(await standalonePage.locator('#pwaInstall').isHidden());assert(await standalonePage.locator('#pwaHelp').isHidden());await standalone.close();
  assert.deepEqual(errors,[]);
  console.log('Native install event readiness during this short smoke: '+JSON.stringify(nativePromptReady)+' (no OS installation attempted).');
  console.log('PWA passed: every page and subpath manifest, real Chromium installability, icon sizes, worker scope, offline fallback, uncached API, saved local progress, bounded chapter practice, click-only install lifecycle, cancel/retry, standalone hiding, and 320/390px layout.');
 }finally{if(persistent)await persistent.close();await browser.close();for(const profile of profiles)fs.rmSync(profile,{recursive:true,force:true});await new Promise(resolve=>server.close(resolve));}
})().catch(error=>{console.error(error);server.close();process.exitCode=1;});
