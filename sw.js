const CACHE_NAME = 'verk-v1';
const urlsToCache = [
  './',
  './index.html',
  './app.js',
  './styles.css',
  './manifest.json',
  './data/anime.js',
  './data/books.js',
  './data/cartoons.js',
  './data/films.js',
  './data/manga.js',
  './data/sample.js',
  './data/tv-series.js',
  './icons/web-app-manifest-192x192.png',
  './icons/web-app-manifest-512x512.png',
  './icons/favicon-96x96.png',
  './icons/favicon.svg',
  './icons/favicon.ico',
  './icons/apple-touch-icon.png'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

// Activate event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});