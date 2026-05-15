self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open('netflix-romance-v1').then((cache) => {
            return cache.addAll([
                '/',
                '/login.html',
                '/profiles.html',
                '/dashboard.html',
                '/style.css',
                '/script.js'
            ]);
        })
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
});
