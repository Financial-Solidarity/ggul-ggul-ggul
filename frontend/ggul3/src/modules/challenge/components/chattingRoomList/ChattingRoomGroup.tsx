import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { ChattingRoomDTO } from '@types';
import { twMerge } from 'tailwind-merge';

import { ChattingRoom } from './ChattingRoom';

import { toYYMDhm } from '@/modules/common/utils/dateUtils';
import Solo from '@/assets/images/fist_hand.png';
import Team from '@/assets/images/charity_group.png';

interface ChattingRoomGroupProps {
  challenge: {
    challengeId: string;
    title: string;
    isEncrypted: boolean;
    competitionType: 'T' | 'S';
    isBlindness: boolean;
    limitParticipant: number;
    currentParticipant: number;
    budgetCap: string;
    startAt: string;
    endAt: string;
    isOwner: boolean;
    isEnd: boolean;
  };
  totalChattingRoom: ChattingRoomDTO;
  myTeamChattingRoom: ChattingRoomDTO | null;
}

export const ChattingRoomGroup = ({
  challenge,
  totalChattingRoom,
  myTeamChattingRoom,
}: ChattingRoomGroupProps) => {
  const { title, competitionType, startAt, endAt, isEnd } = challenge;

  return (
    <Card shadow="sm">
      <CardHeader>
        <div className="flex w-full items-center justify-between">
          <h3 className="font-bold text-default-800">{title}</h3>
          <span
            className={twMerge([
              'font-bold',
              competitionType === 'T' ? 'text-secondary' : 'text-success',
            ])}
          >
            {competitionType === 'T' ? '팀전' : '개인전'}
          </span>
        </div>
      </CardHeader>
      <CardBody className="py-0">
        <div className="flex w-full flex-col gap-2">
          <ChattingRoom img={Team} title="전체 채팅방" {...totalChattingRoom} />

          {myTeamChattingRoom && (
            <>
              <hr className="border border-dashed" />
              <ChattingRoom
                img={Solo}
                title="팀 채팅방"
                {...myTeamChattingRoom}
              />
            </>
          )}
        </div>
      </CardBody>
      <CardFooter>
        <div className="flex items-center gap-2">
          <span
            className={twMerge([
              'font-bold',
              isEnd ? 'text-default-600' : 'text-success',
            ])}
          >
            {isEnd ? '종료' : '진행중'}
          </span>
          <p className="flex items-center gap-1 text-sm text-default-500">
            <span>{toYYMDhm(startAt)}</span>
            <span>~</span>
            <span>{toYYMDhm(endAt)}</span>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};
