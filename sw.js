// Your Service Worker. You can use its instance with the keyword `self`
// Example: self.addEventListener(...)

const appShellCacheName = 'app-shell-v1';
const appShellFilesToCache = [
    // TODO: 2a - Declare files and URLs to cache at Service Worker installation
    // CSS
    "assets/css/desktop.css",
    "assets/css/fonts.css",
    "assets/css/mobile.css",
    "assets/css/normalize.css",
    "assets/css/shell.css",

    // FONT
    "assets/fonts/balsamiq-sans-v1-latin-700.woff",
    "assets/fonts/balsamiq-sans-v1-latin-700.woff2",
    "assets/fonts/balsamiq-sans-v1-latin-700italic.woff",
    "assets/fonts/balsamiq-sans-v1-latin-700italic.woff2",
    "assets/fonts/balsamiq-sans-v1-latin-italic.woff",
    "assets/fonts/balsamiq-sans-v1-latin-italic.woff2",
    "assets/fonts/balsamiq-sans-v1-latin-regular.woff",
    "assets/fonts/balsamiq-sans-v1-latin-regular.woff2",

    // JS
    "assets/js/dexie.min.js",
    "assets/js/fontawesome-pro-5.13.0.min.js",
    "assets/js/lazysizes.min.js",
    "assets/js/saved.js",
    "assets/js/search.js",
    "assets/js/trending.js",

    // HTML
    "index.html",
    "saved.html",
    "search.html"
];

const appCaches = [
    appShellCacheName,
];


// TODO: 2b - On install, add app shell files to cache
self.addEventListener('install', async (event) => {
    console.log('[Service Worker] Installation');
    event.waitUntil(
        caches.open(appShellCacheName).then((cache) => {
            return cache.addAll(appShellFilesToCache);
        })
    );
});


// TODO: 2c - On activation, remove obsolete caches
self.addEventListener('activate', function (event) {
    console.log('[Service Worker] Activate');
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    return true;
                }).map(function (cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

// TODO: 2d - On intercepted fetch, use the strategy of your choice to respond to requests
self.addEventListener('fetch', event => {
    //console.log('Fetch intercepted for:', event.request.url);
    event.respondWith(caches.match(event.request)
      .then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }
          return fetch(event.request);
        })
      );
  });
