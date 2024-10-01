import { ChattingRoomDTO } from '@types';
import { Chip, Image } from '@nextui-org/react';

import { formatUnreadMessageCount } from '../../utils/chat';

import { toAMPM_ko } from '@/modules/common/utils/dateUtils';

interface ChattingRoomProps extends ChattingRoomDTO {
  title: string;
  img: string;
}

export const ChattingRoom = ({
  title,
  img,
  lastChattingContent,
  lastChattingSentAt,
  badge,
}: ChattingRoomProps) => {
  return (
    <div className="flex gap-2">
      <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-default-200">
        <Image className="h-full w-full object-cover" src={img} />
      </div>
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-default-800">{title}</p>
          {lastChattingSentAt && (
            <p className="text-xs text-default-500">
              {toAMPM_ko(lastChattingSentAt)}
            </p>
          )}
        </div>
        <div className="flex w-full justify-between gap-2">
          <p className="line-clamp-2 flex-1 text-xs text-default-500">
            {lastChattingContent}
          </p>
          <div className="">
            {badge > 0 && (
              <Chip color="danger" size="sm">
                {formatUnreadMessageCount(badge)}
              </Chip>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
