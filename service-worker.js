const CACHE_NAME = 'juju-fun-world-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/img/logo.png',
  '/assets/img/icon-192.png',
  '/assets/img/icon-512.png',
  '/assets/audio/a.mp3',
  '/assets/audio/b.mp3',
  '/manifest.json',
  '/assets/css/style.css',
  '/assets/js/script.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      );
    }).then(() => self.clients.climate())
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
