const CACHE_NAME = 'juju-v109-cache-first';
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
    './connect-dots.html'
    // MP3 FILES NI IKKADA NUNCHI TEESANU - install time lo add cheyyadam valla crash avthundi
];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache); // no-cors teesesanu
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
  
  // MP3 KI SPECIAL HANDLING - IDHE FINAL FIX
  if(url.endsWith('.mp3')){
    e.respondWith(
      caches.open(CACHE_NAME).then(cache => 
        cache.match(e.request).then(cached => {
          if(cached){
            // Cache nunchi teesi correct header tho ivvu
            return cached.blob().then(blob => {
              return new Response(blob, {headers: {'Content-Type': 'audio/mpeg'}});
            });
          }
          // Cache lo lekapothe network nunchi teesi cache chey
          return fetch(e.request).then(res => {
            cache.put(e.request, res.clone());
            return res;
          });
        })
      )
    );
    return;
  }
  
  // MIGATA FILES - CACHE FIRST
  e.respondWith(
    caches.match(e.request).then(cachedResponse => {
      return cachedResponse || fetch(e.request).catch(() => {
        return caches.match('./index.html');
      });
    })
  );
});
