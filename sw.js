const cacheName = 'gulümse-cache-v1';
const filesToCache = [
  'index.html',
  'manifest.json',
  'content.json',
  'icon.png'
];

// Yükleme sırasında dosyaları cache'le
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(filesToCache);
    })
  );
  self.skipWaiting(); // yeni servis worker hemen aktif olsun
});

// İstekleri cache'den veya ağdan getir
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});