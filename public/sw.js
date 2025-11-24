const CACHE_NAME = "cache-home-v1";

// Archivos iniciales que siempre queremos cachear
const urlsToCache = [
  "/",
  "/offline.html",
  "/images/floreria.jpg",
  "/images/fiesta.jpg",
  "/images/medico.jpg",
  "/images/contruccion.jpg",
  "/images/result_logo.png",
  "/about",
  "/contact",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Cacheando archivos iniciales");
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Si es una página HTML, la guardamos en cache para el futuro
        const responseClone = response.clone();
        if (event.request.destination === "document") {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() =>
        caches.match(event.request).then((cached) => cached || caches.match("/offline.html"))
      )
  );
});
