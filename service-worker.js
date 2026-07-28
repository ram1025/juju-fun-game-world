const CACHE_NAME = 'juju-v108-force';
const urlsToCache = [
  './',
  './dashboard.html',
  './rhymes.html',
  './manifest.json?v=108',
  './twinkle-twinkle.mp3',
  './baa-baa-black.mp3',
  './wheels-on-bus.mp3',
  './you-are-my-sunshine.mp3',
  './johnny-johnny.mp3',
  './humpty-dumpty.mp3',
  './ring-ring-roses.mp3',
  './abc-rhyme.mp3',
  './icon-512.png'
];

// Install - anni files cache chey
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Activate - old cache delete
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.map(key => {
        if(key !== CACHE_NAME) return caches.delete(key);
      }))
    )
  );
  self.clients.claim();
});

// Fetch - MP3 ki correct header tho ivvadam IDHE KEY
self.addEventListener('fetch', event => {
  if(event.request.url.endsWith('.mp3')){
    event.respondWith(
      caches.match(event.request).then(response => {
        if(response){
          // Cache nunchi teeskoni correct header tho malli ivvu
          return response.blob().then(blob => {
            return new Response(blob, {
              headers: {'Content-Type': 'audio/mpeg'}
            });
          });
        }
        return fetch(event.request);
      })
    );
    return;
  }
  
  // Migata files normal cache-first
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
