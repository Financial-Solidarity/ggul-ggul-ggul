import { Image } from '@nextui-org/react';
import { Payment } from '@types';

import { getYYMMDD } from '../../utils/getYYMMDD';

import { transformMoneyUnit } from '@/modules/common/utils/transformMoneyUnit';

interface AccountBookTradingHistoryItemProps extends Payment {
  imgUrl: string;
}

export const AccountBookTradingHistoryItem = ({
  imgUrl,
  label,
  market,
  money,
  productName,
  spendGgulToken,
  spentAt,
}: AccountBookTradingHistoryItemProps) => {
  const isPositive = money >= 0;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image sizes="36" src={imgUrl} />
          <div className="ml-2">
            <div
              className={`font-bold leading-5 text-${isPositive ? 'black' : 'gray-500'}`}
            >
              {productName}
            </div>
            <div className="text-gray text-xs">
              {market} {getYYMMDD(spentAt)}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div
            className={`text-gray font-bold text-${isPositive ? 'primary' : ''}`}
          >
            {transformMoneyUnit(money)}원
          </div>
          {spendGgulToken && <CoinIcon discountValue={spendGgulToken} />}
        </div>
      </div>
    </div>
  );
};

const CoinIcon = ({ discountValue }: { discountValue: number }) => {
  return (
    <div className="flex items-center text-sm leading-3">
      <span className="mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-warning text-xs font-bold">
        G
      </span>
      -{discountValue}
    </div>
  );
};
