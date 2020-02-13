/**
 * Resources 
 * https://developers.google.com/web/fundamentals/primers/service-workers/
 * https://github.com/FoxyStoat/restaurant-reviews-app/blob/master/sw.js
*/

var CACHE_NAME = 'mysite-cache-v1';
var urlsToCache = [
                './',
				'./index.html',
				'./restaurant.html',
				'./css/styles.css',
				'./data/restaurants.json',
				'./js/dbhelper.js',
				'./js/main.js',
				'./js/restaurant_info.js',
				'./img/1.jpg',
				'./img/2.jpg',
				'./img/3.jpg',
				'./img/4.jpg',
				'./img/5.jpg',
				'./img/6.jpg',
				'./img/7.jpg',
				'./img/8.jpg',
				'./img/9.jpg',
				'./img/10.jpg'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});
/**
 * Removing outdated caches
 */
self.addEventListener('activate', function (evt) {
	evt.waitUntil(
		caches
		.keys()
		.then((cacheNames) => {
			return Promise.all(
				cacheNames.filter(function (thisCacheName) {
					return cacheName.startsWith('mysite-') &&
						thisCacheName != cacheName;
						console.log('Service Working: Removing Outdated Caches from', thisCacheName );
				})
				.map(function (cacheName) {
					return caches.delete(cacheName);
				})
			);
		})
	);
});
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});