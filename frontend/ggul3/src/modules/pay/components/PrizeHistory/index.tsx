import { useEffect } from 'react';

import { SubTitle } from '../SubTitle';
import { PrizeHistoryItem } from '../PrizeHistoryItem';
import { useLuckyDrawStore } from '../../store/luckyDrawStore';
import { getPrizeHistory } from '../../apis/luckyDraw';

import { PathNames } from '@/router';

export const PrizeHistory = () => {
  const { luckDrawHistory, setLuckDrawHistory } = useLuckyDrawStore();

  useEffect(() => {
    const fetchPrizeHistory = async () => {
      const response = await getPrizeHistory();

      setLuckDrawHistory(response.content);
    };

    fetchPrizeHistory();
  }, []);

  return (
    <>
      <SubTitle
        count={luckDrawHistory.length}
        rightLinkButtonUrl={PathNames.GGULPAY.PRIZE_HISTORY.path}
        title="응모 내역"
      />
      <div className="flex flex-nowrap gap-2 overflow-x-scroll p-2 text-black">
        {luckDrawHistory.length ? (
          luckDrawHistory.map((item, index) => (
            <PrizeHistoryItem key={index} item={item} />
          ))
        ) : (
          <p>응모 내역이 없습니다.</p>
        )}
      </div>
    </>
  );
};
