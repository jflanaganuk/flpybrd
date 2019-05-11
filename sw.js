const cacheName = 'cache-v1';
const resourcesToPrecache = [
    '/',
    'index.html',
    'script.js',
    'images/bg.png',
    'images/bird.png',
    'images/fg.png',
    'images/pipeNorth.png',
    'images/pipeSouth.png',
    'sound/fly.mp3',
    'sound/score.mp3'
];

self.addEventListener('install', event => {
    console.log('🎉 Service Worker install event!');
    event.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            resourcesToPrecache.map((resource) => {
                cache.add(resource)
                .catch(err => console.error(err));
            });
            return cache;
        })
    );
})

self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request)
        .then(cachedResponse => {
            return cachedResponse || fetch(event.request);
        })
    );
});