// DOLBIC Bible PWA Service Worker — Phase 3 foundation
// Cache strategies defined in architecture: Cache-First (verses), Network-First (daily/user)

const CACHE_NAME = 'dolbic-bible-v1';
const STATIC_ASSETS = ['/','/bible','/daily','/plans','/saved'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  // Simple strategy: try network first for dynamic content, cache fallback for static
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request)).catch(() => new Response('Offline — DOLBIC Bible', { status: 503 }))
  );
});
