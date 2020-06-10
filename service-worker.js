const cacheName = 'cache-v12';
const precacheResources = [
  '/',
  'index.html',
  '/images/icon_text_192X192_new.png',
  '/images/icon_text_512x512_new.png',
  '/style.css',
  '/Buttons.js',
  '/Instructions.js',
  '/Login.js',
  '/main.js',
  '/manifest.json',
  '/MessageModal.js',
  '/phones.json',
  '/SelectContacts.js',
  '/SelectFund.js',
  '/ViewManager.js',
  '/Welcome.js',
];

self.addEventListener('install', event => {
  console.log('service worker installed');
  event.waitUntil(
    caches.open(cacheName)
    .then(cache => {
      console.log('caching');
      cache.addAll(precacheResources)
    }));
});

self.addEventListener('activate', ev => {
  console.log('service worker active');
});

self.addEventListener('fetch', ev => {
  if (!/twitter|verify|message/.test(ev.request.url)) {
    console.log('fetch intercepted for: ', ev.request.url);
    ev.respondWith(caches.match(ev.request, { ignoreSearch: true })
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(ev.request)
          .then(response => {
            return caches.open(cacheName).then(cache => {
              console.log('caching new resource: ', ev.request.url);
              cache.put(ev.request, response.clone());
              return response;
            });
          });
      }));
  }
});
