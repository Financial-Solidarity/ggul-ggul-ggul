import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { ChallengeListItem as ChallengeListItemType } from '@types';
import { twMerge } from 'tailwind-merge';
import { Image } from '@nextui-org/react';

import Lock from '@/assets/images/lock.png';
import { toYYMDhm_ko } from '@/modules/common/utils/dateUtils';

interface ChallengeListItemProps {
  item: ChallengeListItemType;
}

export const ChallengeListItem = ({ item }: ChallengeListItemProps) => {
  const {
    title,
    budgetCap,
    competitionType,
    isEncrypted,
    startDatetime,
    endDatetime,
  } = item;

  return (
    <Card
      isPressable
      className={twMerge([
        competitionType === 'S' ? 'bg-success' : 'bg-secondary',
      ])}
    >
      <CardHeader>
        <h4 className="text-xl font-bold text-white">{title}</h4>
      </CardHeader>
      <CardBody>
        <div className="flex flex-col gap-2 text-white">
          <div>
            <div className="flex items-center">
              <span>{toYYMDhm_ko(startDatetime)}</span>
              <span>부터</span>
            </div>
            <div className="flex items-center">
              <span>{toYYMDhm_ko(endDatetime)}</span>
              <span>까지</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold">예산: {budgetCap} 원</p>
            {isEncrypted && (
              <Image alt="lock" className="h-8 w-8 object-contain" src={Lock} />
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
