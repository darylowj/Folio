// Folio service worker: keeps the app working offline. Your PDFs are never cached or sent anywhere.
const CACHE = 'folio-e64cfc2f30';
const CORE = ['./', './index.html', './manifest.webmanifest',
  './vendor/pdf.min.js', './vendor/pdf.worker.min.js', './vendor/pdf-lib.min.js', './vendor/jszip.min.js',
  './icons/icon-192.png', './icons/icon-512.png', './icons/maskable-512.png', './icons/apple-touch-icon.png', './icons/favicon.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE && k !== 'folio-share').map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const req = e.request;
  // Android Share menu: park the shared files, then open the app to pick them up
  if (req.method === 'POST' && new URL(req.url).pathname.endsWith('/share-target')) {
    e.respondWith((async () => {
      try {
        const form = await req.formData(), c = await caches.open('folio-share');
        for (const k of await c.keys()) await c.delete(k);
        let i = 0;
        for (const f of form.getAll('files')) {
          if (!f || typeof f === 'string') continue;
          await c.put(new Request('./shared/' + (i++)), new Response(f, { headers: { 'Content-Type': f.type || 'application/octet-stream', 'X-Name': encodeURIComponent(f.name || 'shared.pdf') } }));
        }
      } catch (err) {}
      return Response.redirect('./?shared=' + Date.now(), 303);
    })());
    return;
  }
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    // app shell: cache first, refresh in the background
    e.respondWith(caches.match(req, { ignoreSearch: true }).then(hit => {
      const net = fetch(req).then(res => { if (res.ok) caches.open(CACHE).then(c => c.put(req, res.clone())); return res; }).catch(() => hit || caches.match('./index.html'));
      return hit || net;
    }));
  } else if (/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) {
    e.respondWith(caches.open(CACHE).then(async c => { const hit = await c.match(req); const net = fetch(req).then(res => { c.put(req, res.clone()); return res; }).catch(() => hit); return hit || net; }));
  }
});
