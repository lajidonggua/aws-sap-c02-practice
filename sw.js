/* Only an offline notice is cached. Lessons, scripts and account responses stay on the network. */
const SCOPE_URL = new URL(self.registration.scope);
const CACHE_PREFIX = 'sap-c02-offline:' + SCOPE_URL.pathname + ':';
const CACHE_NAME = CACHE_PREFIX + 'v1';
const OFFLINE_URL = new URL('offline.html', SCOPE_URL).href;

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.add(new Request(OFFLINE_URL, { cache: 'reload' }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || request.mode !== 'navigate' || url.origin !== SCOPE_URL.origin || !url.pathname.startsWith(SCOPE_URL.pathname)) return;
  event.respondWith((async () => {
    try {
      return await fetch(request);
    } catch {
      const cache = await caches.open(CACHE_NAME);
      return await cache.match(OFFLINE_URL) || new Response('<!doctype html><html lang="zh-CN"><meta charset="utf-8"><title>暂时无法连接</title><h1>请连接网络后重试</h1><p>已保存的本机学习记录不会因断网清除。</p></html>', { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    }
  })());
});
