self.addEventListener('install', function(e) {
  e.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', function(e) {
  e.waitUntil(self.clients.claim());
});

// add Event Listener push to receive notification
self.addEventListener('push', function(event) {
  console.log(event.data.json());
	 event.waitUntil(
	 	self.registration.showNotification('SalonHero', {
	 		lang: 'vi',
	 		body: event.data.text(),
	 		icon: 'https://ufile.io/ybuej',
	 	})
	 );
});

self.addEventListener('notificationclick', function(e) {
	console.log(e);
  if (e.notification.tag !== 'user_visible_auto_notification') {
    // Open a same-origin page until https://code.google.com/p/chromium/issues/detail?id=457187
    // is resolved.
    clients.openWindow('redirect.html?url=' + encodeURIComponent(e.notification.tag));
  }
});