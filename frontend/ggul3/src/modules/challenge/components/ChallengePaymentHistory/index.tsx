import { ConsumptionDTO } from '@types';

import { AccountBookTradingHistoryItem } from '@/modules/accountBook/components';

interface ChallengePaymentHistoryProps {
  paymentHistory?: ConsumptionDTO[];
}

// 챌린지 채팅방 내부의 결제 내역
export const ChallengePaymentHistory = ({
  paymentHistory,
}: ChallengePaymentHistoryProps) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-bold">결제 내역</p>
      <div className="flex flex-col gap-3 overflow-y-auto">
        {paymentHistory?.map((payment, index) => (
          <div key={index} className="mb-1">
            <AccountBookTradingHistoryItem {...payment} />
          </div>
        ))}
      </div>
    </div>
  );
};
