const CACHE_NAME = 'juju-fun-world-v46-1';
const BASE = '/juju-fun-game-world/';

const urlsToCache = [
    BASE,
    BASE + 'index.html?v=46',       
    BASE + 'manifest.json?v=46',    
    
    // Pages
    BASE + 'dashboard.html?v=46', 
    BASE + 'profile.html?v=46',
    BASE + 'spell-it.html', 
    BASE + 'juju-car-race.html',
    BASE + 'balloon-pop-edu.html?v=156',
    BASE + 'temple-run.html',
    BASE + 'fruits.html',           
    BASE + 'pet-animals.html',      
    BASE + 'wild-animals.html',     
    BASE + 'vegetables.html',       
    BASE + 'vehicles.html',         
    BASE + 'matching.html',
    BASE + 'drag-drop.html?v=156',
    BASE + 'addition.html',
    BASE + 'alphabets.html',
    BASE + 'numbers.html',
    BASE + 'painting.html',
    BASE + 'free-draw.html',
    BASE + 'rhymes.html?v=139',
    BASE + 'body-parts.html',       
    BASE + 'colors.html',           
    BASE + 'color-mixing.html',     
    BASE + 'shapes.html',

    // Icons
    BASE + 'icon-192.png',
    BASE + 'icon-512.png',

    // Rhymes
    BASE + 'twinkle-twinkle.mp3',
    BASE + 'baa-baa-black.mp3',
    BASE + 'wheels-on-bus.mp3',
    BASE + 'you-are-my-sunshine.mp3',
    BASE + 'johnny-johnny.mp3',
    BASE + 'humpty-dumpty.mp3',
    BASE + 'ring-ring-roses.mp3',
    BASE + 'abc-rhyme.mp3',

    // Assets
    BASE + 'assets/img/a.png',
    BASE + 'assets/img/b.png',
    BASE + 'assets/img/1.png',BASE + 'assets/img/2.png',BASE + 'assets/img/3.png',BASE + 'assets/img/4.png',BASE + 'assets/img/5.png',
    BASE + 'assets/img/6.png',BASE + 'assets/img/7.png',BASE + 'assets/img/8.png',BASE + 'assets/img/9.png',BASE + 'assets/img/10.png',
    BASE + 'assets/img/11.png',BASE + 'assets/img/12.png',BASE + 'assets/img/13.png',BASE + 'assets/img/14.png',BASE + 'assets/img/15.png',
    BASE + 'assets/img/16.png',BASE + 'assets/img/17.png',BASE + 'assets/img/18.png',BASE + 'assets/img/19.png',BASE + 'assets/img/20.png',
    BASE + 'assets/img/logout.png',
    BASE + 'assets/audio/a.mp3',BASE + 'assets/audio/b.mp3',
    BASE + 'assets/audio/number-1.mp3',BASE + 'assets/audio/number-2.mp3',BASE + 'assets/audio/number-3.mp3',BASE + 'assets/audio/number-4.mp3',BASE + 'assets/audio/number-5.mp3',
    BASE + 'assets/audio/number-6.mp3',BASE + 'assets/audio/number-7.mp3',BASE + 'assets/audio/number-8.mp3',BASE + 'assets/audio/number-9.mp3',BASE + 'assets/audio/number-10.mp3',
    BASE + 'assets/audio/number-11.mp3',BASE + 'assets/audio/number-12.mp3',BASE + 'assets/audio/number-13.mp3',BASE + 'assets/audio/number-14.mp3',BASE + 'assets/audio/number-15.mp3',
    BASE + 'assets/audio/number-16.mp3',BASE + 'assets/audio/number-17.mp3',BASE + 'assets/audio/number-18.mp3',BASE + 'assets/audio/number-19.mp3',BASE + 'assets/audio/number-20.mp3',

    // External Font - offline kosam
    'https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&display=swap'
];

// INSTALL
self.addEventListener('install', (event) => {
    self.skipWaiting(); 
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return Promise.all(
                urlsToCache.map(url => 
                    cache.add(url).catch(err => console.log('Failed to cache:', url))
                )
            )
        })
    );
});

// ACTIVATE - Old cache delete
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

// FETCH - Network First, fallback to cache
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});
