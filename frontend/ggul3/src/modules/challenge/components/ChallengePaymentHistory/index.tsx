import { Payment } from '@types';

import { AccountBookTradingHistoryItem } from '@/modules/accountBook/components';
import { useUserStore } from '@/modules/common/store/userStore';

interface ChallengePaymentHistoryProps {
  paymentHistory?: Payment[];
}

// 챌린지 채팅방 내부의 결제 내역
export const ChallengePaymentHistory = ({
  paymentHistory,
}: ChallengePaymentHistoryProps) => {
  const { user } = useUserStore();

  const tempPaymentHistory = [
    {
      label: '지출',
      market: '마켓',
      money: -1000,
      productName: '커피',
      spendGgulToken: 10,
      spentAt: '2021-07-01',
    },
    {
      label: '수입',
      market: '마켓',
      money: 1000,
      productName: '커피',
      spendGgulToken: 10,
      spentAt: '2021-07-01',
    },
  ];

  return (
    <div>
      <p className="mb-3 font-bold">결제 내역</p>
      {(paymentHistory || tempPaymentHistory).map((payment, index) => (
        <div key={index} className="mb-1">
          <AccountBookTradingHistoryItem
            label={payment.label}
            market={payment.market}
            money={payment.money}
            nickname={user?.nickname}
            productName={payment.productName}
            profileImg={user?.profileImg}
            spendGgulToken={payment.spendGgulToken}
            spentAt={payment.spentAt}
          />
        </div>
      ))}
    </div>
  );
};
