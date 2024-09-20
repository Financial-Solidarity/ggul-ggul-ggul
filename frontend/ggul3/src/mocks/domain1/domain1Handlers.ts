import { http, HttpResponse } from 'msw';

// mock 핸들러는 배열로 작성하여 export 하게 되고, browser.ts 파일의 setupWorker 인자로 전달됩니다.
export const handlers = [
  http.get('/api/users', () => {
    return HttpResponse.json([
      {
        id: 1,
        name: 'Jonson',
      },
    ]);
  }),
];
