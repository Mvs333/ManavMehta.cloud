const CACHE_NAME = 'manav-den-final-v1';
const assets = [
  './',
  './index.html',
  './manavm.jpg',
  './manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // We only cache local files to avoid CORS errors
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request).catch(() => {
        // Fallback if network fails
        return new Response("Offline mode active");
      });
    })
  );
});
