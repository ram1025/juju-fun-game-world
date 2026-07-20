const CACHE_NAME = 'juju-fun-game-world-v59';

// APP LO UNNA ANNI 24 FILES LIST IKKADA
const urlsToCache = [
    '/juju-fun-game-world/',
    '/juju-fun-game-world/index.html',
    '/juju-fun-game-world/dashboard.html',
    '/juju-fun-game-world/manifest.json',
    '/juju-fun-game-world/icon-192.png',
    '/juju-fun-game-world/icon-512.png',

    // All 24 Pages
    '/juju-fun-game-world/alphabets.html',
    '/juju-fun-game-world/numbers.html',
    '/juju-fun-game-world/colors.html',
    '/juju-fun-game-world/shapes.html',
    '/juju-fun-game-world/animals.html',
    '/juju-fun-game-world/fruits.html',
    '/juju-fun-game-world/vehicles.html',
    '/juju-fun-game-world/rhymes.html',
    '/juju-fun-game-world/stories.html',
    '/juju-fun-game-world/games.html',
    '/juju-fun-game-world/drawing.html',
    '/juju-fun-game-world/music.html',
    '/juju-fun-game-world/puzzles.html',
    '/juju-fun-game-world/memory.html',
    '/juju-fun-game-world/matching.html',
    '/juju-fun-game-world/quiz.html',
    '/juju-fun-game-world/tracing.html',
    '/juju-fun-game-world/coding.html',
    '/juju-fun-game-world/dance.html',
    
    // 8 Rhymes MP3
    '/juju-fun-game-world/twinkle-twinkle.mp3',
    '/juju-fun-game-world/baa-baa-black.mp3',
    '/juju-fun-game-world/wheels-on-bus.mp3',
    '/juju-fun-game-world/you-are-my-sunshine.mp3',
    '/juju-fun-game-world/johnny-johnny.mp3',
    '/juju-fun-game-world/humpty-dumpty.mp3',
    '/juju-fun-game-world/ring-ring-roses.mp3',
    '/juju-fun-game-world/abc-rhyme.mp3'
];

// Install: anni okesari cache
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Activate: purana cache delete
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

// Fetch: cache first
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
