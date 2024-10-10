import { Card } from '@nextui-org/card';
import { Image } from '@nextui-org/react';

import { PrizeHistoryItem as PrizeHistoryItemDTO } from '../../apis/luckyDraw';

interface PrizeHistoryItemProps {
  item: PrizeHistoryItemDTO;
}

export const PrizeHistoryItem = ({ item }: PrizeHistoryItemProps) => {
  return (
    <div className="flex min-w-32 max-w-32 content-center items-center justify-center">
      <Card
        isFooterBlurred
        className="border-none p-1 hover:bg-slate-200"
        radius="lg"
      >
        <Image
          alt="Woman listing to music"
          className="mb-1 object-cover pb-0"
          src={item.application.imageUrl}
        />
        <p className="text-center text-xs">{item.application.title}</p>
      </Card>
    </div>
  );
};
