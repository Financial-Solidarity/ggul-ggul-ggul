import { Image } from '@nextui-org/react';

import { transformMoneyUnit } from '@/modules/common/utils/transformMoneyUnit';

interface AccountBookTradingHistoryItemProps {
  imgUrl: string;
  value: number;
  ggulDiscount?: number;
  transmissionFrom?: string;
  transmissionTo: string;
}

export const AccountBookTradingHistoryItem = ({
  imgUrl,
  value,
  ggulDiscount,
  transmissionFrom,
  transmissionTo,
}: AccountBookTradingHistoryItemProps) => {
  const isPositive = value >= 0;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image sizes="36" src={imgUrl} />
          <div className="ml-2">
            <div
              className={`font-bold leading-5 text-${isPositive ? 'primary' : ''}`}
            >
              {transformMoneyUnit(value)}원
            </div>
            <div className="text-gray text-xs">
              {transmissionFrom && '내 계좌 이체 | ' + transmissionFrom + '-> '}
              {transmissionTo}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-gray text-sm">9월 9일</div>
          {ggulDiscount && <CoinIcon discountValue={ggulDiscount} />}
        </div>
      </div>
    </div>
  );
};

const CoinIcon = ({ discountValue }: { discountValue: number }) => {
  return (
    <div className="flex items-center text-sm">
      <span className="mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-warning text-xs font-bold">
        G
      </span>
      -{discountValue}
    </div>
  );
};
