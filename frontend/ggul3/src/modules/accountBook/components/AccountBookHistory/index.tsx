import { Payment } from '@types';

import { AccountBookTradingHistoryItem } from '../AccountBookTradingHistoryItem';

interface AccountBookHistoryProps {
  paymentList: Payment[];
}

export const AccountBookHistory = ({
  paymentList,
}: AccountBookHistoryProps) => {
  return (
    <div className="bg-red-500-10 flex flex-col gap-4 py-4">
      {paymentList.map((payment, index) => (
        <AccountBookTradingHistoryItem
          key={index}
          imgUrl="https://via.placeholder.com/36"
          label={payment.label}
          market={payment.market}
          money={payment.money}
          productName={payment.productName}
          spendGgulToken={payment.spendGgulToken}
          spentAt={payment.spentAt}
        />
      ))}
    </div>
  );
};
