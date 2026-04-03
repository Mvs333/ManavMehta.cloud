const CACHE_NAME = 'manav-den-v5';
const assets = [
  './',
  './index.html',
  './manavm.jpg',
  './manifest.json'
];

// Install: Only cache local files to avoid CORS errors
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching local assets');
      return cache.addAll(assets);
    })
  );
});

// Activate: Clean up old versions
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }));
    })
  );
});

// Fetch: Network first, fallback to cache
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
