import { Button } from '@nextui-org/react';
import { useEffect } from 'react';
import { TokenTradingHistoryItemDTO } from '@types';

import { SubTitle } from '../SubTitle';
import { useWalletStore } from '../../store/walletStore';
import { getTokenTradingHistories } from '../../apis/wallet';

export const TokenTradingHistory = () => {
  const { tokenTradingHistories, setTokenTradingHistories } = useWalletStore();

  useEffect(() => {
    const getTokens = async () => {
      const { content } = await getTokenTradingHistories();

      setTokenTradingHistories(content);
    };

    if (!tokenTradingHistories.length) {
      getTokens();
    }
  }, []);

  return (
    <div className="pb-4">
      <SubTitle title="최근 거래내역" />
      <div className="flex flex-col gap-1 py-2">
        {tokenTradingHistories.length ? (
          tokenTradingHistories.map((item) => (
            <TradingHistoryItem key={item.createdAt} ggulTradingItem={item} />
          ))
        ) : (
          <p>거래내역이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

interface TradingHistoryItemProps {
  ggulTradingItem: TokenTradingHistoryItemDTO;
}

const TradingHistoryItem = ({ ggulTradingItem }: TradingHistoryItemProps) => {
  return (
    <Button className="flex w-full justify-between border bg-white py-7">
      <p className="flex flex-col text-start font-medium">
        <span> {ggulTradingItem.createdAt}</span>
        <span className="text-gray text-xs font-light">
          {ggulTradingItem.category}
        </span>
      </p>
      <p
        className={`flex items-center font-bold text-${ggulTradingItem.isPositive ? 'primary' : 'warning'}`}
      >
        {ggulTradingItem.isPositive ? '+' : '-'} {ggulTradingItem.quantity} GGUL
      </p>
    </Button>
  );
};
