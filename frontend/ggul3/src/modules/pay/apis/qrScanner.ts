import { _axios } from '@/modules/common/utils/axios';

interface PaymentInformation {
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
  console.log(categoryId, spendGgulToken, requiredMoney, productName, market);

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
