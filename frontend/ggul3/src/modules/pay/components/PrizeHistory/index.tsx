import { SubTitle } from '../SubTitle';
import { PrizeHistoryItem } from '../PrizeHistoryItem';

import { PathNames } from '@/router';

export const PrizeHistory = () => {
  return (
    <>
      <SubTitle
        count={2}
        rightLinkButtonUrl={PathNames.GGULPAY.PRIZE_HISTORY.path}
        title="응모 내역"
      />
      <div className="flex flex-nowrap gap-2 overflow-x-scroll rounded-lg bg-primary-400 p-2 text-black">
        <PrizeHistoryItem name="신라면 5봉지" />
        <PrizeHistoryItem name="신라면 5봉지" />
        <PrizeHistoryItem name="신라면 5봉지" />
        <PrizeHistoryItem name="신라면 5봉지" />
        <PrizeHistoryItem name="신라면 5봉지" />
        <PrizeHistoryItem name="신라면 5봉지" />
      </div>
    </>
  );
};
