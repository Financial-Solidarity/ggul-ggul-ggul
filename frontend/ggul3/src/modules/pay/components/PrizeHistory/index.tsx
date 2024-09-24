import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { Card, Image } from '@nextui-org/react';

import shin from '@/assets/images/shin.png';

const PrizeHistory = () => {
  return (
    <>
      <SubTitle />
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

const SubTitle = () => {
  return (
    <div className="flex justify-between">
      <p className="font-bold">
        응모 내역 <span className="text-primary-500">2</span>
      </p>
      <p className="flex content-center items-end items-center text-xs text-gray-500">
        전체보기 <ChevronRightIcon className="size-3" />
      </p>
    </div>
  );
};

interface PrizeHistoryItemProps {
  name: string;
}

const PrizeHistoryItem = ({ name }: PrizeHistoryItemProps) => {
  return (
    <div className="flex min-w-[110px] content-center items-center justify-center">
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

export default PrizeHistory;
