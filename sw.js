/* Guarda o guia no aparelho para abrir sem internet. Não envia nem recebe dados de ninguém. */
const CACHE = 'soberania-v28';

const CORE = ['./', './index.html', './dados.yaml', './vendor/js-yaml.min.js', './manifest.webmanifest', './icon-192.png', './icon-512.png',
  './fonts/raleway.css', './fa/css/all.min.css', './fa/webfonts/fa-solid-900.woff2', './fa/webfonts/fa-brands-400.woff2', './fa/webfonts/fa-regular-400.woff2'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Página e arquivos do próprio site: tenta a rede (versão nova) e cai no que está guardado.
  if (url.origin === location.origin) {
    e.respondWith(
      fetch(req)
        .then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res; })
        .catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
    );
    return;
  }

});
