import { Card } from '@nextui-org/card';
import { Image } from '@nextui-org/react';

import shin from '@/assets/images/shin.png';

interface PrizeHistoryItemProps {
  name: string;
}

export const PrizeHistoryItem = ({ name }: PrizeHistoryItemProps) => {
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
