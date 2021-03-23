/* eslint-disable no-undef */
function startServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').then((registration) => {
                console.info('ServiceWorker registration successful with scope: ', registration.scope);
            }).catch((error) => {
                console.error('ServiceWorker registration failed: ', error);
            });
        });
    }
}

startServiceWorker();
