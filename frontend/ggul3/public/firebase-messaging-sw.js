importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js',
);

// Firebase 설정
const firebaseConfig = {
  apiKey: true,
  projectId: true,
  messagingSenderId: true,
  appId: true,
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// 캐시 이름 정의
const CACHE_NAME = 'ggul3-pwa-cache-v1';
const urlsToCache = [
  '/', // 루트 페이지
  '/index.html', // index 페이지
  '/manifest.json', // 매니페스트
  // 필요한 정적 리소스 추가
  '/pwa-192x192.png',
  '/pwa-512x512.png',
  '/source/image1.png',
];

// 서비스 워커 설치 이벤트: 앱의 정적 파일을 캐싱
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');

      return cache.addAll(urlsToCache);
    }),
  );
});

// 서비스 워커 활성화 이벤트: 이전 버전의 캐시를 정리
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
});

// 네트워크 요청 이벤트: 캐시된 파일을 우선 반환하고, 네트워크를 통해 가져와 캐시 업데이트
self.addEventListener('fetch', (event) => {
  const requestURL = new URL(event.request.url);

  // 캐시할 스킴이 'http' 또는 'https'인 경우에만 캐싱
  if (requestURL.protocol === 'http:' || requestURL.protocol === 'https:') {
    event.respondWith(
      caches
        .match(event.request)
        .then((response) => {
          return (
            response ||
            fetch(event.request).then((networkResponse) => {
              return caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, networkResponse.clone());

                return networkResponse;
              });
            })
          );
        })
        .catch(() => {
          return caches.match('/');
        }),
    );
  }
});

// FCM 백그라운드 메시지 처리
// messaging.onBackgroundMessage((payload) => {
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: payload.notification.image,
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

// 푸시 알림 이벤트: 서버로부터 푸시 알림을 받아서 처리
self.addEventListener('push', (event) => {
  const data = event.data ? JSON.parse(event.data.text()) : {};

  let title = data.title || '껄껄껄 알림';
  let body = data.body || '새로운 알림이 있습니다.';

  // type에 따른 분기 처리
  switch (data.data?.type) {
    case 'CHAT_COMMON':
      title = `[ 채팅 알림 ] ${data.data.title}`;
      body = data.data.body;
      break;
    case 'CHAT_JUSTIFICATION':
      title = `[ 소명 메시지 ] ${data.data.title}`;
      body = `${data.data.body}`;
      break;
    case 'CHAT_SPEND':
      title = `[ 소비 ] ${data.data.title}`;
      body = `${data.data.body}`;
      break;
    default:
      title = data.title || '껄껄껄 알림';
      body = data.body || '새로운 알림이 있습니다.';
      break;
  }

  const options = {
    body: body,
    icon: '/pwa-192x192.png',
    badge: '/pwa-192x192.png',
    data: data.url || '/',
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// 알림 클릭 이벤트: 알림 클릭 시 앱을 특정 페이지로 이동시키는 로직
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(
    clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url === event.notification.data && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(event.notification.data);
        }
      }),
  );
});
