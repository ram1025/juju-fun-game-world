const CACHE_NAME = 'juju-fun-world-v55';

const urlsToCache = [
    '/juju-fun-game-world/',
    '/juju-fun-game-world/index.html?v=55',       
    '/juju-fun-game-world/manifest.json?v=55',    
    '/juju-fun-game-world/dashboard.html?v=55', 
    '/juju-fun-game-world/profile.html?v=55',
    '/juju-fun-game-world/spell-it.html?v=55',
    '/juju-fun-game-world/juju-car-race.html?v=55',
    '/juju-fun-game-world/balloon-pop-edu.html?v=55',
    '/juju-fun-game-world/temple-run.html?v=55',
    '/juju-fun-game-world/fruits.html?v=55',           
    '/juju-fun-game-world/pet-animals.html?v=55',      
    '/juju-fun-game-world/wild-animals.html?v=55',     
    '/juju-fun-game-world/vegetables.html?v=55',       
    '/juju-fun-game-world/vehicles.html?v=55',         
    '/juju-fun-game-world/matching.html?v=55',
    '/juju-fun-game-world/drag-drop.html?v=55',
    '/juju-fun-game-world/addition.html?v=55',
    '/juju-fun-game-world/alphabets.html?v=55',
    '/juju-fun-game-world/numbers.html?v=55',
    '/juju-fun-game-world/painting.html?v=55',
    '/juju-fun-game-world/free-draw.html?v=55',
    '/juju-fun-game-world/rhymes.html?v=55',
    '/juju-fun-game-world/body-parts.html?v=55',       
    '/juju-fun-game-world/colors.html?v=55',           
    '/juju-fun-game-world/color-mixing.html?v=55',     
    '/juju-fun-game-world/shapes.html?v=55',
    '/juju-fun-game-world/icon-192.png',
    '/juju-fun-game-world/icon-512.png',
    
    // ===== 8 RHYMES MP3 =====
    '/juju-fun-game-world/twinkle-twinkle.mp3',
    '/juju-fun-game-world/baa-baa-black.mp3',
    '/juju-fun-game-world/wheels-on-bus.mp3',
    '/juju-fun-game-world/you-are-my-sunshine.mp3',
    '/juju-fun-game-world/johnny-johnny.mp3',
    '/juju-fun-game-world/humpty-dumpty.mp3',
    '/juju-fun-game-world/ring-ring-roses.mp3',
    '/juju-fun-game-world/abc-rhyme.mp3'
];

self.addEventListener('install', (event) => {
    self.skipWaiting(); 
    event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
        .then(() => self.clients.claim())
    );
});

// 🔥 IDHE MAGIC: Cache First + Auto Save
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then(cached => {
            return cached || fetch(event.request).then(res => {
                // network nunchi vaste ventane cache lo veyyi
                return caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, res.clone());
                    return res;
                });
            }).catch(()=>caches.match('/juju-fun-game-world/index.html?v=55'));
        })
    );
});
