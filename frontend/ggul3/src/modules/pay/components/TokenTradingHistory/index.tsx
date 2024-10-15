import { Button } from '@nextui-org/react';
import { useEffect } from 'react';
import { TokenTradingHistoryItemDTO } from '@types';
import Lottie from 'lottie-react';

import { SubTitle } from '../SubTitle';
import { useWalletStore } from '../../store/walletStore';
import { getTokenTradingHistories } from '../../apis/wallet';

import no_items from '@/assets/lotties/no_items.json';

export const TokenTradingHistory = () => {
  const { tokenTradingHistories, setTokenTradingHistories } = useWalletStore();

  useEffect(() => {
    const getTokens = async () => {
      const { content } = await getTokenTradingHistories();

      setTokenTradingHistories(content);
      console.log(content);
    };

    getTokens();
  }, []);

  return (
    <div className="pb-4">
      <SubTitle title="최근 거래내역" />
      <div className="flex flex-col gap-1 py-2">
        {tokenTradingHistories.length ? (
          tokenTradingHistories
            .filter((item) => item.quantity !== 0)
            .map((item) => (
              <TradingHistoryItem key={item.createdAt} ggulTradingItem={item} />
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
