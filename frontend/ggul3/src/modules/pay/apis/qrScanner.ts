import { _axios } from '@/modules/common/utils/axios';

export interface PaymentInformation {
  categoryId: number;
  spendGgulToken: number;
  requiredMoney: number;
  productName: string;
  market: string;
}

export const buyItem = ({
  categoryId,
  spendGgulToken,
  requiredMoney,
  productName,
  market,
}: PaymentInformation) => {
  return _axios<{ spendMoney: number }>({
    method: 'POST',
    url: `/payment`,
    data: {
      categoryId,
      spendGgulToken,
      requiredMoney,
      productName,
      market,
    },
  });
};
