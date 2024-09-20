## MSW 사용 방법

1. src/mocks/ 하위에 도메인 폴더 명과 동일하게 폴더를 생성합니다.

2. 해당 폴더의 하위에 핸들러 파일을 생성합니다.

3. 아래와 같이 handlers를 배열로 선언하고, 요청을 예시 코드를 참고하여 작성합니다.

```
// src/mocks/domain1/domain1Handlers.ts

import { http, HttpResponse } from 'msw';

// mock 핸들러는 배열로 작성하여 export 하게 되고, browser.ts 파일의 setupWorker 인자로 전달됩니다.
export const handlers = [
  http.get('/api/mock-user', () => {
    return HttpResponse.json([
      {
        id: 1,
        name: 'mock-user',
      },
    ]);
  }),
  http.get('/api/users', () => {
    return HttpResponse.json([
      {
        id: 1,
        name: 'Jonson',
      },
    ]);
  }),
];
```

4. mockRequest 함수에 요청 함수를 전달하면 msw가 실행되며 요청을 가로채어 실행한 뒤, msw를 다시 종료합니다.

```
import { mockRequest } from './mocks/wrapper';

//...

  // api 요청 함수
  const exampleRequestFunction = async () => {
    try {
      const response = await fetch('/api/users');
      const data = await response.json();

      console.log('Mock Data:', data);

      return data; // 데이터 반환
    } catch (error) {
      console.error('Error fetching mock data:', error);
    }
  };

  useEffect(() => {
    // mockRequest를 import 하여 요청 함수를 전달
    mockRequest(exampleRequestFunction);
  }, []);
```

### 개발 환경에서 항상 msw를 실행하고 싶은 경우

1. 앱 전체를 mocking 함수로 감싸줍니다.

```
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.tsx';
import { Provider } from './provider.tsx';
import '@/styles/globals.css';

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('./mocks/browser');

  return worker.start();
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider>
          <App />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>,
  );
});
```

2. 개발 환경에서는 더 이상 mockRequest 함수를 사용하지 않아도 모든 요청을 가로채게 됩니다.
