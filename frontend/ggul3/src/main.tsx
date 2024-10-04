import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import '@/styles/globals.css';
import { router } from './router.tsx';

// Mocking을 활성화하는 함수
async function enableMocking() {
  // if (process.env.NODE_ENV !== 'development') {
  //   return;
  // }

  // const { worker } = await import('./mocks/browser');

  // return worker.start();
  return;
}

// 서비스 워커 등록 함수
async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');

      console.log('PWA 서비스 워커 실행:', registration.scope);
    } catch (error) {
      console.error('PWA 서비스 워커 실패:', error);
    }
  }
}

// Mocking을 적용하고 앱을 렌더링
enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  );

  // 서비스 워커 등록
  registerServiceWorker();
});
