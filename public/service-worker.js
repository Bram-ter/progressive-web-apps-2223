const CACHE_NAME = 'site-cache-v1';
const CORE_ASSETS = [
  '/offline',

  'dist/script.min.js',
  'dist/style.min.css',

  'manifest.json',

  'assets/room_illustration.svg',
  'assets/linkedin.svg',
  'assets/github.svg',
  'fonts/Hema_Futura/FuturaHEMAProOT-Book.otf',
]

// * Install * //
self.addEventListener('install', (event) => {
  console.log("Installed");
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
      .then(() => {
        return self.clients.matchAll({ type: 'window' });
      })
      .then((clients) => {
        clients.forEach((client) => {
          client.navigate(client.url);
        });
      })
  );
});


// * Activate * //
self.addEventListener("activate", (event) => {
  console.log("Activated")
  event.waitUntil(clients.claim())
});

// * Fetching * //
self.addEventListener("fetch", (event) => {
  const req = event.request;
  console.log("Fetching:" + req.url);
  
  event.respondWith(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.match(req).then((cachedRes) => {
          if (cachedRes) {
            return cachedRes;
          }
          return fetch(req).then((fetchRes) => {
            if (
              !fetchRes ||
              fetchRes.status !== 200 ||
              fetchRes.type !== "basic"
            ) {
              return fetchRes;
            }
            cache.put(req, fetchRes.clone());
            return fetchRes;
          });
        });
      })
      .catch(() => {
        return caches.match('/offline');
      })
  );
});