const cacheName = 'v1';

const cacheAssets = ['index.html', 'app.js', 'main.js'];

// Call install event

self.addEventListener('install', event => {
	console.log('Service Worker: Installed');

	event.waitUntil(
		caches
			.open(cacheName)
			.then(cache => {
				console.log('Service Worker: Caching Files');
				cache.addAll(cacheAssets);
			})
			.then(() => self.skipWaiting())
	);
});

// Call activate event
self.addEventListener('activate', event => {
	console.log('Service Worker: Activated');
	// Remove unwanted caches
	event.waitUntil(
		caches.keys().then(cacheNames => {
			return Promise.all(
				cacheNames.map(cache => {
					if (cache !== cacheName) {
						console.log('Service Worker: Clearing Old Cache');
						return caches.delete(cache);
					}
				})
			);
		})
	);
});

// Call fetch event
self.addEventListener('fetch', event => {
	console.log('Service Worker: Fetching');

	event.respondWith(fetch(event.request).catch(() => caches.match(e.request)));
});
