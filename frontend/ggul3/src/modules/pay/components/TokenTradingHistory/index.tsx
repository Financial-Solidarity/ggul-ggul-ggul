import { Button } from '@nextui-org/react';

import { SubTitle } from '../SubTitle';

export const TokenTradingHistory = () => {
  return (
    <div className="pb-4">
      <SubTitle title="최근 거래내역" />
      <div className="flex flex-col gap-1 py-2">
        <TradingHistoryItem ggulValue={100} />
        <TradingHistoryItem ggulValue={-100} />
        <TradingHistoryItem ggulValue={100} />
      </div>
    </div>
  );
};

interface TradingHistoryItemProps {
  ggulValue: number;
}

const TradingHistoryItem = ({ ggulValue }: TradingHistoryItemProps) => {
  const isPositive = ggulValue > 0;

  return (
    <Button className="flex w-full justify-between border bg-white py-7">
      <p className="flex flex-col text-start font-medium">
        <span>02월 27일 14:58</span>
        <span className="text-gray text-xs font-light">
          0x14f78f187f7218...
        </span>
      </p>
      <p
        className={`flex items-center font-bold text-${isPositive ? 'primary' : 'warning'}`}
      >
        {isPositive ? '+' : '-'} 100 GGUL
      </p>
    </Button>
  );
};
