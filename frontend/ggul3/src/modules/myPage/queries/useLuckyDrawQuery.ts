import { UseMutationResult, useMutation } from '@tanstack/react-query';

import { LuckyDrawDTO, luckyDraw } from '@/modules/pay/apis/luckyDraw';

export const useLuckDrawMutation = (): UseMutationResult<
  LuckyDrawDTO | null,
  unknown,
  number
> => {
  return useMutation({
    mutationFn: (applicationId: number) => luckyDraw(applicationId),
  });
};
