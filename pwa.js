(() => {
  'use strict';
  const appRoot = new URL('./', document.currentScript.src);
  const standalone = window.matchMedia('(display-mode: standalone)');
  let installEvent = null;
  let installed = false;
  let installing = false;
  const entry = document.createElement('div');
  entry.className = 'pwa-entry';
  entry.innerHTML = '<button id="pwaInstall" type="button">安装应用</button>';
  const button = entry.querySelector('button');
  const dialog = document.createElement('dialog');
  dialog.id = 'pwaHelp';
  dialog.className = 'pwa-help';
  dialog.setAttribute('aria-labelledby', 'pwaHelpTitle');
  dialog.innerHTML = `<div class="pwa-help-top"><h2 id="pwaHelpTitle">把学习手册放到桌面</h2><button id="pwaClose" type="button" aria-label="关闭安装说明">关闭</button></div>
    <p>像应用一样直接打开，每次接着学一点。</p>
    <button id="pwaConfirmInstall" type="button" hidden>安装 SAP 学习手册</button>
    <p id="pwaInstallStatus" role="status">没有自动弹窗也可以手动安装：</p>
    <ol><li><b>电脑 Chrome：</b>右上角 ⋮ →「投放、保存和分享」→「将网页安装为应用」。也可使用地址栏右侧的安装图标。</li><li><b>安卓 Chrome：</b>右上角 ⋮ →「安装并创建快捷方式」（部分版本为「添加到主屏幕」）→「安装」。</li><li><b>iPhone / iPad：</b>用 Safari 打开本站 → 分享 →「添加到主屏幕」。</li></ol>
    <p class="pwa-help-note">请在 Chrome 或 Safari 的普通窗口中打开本站；无痕模式或应用内的网页窗口可能没有安装功能。浏览器会自行决定何时显示安装提示。</p>
    <p class="pwa-help-note">安装后仍需联网加载学习内容和同步账号。当前浏览器中的进度继续保留；换浏览器或设备，请登录同一账号同步。</p>`;
  document.body.append(dialog);
  const host = document.querySelector('.study-topbar nav, .topbar nav, .account-topbar nav, .guide-nav') || document.querySelector('body > header');
  if (host) {
    host.classList.add('pwa-install-host');
    host.append(entry);
  } else {
    entry.classList.add('pwa-entry-row');
    (document.querySelector('.container') || document.body).prepend(entry);
  }
  const confirm = dialog.querySelector('#pwaConfirmInstall');
  const status = dialog.querySelector('#pwaInstallStatus');
  function inApp() { return installed || standalone.matches || navigator.standalone === true; }
  function update() {
    entry.hidden = inApp();
    button.disabled = installing;
    button.textContent = installing ? '正在安装…' : '安装应用';
    button.dataset.ready = String(Boolean(installEvent));
    confirm.hidden = !installEvent || inApp();
    confirm.disabled = installing;
    if (inApp() && dialog.open) dialog.close();
  }
  function showHelp(message) {
    if (message) status.textContent = message;
    if (!dialog.open) dialog.showModal();
  }
  async function requestInstall() {
    if (inApp() || installing) return;
    if (!installEvent) { showHelp(); return; }
    const prompt = installEvent;
    installEvent = null;
    installing = true;
    update();
    try {
      await prompt.prompt();
      const choice = await prompt.userChoice;
      installing = choice.outcome === 'accepted' && !installed;
      if (choice.outcome !== 'accepted') showHelp('已取消本次安装，学习不受影响。以后也可以从浏览器菜单安装。');
      else status.textContent = '正在完成安装，请按浏览器提示操作。';
    } catch {
      installing = false;
      showHelp('浏览器暂时无法弹出安装窗口，可以按下面的方法手动安装。');
    }
    update();
  }
  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    installEvent = event;
    installing = false;
    status.textContent = '浏览器已准备好，点击上方按钮即可安装。';
    update();
  });
  window.addEventListener('appinstalled', () => {
    installed = true;
    installing = false;
    installEvent = null;
    update();
  });
  standalone.addEventListener('change', update);
  button.addEventListener('click', requestInstall);
  confirm.addEventListener('click', requestInstall);
  dialog.querySelector('#pwaClose').addEventListener('click', () => dialog.close());
  update();
  if ('serviceWorker' in navigator && window.isSecureContext) {
    navigator.serviceWorker.register(new URL('sw.js', appRoot).href, { scope: appRoot.href, updateViaCache: 'none' }).catch(() => {
      // Installation help and online learning remain available if registration is blocked.
    });
  }
})();
