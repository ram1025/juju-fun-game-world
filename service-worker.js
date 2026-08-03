const CACHE_NAME = 'juju-v110-cache-first';
const urlsToCache = [
  './',
  './index.html',
  './dashboard.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
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
  './abc-rhyme.mp3',
  './baa-baa-black.mp3',
  './humpty-dummpy-dumpty.mp3',
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
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = e.request.url;

  if(url.endsWith('.mp3')){
    e.respondWith(
      caches.open(CACHE_NAME).then(cache => 
        cache.match(e.request).then(cached => {
          if(cached){
            return cached.blob().then(blob => {
              return new Response(blob, {headers: {'Content-Type': 'audio/mpeg'}});
            });
          }
          return fetch(e.request).then(res => {
            cache.put(e.request, res.clone());
            return res;
          });
        })
      )
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then(cachedResponse => {
      return cachedResponse || fetch(e.request).catch(() => {
        return caches.match('./index.html');
      });
    })
  );
});
