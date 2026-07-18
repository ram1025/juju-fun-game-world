const CACHE_NAME = 'juju-fun-world-v46-1'; // v46 ki marchesa

const urlsToCache = [
    './',
    './index.html?v=46',       
    './manifest.json?v=46',    
    
    // Pages - anni v46
    './dashboard.html?v=46', 
    './profile.html?v=46',
    './spell-it.html', 
    './juju-car-race.html',
    './balloon-pop-edu.html?v=156',
    './temple-run.html',
    './fruits.html',           
    './pet-animals.html',      
    './wild-animals.html',     
    './vegetables.html',       
    './vehicles.html',         
    './matching.html',
    './drag-drop.html?v=156',
    './addition.html',
    './alphabets.html',
    './numbers.html',
    './painting.html',
    './free-draw.html',
    './rhymes.html?v=139',
    './body-parts.html',       
    './colors.html',           
    './color-mixing.html',     
    './shapes.html',

    // Icons
    './icon-192.png',
    './icon-512.png',

    // ===== ALL 8 RHYME MP3s =====
    './twinkle-twinkle.mp3',
    './baa-baa-black.mp3',
    './wheels-on-bus.mp3',
    './you-are-my-sunshine.mp3',
    './johnny-johnny.mp3',
    './humpty-dumpty.mp3',
    './ring-ring-roses.mp3',
    './abc-rhyme.mp3',

    // Assets
    './assets/img/a.png',
    './assets/img/b.png',
    './assets/img/1.png','./assets/img/2.png','./assets/img/3.png','./assets/img/4.png','./assets/img/5.png',
    './assets/img/6.png','./assets/img/7.png','./assets/img/8.png','./assets/img/9.png','./assets/img/10.png',
    './assets/img/11.png','./assets/img/12.png','./assets/img/13.png','./assets/img/14.png','./assets/img/15.png',
    './assets/img/16.png','./assets/img/17.png','./assets/img/18.png','./assets/img/19.png','./assets/img/20.png',
    './assets/img/logout.png',
    './assets/audio/a.mp3','./assets/audio/b.mp3',
    './assets/audio/number-1.mp3','./assets/audio/number-2.mp3','./assets/audio/number-3.mp3','./assets/audio/number-4.mp3','./assets/audio/number-5.mp3',
    './assets/audio/number-6.mp3','./assets/audio/number-7.mp3','./assets/audio/number-8.mp3','./assets/audio/number-9.mp3','./assets/audio/number-10.mp3',
    './assets/audio/number-11.mp3','./assets/audio/number-12.mp3','./assets/audio/number-13.mp3','./assets/audio/number-14.mp3','./assets/audio/number-15.mp3',
    './assets/audio/number-16.mp3','./assets/audio/number-17.mp3','./assets/audio/number-18.mp3','./assets/audio/number-19.mp3','./assets/audio/number-20.mp3'
];

// INSTALL
self.addEventListener('install', (event) => {
    self.skipWaiting(); 
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
    );
});

// ACTIVATE - Old cache anni delete
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

// FETCH - Network First
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});
