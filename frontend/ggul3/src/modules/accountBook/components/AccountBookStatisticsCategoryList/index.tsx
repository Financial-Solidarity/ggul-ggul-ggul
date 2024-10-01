import {
  AccountBookStatisticsCategoryItem,
  AccountBookStatisticsCategoryItemDTO,
} from '../AccountBookStatisticsCategoryItem';

import { getPercentage } from '@/modules/common/utils/getPercentage';

interface AccountBookStatisticsCategoryListProps {
  categoryList: AccountBookStatisticsCategoryItemDTO[];
}

const colors = [
  'text-primary',
  'text-success',
  'text-secondary',
  'text-warning',
  'text-danger',
];

export const AccountBookStatisticsCategoryList = ({
  categoryList,
}: AccountBookStatisticsCategoryListProps) => {
  const totalMoney = categoryList.reduce((acc, cur) => acc + cur.money, 0);

  return (
    <div className="flex flex-col gap-2 py-4">
      {categoryList.map((item, index) => (
        <AccountBookStatisticsCategoryItem
          key={index}
          color={colors[index % colors.length]}
          label={item.label}
          money={item.money}
          percentage={getPercentage({
            total: totalMoney,
            value: item.money,
          })}
        />
      ))}
    </div>
  );
};
