import { setupWorker } from 'msw/browser';

import { exampleHandlers } from './domain1/domain1Handlers';

// 직접 작성한 핸들러를 setupWorker에서 import 하여 사용합니다. ex)domain1Handlers.ts 파일 코드 참고
export const worker = setupWorker(...exampleHandlers);
