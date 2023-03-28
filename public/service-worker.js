const CACHE_NAME = 'site-cache-v1';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
        return cache.addAll([
          '/',
          '/my-work',
          '/offline',

          'css/style.css',
          'css/buttons.css',

          'js/enable-sw.js',
          
          'assets/room_illustration.svg',
          'assets/linkedin.svg',
          'assets/github.svg',
          'fonts/Merriweather/Merriweather-Light.ttf',
          'fonts/Hema_Futura/FuturaHEMAProOT-Book.otf'
        ]);
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
                  
          })
          .catch(() => caches.open(CACHE_NAME)
           .then(cache => 
            cache.match('/offline'))
      )
  )
})