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

export const ChallengeTeamSpentMoney = ({}) => {
  const teamInfo = { teamName: 'A팀', isMyTeam: true, goalMoney: 1000000 };

  const categoryList = [
    { label: '식비', money: 50000 },
    { label: '교통비', money: 30000 },
    { label: '문화생활', money: 120000 },
    { label: '기타', money: 90000 },
  ];

  const totalSpentMoney = categoryList.reduce((acc, cur) => acc + cur.money, 0);

  return (
    <div className="flex flex-col gap-2 py-4">
      <div className="flex items-center font-bold">
        <p className="mr-2">{teamInfo.teamName}</p>
        <p className="text-xs">{teamInfo.isMyTeam && '우리팀'}!</p>
      </div>
      <Progress
        aria-label="Loading..."
        color={teamInfo.isMyTeam ? 'primary' : 'danger'}
        value={Math.floor((totalSpentMoney / teamInfo.goalMoney) * 100)}
      />
      <p className="text-center text-sm font-bold">
        {transformMoneyUnit({
          money: teamInfo.goalMoney - totalSpentMoney,
          disableSign: true,
        })}
        원 남음
      </p>
      {categoryList.map((item, index) => (
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
