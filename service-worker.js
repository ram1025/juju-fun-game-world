const CACHE_NAME = 'juju-v111-cache-first';
const urlsToCache = [
  './',
  './index.html',
  './dashboard.html',
  './profile.html',
  './manifest.json?v=111',
  './icon-192.png',
  './icon-512.png',
  './style.css',
  // ALL GAMES
  './addition.html',
  './alphabets.html',
  './balloon-pop-edu.html',
  './body-parts.html',
  './juju-car-race.html',
  './color-mixing.html',
  './colors.html',
  './drag-drop.html',
  './free-draw.html',
  './fruits.html',
  './matching.html',
  './numbers.html',
  './painting.html',
  './pet-animals.html',
  './rhymes.html',
  './shapes.html',
  './spell-it.html',
  './temple-run.html',
  './vehicles.html',
  './vegetables.html',
  './wild-animals.html',
  './connect-dots.html',
  // ALL 8 RHYMES - SPELLING FIXED
  './abc-rhyme.mp3',
  './baa-baa-black.mp3',
  './humpty-dumpty.mp3', // FIXED: dummpy-dumpty -> dumpty
  './johnny-johnny.mp3',
  './ring-ring-roses.mp3',
  './twinkle-twinkle.mp3',
  './wheels-on-bus.mp3',
  './you-are-my-sunshine.mp3'
];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Caching app shell and rhymes');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if(key !== CACHE_NAME) {
          console.log('[SW] Deleting old cache:', key);
          return caches.delete(key);
        }
      })
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = e.request.url;

  // MP3 FILES - Cache first
  if(url.endsWith('.mp3')){
    e.respondWith(
      caches.match(e.request).then(cached => {
        return cached || fetch(e.request).then(res => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(e.request, res.clone());
            return res;
          });
        });
      }).catch(() => new Response('Audio not available offline', {status: 404}))
    );
    return;
  }

  // OTHER FILES - Cache first
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request).catch(() => {
        return caches.match('./index.html');
      });
    })
  );
});
