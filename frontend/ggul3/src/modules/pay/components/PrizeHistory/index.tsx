import { Card, Image } from '@nextui-org/react';

import { SubTitle } from '../SubTitle';

import shin from '@/assets/images/shin.png';
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

interface PrizeHistoryItemProps {
  name: string;
}

const PrizeHistoryItem = ({ name }: PrizeHistoryItemProps) => {
  return (
    <div className="flex min-w-28 content-center items-center justify-center">
      <Card
        isFooterBlurred
        className="border-none p-2 hover:bg-slate-200"
        radius="lg"
      >
        <Image
          alt="Woman listing to music"
          className="object-cover p-2 pb-0"
          sizes="84"
          src={shin}
        />
        <p className="text-center text-xs font-bold">{name}</p>
      </Card>
    </div>
  );
};
