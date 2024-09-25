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
          <Image sizes={'36'} src={imgUrl} />
          <div className="ml-2">
            <div
              className={`translate-y-[2px] font-bold text-${isPositive ? 'primary' : ''}-500`}
            >
              {transformMoneyUnit(value)}원
            </div>
            <div className="text-xs text-gray-500">
              {transmissionFrom && '내 계좌 이체 | ' + transmissionFrom + '-> '}
              {transmissionTo}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="translate-y-[2px] text-sm text-gray-500">9월 9일</div>
          {ggulDiscount && <CoinIcon discountValue={ggulDiscount} />}
        </div>
      </div>
    </div>
  );
};

const CoinIcon = ({ discountValue }: { discountValue: number }) => {
  return (
    <div className="flex items-center text-sm">
      <span className="mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-warning-500 text-xs font-bold">
        G
      </span>
      -{discountValue}
    </div>
  );
};
