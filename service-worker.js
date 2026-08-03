const CACHE_NAME = 'juju-v112-03-cache-first';
const APP_SHELL = [
  './',
  './index.html',
  './dashboard.html',
  './profile.html',
  './manifest.json?v=112-03',
  './icon-192.png',
  './icon-512.png',
  './style.css',
  './addition.html', './alphabets.html', './balloon-pop-edu.html', './body-parts.html',
  './juju-car-race.html', './color-mixing.html', './colors.html', './drag-drop.html',
  './free-draw.html', './fruits.html', './matching.html', './numbers.html',
  './painting.html', './pet-animals.html', './rhymes.html', './shapes.html',
  './spell-it.html', './temple-run.html', './vehicles.html', './vegetables.html',
  './wild-animals.html', './connect-dots.html'
];

const RHYMES = [
  './abc-rhyme.mp3', './baa-baa-black.mp3', './humpty-dumpty.mp3', 
  './johnny-johnny.mp3', './ring-ring-roses.mp3', './twinkle-twinkle.mp3',
  './wheels-on-bus.mp3', './you-are-my-sunshine.mp3'
];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      console.log('[SW] Caching App Shell');
      // App shell ni 1 by 1 cache chey. Fail ayina skip chey
      await Promise.allSettled(
        APP_SHELL.map(url => 
          fetch(url, {cache: 'no-cache'}).then(res => res.ok && cache.put(url, res))
        )
      );

      console.log('[SW] Caching Rhymes');
      // Rhymes ni 1 by 1 cache chey
      await Promise.allSettled(
        RHYMES.map(url => 
          fetch(url, {cache: 'no-cache'}).then(res => res.ok && cache.put(url, res))
        )
      );
    })
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

// Network first with cache fallback
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => {
      return cached || fetch(e.request).catch(() => {
        // Offline and not in cache
        if(e.request.destination === 'document'){
          return caches.match('./index.html');
        }
        return new Response('Offline', {status: 503});
      });
    })
  );
});
