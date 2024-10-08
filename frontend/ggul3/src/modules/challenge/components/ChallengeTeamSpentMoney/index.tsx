import { Progress } from '@nextui-org/react';

import { AccountBookStatisticsCategoryItem } from '@/modules/accountBook/components';
import { getPercentage } from '@/modules/common/utils/getPercentage';
import { transformMoneyUnit } from '@/modules/common/utils/transformMoneyUnit';

const colors = [
  'text-primary',
  'text-success',
  'text-secondary',
  'text-warning',
  'text-danger',
];

interface ChallengeTeamSpentMoneyProps {
  consumptionList: {
    label: string;
    money: number;
  }[];
  teamName: string;
  isMyTeam: boolean;
  budget: number;
}

export const ChallengeTeamSpentMoney = ({
  consumptionList,
  teamName,
  isMyTeam,
  budget,
}: ChallengeTeamSpentMoneyProps) => {
  const totalSpentMoney = consumptionList.reduce(
    (acc, cur) => acc + cur.money,
    0,
  );

  return (
    <div className="flex flex-col gap-2 py-4">
      <div className="flex items-center font-bold">
        <p className="mr-2">{teamName}</p>
        <p className="text-xs">{isMyTeam && '우리팀!'}</p>
      </div>
      <Progress
        aria-label="Loading..."
        color={isMyTeam ? 'primary' : 'danger'}
        value={((budget - totalSpentMoney) / budget) * 100}
      />
      {totalSpentMoney > budget ? (
        <p className="text-center text-sm font-bold text-danger">
          {totalSpentMoney - budget} 원 초과
        </p>
      ) : (
        <p className="text-center text-sm font-bold">
          {transformMoneyUnit({
            money: budget - totalSpentMoney,
            disableSign: true,
          })}
          원 남음
        </p>
      )}
      {consumptionList.map((item, index) => (
        <AccountBookStatisticsCategoryItem
          key={index}
          color={colors[index % colors.length]}
          label={item.label}
          money={item.money}
          percentage={getPercentage({
            total: totalSpentMoney,
            value: item.money,
          })}
        />
      ))}
    </div>
  );
};
