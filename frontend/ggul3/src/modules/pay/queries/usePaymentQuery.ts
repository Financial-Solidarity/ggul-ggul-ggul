import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { ErrorDTO } from '@types';

import { PaymentInformation, buyItem } from '../apis/qrScanner';

export const useBuyItemMutation = (): UseMutationResult<
  { spendMoney: number }, // 성공했을 때의 반환 타입 (예: 로그인 성공 시 반환되는 데이터 타입)
  unknown, // 에러 타입
  PaymentInformation // 요청 시 사용할 변수 타입
> => {
  return useMutation<{ spendMoney: number }, ErrorDTO, PaymentInformation>({
    mutationFn: (request: PaymentInformation) => buyItem(request),
  });
};
