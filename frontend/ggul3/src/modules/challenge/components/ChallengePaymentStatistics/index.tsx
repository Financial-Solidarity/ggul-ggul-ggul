import { Progress } from '@nextui-org/react';

import { transformMoneyUnit } from '@/modules/common/utils/transformMoneyUnit';

export interface PaymentHistoryItem {
  nickname: string;
  budget: number;
  spend: number;
}

interface ChallengePaymentStatisticsProps {
  statistics?: PaymentHistoryItem[];
  competitionType: 'S' | 'T';
}

const getPercentage = (budget: number, spend: number) => {
  return ((budget - spend) / budget) * 100;
};

export const ChallengePaymentStatistics = ({
  statistics,
  competitionType,
}: ChallengePaymentStatisticsProps) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-bold">참가자별</p>

      <div className="flex flex-col gap-4">
        {statistics
          ?.sort((a, b) => a.spend - b.spend)
          .map(({ nickname, budget, spend }, index) => {
            if (competitionType === 'S') {
              return (
                <div key={index}>
                  <div className="flex justify-between">
                    <p>{nickname}</p>
                    {budget - spend < 0 ? (
                      <p className="font-semibold text-danger">
                        {((budget - spend) * -1).toLocaleString()}원 초과
                      </p>
                    ) : (
                      <p className="font-semibold text-default-800">
                        {transformMoneyUnit({
                          money: budget - spend,
                          disableSign: true,
                        })}
                        원 남음
                      </p>
                    )}
                  </div>
                  <Progress
                    aria-label="payment total"
                    color={
                      getPercentage(budget, spend) >= 70
                        ? 'primary'
                        : getPercentage(budget, spend) >= 30
                          ? 'warning'
                          : 'danger'
                    }
                    value={getPercentage(budget, spend)}
                  />
                </div>
              );
            }

            return (
              <div key={index}>
                <div className="flex justify-between">
                  <p>{nickname}</p>
                  <p className="font-semibold text-default-800">
                    {transformMoneyUnit({
                      money: spend,
                      disableSign: true,
                    })}
                    원 사용
                  </p>
                </div>
                <Progress
                  aria-label="payment total"
                  color={
                    (spend / budget) * 100 >= 70
                      ? 'danger'
                      : (spend / budget) * 100 >= 30
                        ? 'warning'
                        : 'primary'
                  }
                  value={(spend / budget) * 100}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};
