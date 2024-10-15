import Lottie from 'lottie-react';

import {
  AccountBookStatisticsCategoryItem,
  AccountBookStatisticsCategoryItemDTO,
} from '../AccountBookStatisticsCategoryItem';

import { getPercentage } from '@/modules/common/utils/getPercentage';
import no_items from '@/assets/lotties/no_items.json';

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
      {categoryList.length ? (
        categoryList.map((item, index) => (
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
