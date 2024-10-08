import { Payment } from '@types';
import Lottie from 'lottie-react';

import { AccountBookTradingHistoryItem } from '../AccountBookTradingHistoryItem';

import no_items from '@/assets/lotties/no_items.json';
interface AccountBookHistoryProps {
  paymentList: Payment[];
}

export const AccountBookHistory = ({
  paymentList,
}: AccountBookHistoryProps) => {
  return (
    <div className="bg-red-500-10 flex flex-col gap-4 py-4">
      {paymentList.length ? (
        paymentList.map((payment, index) => (
          <AccountBookTradingHistoryItem
            key={index}
            label={payment.label}
            market={payment.market}
            money={payment.money}
            productName={payment.productName}
            spendGgulToken={payment.spendGgulToken}
            spentAt={payment.spentAt}
          />
        ))
      ) : (
        <div className="flex w-full flex-col">
          <p>거래내역이 없습니다.</p>
          <Lottie
            animationData={no_items}
            className="w-full self-center"
            loop={true}
            style={{
              width: '160px',
              height: '160px',
            }}
          />
        </div>
      )}
    </div>
  );
};
