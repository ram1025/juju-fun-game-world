const CACHE_NAME = 'juju-fun-game-world-v58';

const urlsToCache = [
    '/juju-fun-game-world/',
    '/juju-fun-game-world/index.html',
    '/juju-fun-game-world/dashboard.html',
    '/juju-fun-game-world/manifest.json',
    '/juju-fun-game-world/icon-192.png',
    '/juju-fun-game-world/icon-512.png',

    // Rhymes + 8 MP3
    '/juju-fun-game-world/rhymes.html',
    '/juju-fun-game-world/twinkle-twinkle.mp3',
    '/juju-fun-game-world/baa-baa-black.mp3',
    '/juju-fun-game-world/wheels-on-bus.mp3',
    '/juju-fun-game-world/you-are-my-sunshine.mp3',
    '/juju-fun-game-world/johnny-johnny.mp3',
    '/juju-fun-game-world/humpty-dumpty.mp3',
    '/juju-fun-game-world/ring-ring-roses.mp3',
    '/juju-fun-game-world/abc-rhyme.mp3',

    // Migata important pages - 1st time lo ne cache cheyyi
    '/juju-fun-game-world/alphabets.html',
    '/juju-fun-game-world/numbers.html',
    '/juju-fun-game-world/colors.html',
    '/juju-fun-game-world/shapes.html',
    '/juju-fun-game-world/animals.html',
    '/juju-fun-game-world/fruits.html',
    '/juju-fun-game-world/vehicles.html'
];

// Install
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Activate
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Fetch
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request).then(response => {
        if(event.request.url.includes('/juju-fun-game-world/')){
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseClone));
        }
        return response;
      }).catch(() => caches.match('/juju-fun-game-world/index.html'));
    })
  );
});
