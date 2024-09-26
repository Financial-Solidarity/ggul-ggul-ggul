import { BsCircleFill } from 'react-icons/bs';

import { transformMoneyUnit } from '@/modules/common/utils/transformMoneyUnit';

export interface AccountBookStatisticsCategoryItemDTO {
  label: string;
  money: number;
}

interface AccountBookStatisticsCategoryItemProps {
  label: string;
  money: number;
  percentage: number;
  color: string;
}

export const AccountBookStatisticsCategoryItem = ({
  label,
  money,
  percentage,
  color,
}: AccountBookStatisticsCategoryItemProps) => {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <BsCircleFill className={`text-xs ${color}`} />
        <span>{label}</span>
        <span>{percentage}%</span>
      </div>
      <div className="font-medium">{transformMoneyUnit(money).slice(1)}원</div>
    </div>
  );
};
