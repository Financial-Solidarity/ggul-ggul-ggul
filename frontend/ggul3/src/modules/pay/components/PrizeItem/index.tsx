import { Link } from 'react-router-dom';
import { Button, Image } from '@nextui-org/react';

import { PrizeHistoryItem } from '../../apis/luckyDraw';
import { PrizeSubject } from '../PrizeSubject';

import winningBadge from '@/assets/images/badge.png';
import loseBadge from '@/assets/images/close.png';

interface PrizeItemProps {
  item: PrizeHistoryItem;
}

export const PrizeItem = ({ item }: PrizeItemProps) => {
  return (
    <div className="relative rounded-md bg-gray-100 p-3 shadow-xl">
      <Image
        removeWrapper
        alt="Card image background"
        className="z-0 mb-3 h-full w-full object-contain"
        src={item.application.imageUrl}
      />
      <div className="absolute left-0 top-0 h-24 w-24">
        {item.isSuccess ? (
          <Image alt="Winning Badge Image" src={winningBadge} />
        ) : (
          <div className="ml-4 mt-4 h-16 w-16">
            <Image alt="lose Badge Image" src={loseBadge} />
          </div>
        )}
      </div>
      <p className="mb-1 text-center text-xl font-bold">
        {item.application.title}
      </p>
      <div className="mb-3 flex w-full gap-3 text-center">
        <PrizeSubject
          color={`${item.isSuccess ? 'primary' : 'warning'}`}
          subject="당첨 여부"
          value={`${item.isSuccess ? '성공' : '실패'}`}
        />
        <PrizeSubject
          color="primary"
          subject="당첨 확률"
          value={`${(item.application.probability as number) * 100}%`}
        />
        <PrizeSubject
          color="primary"
          subject="응모 가격"
          value={`${item.application.price}P`}
        />
      </div>
      <div className="flex gap-3">
        <Link className="flex-1" target="_blank" to={item.transactionUrl}>
          <Button className="w-full">블록체인 기록 보기</Button>
        </Link>
      </div>
    </div>
  );
};
