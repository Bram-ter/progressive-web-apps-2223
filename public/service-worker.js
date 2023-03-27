const CACHE_NAME = 'my-site-cache-v1';
const cachedFiles = [
  '/',
  '/my-work'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(cachedFiles);
      })
  );
});

// Activate the service worker
self.addEventListener('activate', function(event) {
  console.log('Service worker activated');
});

self.addEventListener("fetch", (e) => {
  console.log("[Service Worker] Fetching...")
  e.respondWith(
      caches.match(e.request)
          .then(cachedResponse => {

              if (cachedResponse) return cachedResponse

              return fetch(e.request)
                  .then(response => {
                      // If the request is not a GET request,
                      // OR if the request does not start with 'http'
                      // don't cache the response
                      if (e.request.method !== 'GET' || e.request.url.indexOf('http') !== 0) return response

                      // Cache the response
                      return caches.open(CACHE_NAME)
                          .then(cache => {
                              cache.put(e.request, response.clone())
                              return response
                          })
                  })
                  .catch(() => {
                      console.log('[Service Worker] Fetch failed; returning offline page instead.')
                      // If the request fails, return the offline page
                      if (e.request.mode === 'navigate') {
                          return caches.open(CACHE_NAME)
                              .then(cache => cache.match(OFFLINE_URL))
                      }
                  })
          })
  )
})