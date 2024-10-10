import { Payment } from '@types';

import { transformSpendMoney } from '@/modules/common/utils/transformMoneyUnit';

interface AccountBookTradingHistoryItemProps extends Payment {
  profileImg?: string;
  nickname: string;
}

export const AccountBookTradingHistoryItem = ({
  market,
  money,
  productName,
  spentAt,
  nickname,
  spendGgulToken,
}: AccountBookTradingHistoryItemProps) => {
  const isPositive = money >= 0;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="ml-2">
            <div
              className={`font-bold leading-5 text-${isPositive ? 'black' : 'gray-500'}`}
            >
              {productName}
            </div>
            <div className="text-gray text-xs">
              {market} {spentAt.slice(0, 10).replace(/-/g, '.')}
            </div>
            <p className="text-xs font-semibold text-gray-800">{nickname}</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className={`text-gray font-bold text-primary`}>
            {transformSpendMoney(money)}원
          </div>
          {Number(spendGgulToken) > 0 && (
            <CoinIcon discountValue={spendGgulToken} />
          )}
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
