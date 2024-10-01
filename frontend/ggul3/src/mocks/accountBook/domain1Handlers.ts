import { http, HttpResponse } from 'msw';

// mock 핸들러는 배열로 작성하여 export 하게 되고, browser.ts 파일의 setupWorker 인자로 전달됩니다.
export const domain1Handlers = [
  http.get('/api/accounts', () => {
    return HttpResponse.json({
      id: 11,
      name: '농협',
      accountNo: '110-1851-4567',
    });
  }),
];
