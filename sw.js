/* eslint-disable no-undef */
const CACHE_NAME = 'my-site-cache-v1';
const URLS = [
    '/',
    '/bgs.png',
    '/enemies.png',
    '/explosion.png',
    '/game-name.png',
    '/game-over.png',
    '/hero.png',
    '/home-bg.png',
    '/idea.png',
    '/life.png',
    '/loader.png',
    '/index.html',
    '/bundle.js',
    '/sw.js',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
];

this.addEventListener('install', (event) => {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(URLS);
            })
            .catch((err) => {
                console.log('!!!!!!', err);
            }),
    );
});

this.addEventListener('activate', (event) => {
    console.log('activate', event);
});

this.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((res) => {
                const fetchRequest = event.request.clone();

                return new Promise((resolve) => {
                    fetch(fetchRequest)
                        .then((response) => {
                            if (!response || response.status !== 200 || response.type !== 'basic') {
                                return resolve(response);
                            }

                            const responseToCache = response.clone();

                            caches.open(CACHE_NAME)
                                .then((cache) => {
                                    cache.put(event.request, responseToCache);
                                });

                            return resolve(response);
                        })
                        .catch((err) => {
                            if (res) {
                                return resolve(res);
                            }
                            console.log('Something is wrong', err);
                        });
                });
            }),
    );
});
