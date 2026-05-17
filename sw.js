const CACHE = 'wildman-coffee-v5.2';
const ASSETS = ['/'];

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// 永遠從網路抓 index.html，不使用快取
self.addEventListener('fetch', e => {
  if (e.request.url.includes('firestore') ||
      e.request.url.includes('firebase') ||
      e.request.url.includes('googleapis') ||
      e.request.url.includes('anthropic') ||
      e.request.url.includes('unpkg.com')) return;

  if (e.request.url.endsWith('/') || e.request.url.includes('index.html')) {
    e.respondWith(fetch(e.request, { cache: 'no-store' }).catch(() => caches.match('/')));
    return;
  }

  e.respondWith(fetch(e.request).catch(() => caches.match('/')));
});
