const CACHE_NAME = 'juju-v102-cache-first';
const urlsToCache = [
    '/juju-fun-game-world/',
    '/juju-fun-game-world/index.html',
    '/juju-fun-game-world/dashboard.html',
    '/juju-fun-game-world/manifest.json',
    '/juju-fun-game-world/icon-192.png',
    '/juju-fun-game-world/icon-512.png',

    '/juju-fun-game-world/addition.html',
    '/juju-fun-game-world/alphabets.html',
    '/juju-fun-game-world/balloon-pop-edu.html',
    '/juju-fun-game-world/body-parts.html',
    '/juju-fun-game-world/juju-car-race.html',
    '/juju-fun-game-world/color-mixing.html',
    '/juju-fun-game-world/colors.html',
    '/juju-fun-game-world/drag-drop.html',
    '/juju-fun-game-world/free-draw.html',
    '/juju-fun-game-world/fruits.html',
    '/juju-fun-game-world/matching.html',
    '/juju-fun-game-world/numbers.html',
    '/juju-fun-game-world/paint-letter.html',
    '/juju-fun-game-world/pet-animals.html',
    '/juju-fun-game-world/rhymes.html',
    '/juju-fun-game-world/shapes.html',
    '/juju-fun-game-world/spell-it.html',
    '/juju-fun-game-world/temple-run.html',
    '/juju-fun-game-world/vehicles.html',
    '/juju-fun-game-world/vegetables.html',
    '/juju-fun-game-world/wild-animals.html',
    '/juju-fun-game-world/4-peices-puzzle.html',      // <-- IDI OKATE ADD CHEYYI
    '/juju-fun-game-world/twinkle-twinkle.mp3',
    '/juju-fun-game-world/baa-baa-black.mp3',
    '/juju-fun-game-world/wheels-on-bus.mp3',
    '/juju-fun-game-world/you-are-my-sunshine.mp3',
    '/juju-fun-game-world/johnny-johnny.mp3',
    '/juju-fun-game-world/humpty-dumpty.mp3',
    '/juju-fun-game-world/ring-ring-roses.mp3',
    '/juju-fun-game-world/abc-rhyme.mp3'
];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

// KEY FIX: MUNDU CACHE LO CHUDU. LEKAPOTHE MATREME NETWORK
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cachedResponse => {
      return cachedResponse || fetch(e.request);
    })
  );
});
