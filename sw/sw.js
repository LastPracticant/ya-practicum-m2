/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
const STATIC_CACHE_NAME = 's-v1';
const DINAMIC_CACHE_NAME = 'd-v1';
const STATIC_URLS = [
    '/',
    '/app.js',
    '/app.png',
    '/bgs.png',
    '/enemies.png',
    '/explosion.png',
    '/game-over.png',
    '/hero.png',
    '/idea.png',
    '/life.png',
    '/loader.gif',
    '/logo.png',
    '/main.css',
];
const NETWORK_ONLY_STRATEGY_URLS = [
    'auth/signin',
    'auth/signup',
];

self.addEventListener('install', async () => {
    console.info('[SW]: install');

    try {
        const cache = await caches.open(STATIC_CACHE_NAME);
        await cache.addAll(STATIC_URLS);
    } catch (error) {
        console.error('[SW]: error on install', error);
    }
});

self.addEventListener('activate', async () => {
    console.info('[SW]: activate');

    const cacheNames = await caches.keys();

    await Promise.all(
        cacheNames
            .filter((name) => ![STATIC_CACHE_NAME, DINAMIC_CACHE_NAME].includes(name))
            .map((name) => caches.delete(name)),
    );
});

async function cacheFirst(request) {
    const cached = await caches.match(request);

    return cached ?? await fetch(request);
}

async function networkFirst(request) {
    const cache = await caches.open(DINAMIC_CACHE_NAME);
    try {
        const response = await fetch(request);
        await cache.put(request, response.clone());

        return response;
    } catch (e) {
        const cached = await cache.match(request);

        return cached;
    }
}

async function networkOnly(request) {
    try {
        const response = await fetch(request);

        return response;
    } catch (e) {
        console.error(e);
    }
}

function fetchMiddleware(event) {
    const { request } = event;

    const url = new URL(request.url);

    if (url.origin === location.origin && NETWORK_ONLY_STRATEGY_URLS.some((path) => url.pathname.includes(path))) {
        return networkOnly(request);
    }

    if (url.origin === location.origin && url.pathname.includes('api')) {
        // TODO: придумать заглушку для подобных кейсов при offline, если время останется,
        // сейчас SW отрабатывает нормально если пользователь ранее авторизацию проходил,
        // если пользователь не прошел авторизацию, пользоваться сервисом offline он не сможет
        return networkFirst(request);
    }

    if (url.origin === location.origin) {
        return cacheFirst(request);
    }

    return networkFirst(request);
}

self.addEventListener('fetch', (event) => {
    event.respondWith(fetchMiddleware(event));
});
