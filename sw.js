const CACHE = 'wildman-coffee-v5.3';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  // 清除所有舊快取
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
  );
  self.clients.claim();
});

// 完全不快取，每次都從網路抓
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request, { cache: 'no-store' }).catch(() => {
      return new Response('請確認網路連線後重新整理', { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    })
  );
});
