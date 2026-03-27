const CACHE_NAME = 'abby-app-v3';
const ASSETS = [
  './',
  './notas.html',
  './manifest.json'
];

self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Almacén offline de Abby listo ✨');
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (evt) => {
  evt.respondWith(
    caches.match(evt.request).then((response) => {
      // Si el archivo está en el caché (HTML/JSON), lo entrega.
      // Si no, intenta internet, pero con un "escudo" para errores.
      return response || fetch(evt.request).catch(() => {
        // Si falla el internet y es una imagen, fuente o audio, devolvemos una respuesta vacía
        // en lugar de dejar que el navegador lance un error rojo.
        if (evt.request.destination === 'image' || evt.request.destination === 'font' || evt.request.destination === 'audio') {
          return new Response('', { status: 404 });
        }
      });
    })
  );
});