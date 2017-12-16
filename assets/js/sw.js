self.swVersion = 1;

self.addEventListener('install', function(e) {
  e.waitUntil(self.skipWaiting());
  console.log('installed');
});

self.addEventListener('activate', function(e) {
  e.waitUntil(self.clients.claim());
  console.log('actived');
});

// add Event Listener push to receive notification
self.addEventListener('push', function(event) {
  console.log('push');
  var test = event.data.json();
	 event.waitUntil(
	 	self.registration.showNotification('SalonHero', {
	 		lang: 'vi',
	 		body: test.message,
	 		icon: 'https://s3-ap-northeast-1.amazonaws.com/salonherodev/PROD/Common/logo_blue.png',
	 		data: {
		     url: "https://facebook.com"
		   }
	 	})
	 );
});

self.addEventListener('notificationclick', function(e) {
  if (e.notification.tag !== 'user_visible_auto_notification') {
    // Open a same-origin page until https://code.google.com/p/chromium/issues/detail?id=457187
    // is resolved.
    clients.openWindow('redirect.html?url=' + encodeURIComponent(e.notification.tag));
  }
});