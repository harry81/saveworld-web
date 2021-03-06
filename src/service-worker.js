// tick this to make the cache invalidate and update
const CACHE_VERSION = 172;
const CURRENT_CACHES = {
  'read-through': 'read-through-cache-v' + CACHE_VERSION
};

var filesToCache = [
  './',
  './?service',
  './index.html',
  './build/main.js',
  './build/main.css',
  './build/polyfills.js',
  './assets/fonts/ionicons.woff',
  './assets/fonts/ionicons.woff2',
];

console.log('cache name', CURRENT_CACHES);

importScripts('./sw-toolbox.js');

toolbox.options = {
  cache: {
    name: CURRENT_CACHES
  }
}

toolbox.precache(filesToCache);

// toolbox.router.get('/api-item/*', function(request, values) {
//   console.log('router', request, values);
//   return request;
//   // return new Response('Handled a request for ' + request.url +
//   //     ', where foo is "' + values.foo + '"');
// }, {origin: 'http://localhost:8000'});


importScripts('./offline-google-analytics-import.js');
goog.offlineGoogleAnalytics.initialize();


self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');

  const title = 'Heal the world';
  const options = {
    body: '새로운 댓글입니다.',
    icon: 'assets/imgs/icon-text.png',
    badge: 'images/badge.png',
    link: 'https://www.healworld.co.kr'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
