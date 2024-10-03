import { Progress } from '@nextui-org/react';

import { transformMoneyUnit } from '@/modules/common/utils/transformMoneyUnit';

interface PaymentHistoryItem {
  nickname: string;
  value: number;
  color: string;
  cost: number;
}

interface ChallengePaymentStatisticsProps {
  paymentHistory?: PaymentHistoryItem[];
}

export const ChallengePaymentStatistics = ({
  paymentHistory,
}: ChallengePaymentStatisticsProps) => {
  const tempPaymentHistory = [
    { nickname: 'nickname', value: 70, color: 'default', cost: 1000 },
    { nickname: 'nickname', value: 70, color: 'primary', cost: 1000 },
    { nickname: 'nickname', value: 70, color: 'secondary', cost: 1000 },
    { nickname: 'nickname', value: 70, color: 'success', cost: 1000 },
    { nickname: 'nickname', value: 70, color: 'warning', cost: 1000 },
    { nickname: 'nickname', value: 70, color: 'danger', cost: 1000 },
  ];

  return (
    <div className="w flex max-w-md flex-col gap-1">
      {(paymentHistory || tempPaymentHistory).map((payment, index) => (
        <div key={index}>
          <div className="flex justify-between">
            <p>{payment.nickname}</p>
            <p>
              {transformMoneyUnit({ money: payment.cost, disableSign: true })}원
            </p>
          </div>
          <Progress
            aria-label="payment total"
            // @ts-ignore
            color={payment.color}
            value={payment.value}
          />
        </div>
      ))}
    </div>
  );
};
