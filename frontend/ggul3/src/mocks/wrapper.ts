import { worker } from './browser';

interface RequestFunction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (): Promise<any>;
}

// mockRequest 함수는 msw worker 를 시작하고, requestFunction 을 실행한 뒤 worker 를 종료합니다.
export const mockRequest = async (requestFunction: RequestFunction) => {
  await worker.start();

  const response = await requestFunction();

  worker.stop();

  return response;
};
