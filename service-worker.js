const CACHE_NAME = 'juju-fun-world-v50'; // version marchesam

const urlsToCache = [
    '/juju-fun-game-world/',
    '/juju-fun-game-world/index.html?v=49',       
    '/juju-fun-game-world/manifest.json?v=49',    
    '/juju-fun-game-world/dashboard.html?v=49', 
    '/juju-fun-game-world/profile.html?v=49',
    '/juju-fun-game-world/spell-it.html', 
    '/juju-fun-game-world/juju-car-race.html',
    '/juju-fun-game-world/balloon-pop-edu.html?v=156',
    '/juju-fun-game-world/temple-run.html',
    '/juju-fun-game-world/fruits.html',           
    '/juju-fun-game-world/pet-animals.html',      
    '/juju-fun-game-world/wild-animals.html',     
    '/juju-fun-game-world/vegetables.html',       
    '/juju-fun-game-world/vehicles.html',         
    '/juju-fun-game-world/matching.html',
    '/juju-fun-game-world/drag-drop.html?v=156',
    '/juju-fun-game-world/addition.html',
    '/juju-fun-game-world/alphabets.html',
    '/juju-fun-game-world/numbers.html',
    '/juju-fun-game-world/painting.html',
    '/juju-fun-game-world/free-draw.html',
    '/juju-fun-game-world/rhymes.html?v=139',
    '/juju-fun-game-world/body-parts.html',       
    '/juju-fun-game-world/colors.html',           
    '/juju-fun-game-world/color-mixing.html',     
    '/juju-fun-game-world/shapes.html',
    '/juju-fun-game-world/icon-192.png',
    '/juju-fun-game-world/icon-512.png',
    '/juju-fun-game-world/twinkle-twinkle.mp3',
    '/juju-fun-game-world/baa-baa-black.mp3',
    '/juju-fun-game-world/wheels-on-bus.mp3',
    '/juju-fun-game-world/you-are-my-sunshine.mp3',
    '/juju-fun-game-world/johnny-johnny.mp3',
    '/juju-fun-game-world/humpty-dumpty.mp3',
    '/juju-fun-game-world/ring-ring-roses.mp3',
    '/juju-fun-game-world/abc-rhyme.mp3'
];

// assets folder unte tarvatha add cheddam. Ippudu basic tho test cheddam

self.addEventListener('install', (event) => {
    self.skipWaiting(); 
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            // cache.addAll badulu - 1 file fail ayina skip chestundi
            return Promise.all(
                urlsToCache.map(url => 
                    cache.add(url).catch(err => console.log('Skipped:', url))
                )
            )
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.filter((cacheName) => cacheName !== CACHE_NAME)
                   .map((cacheName) => caches.delete(cacheName))
            );
        }).then(() => self.clients.claim())
    );
});

// Cache First - offline kosam best
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
