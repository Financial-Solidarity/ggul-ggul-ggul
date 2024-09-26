import { UserIcon } from '@heroicons/react/24/outline';
import { Image } from '@nextui-org/react';

import { toAMPM_ko } from '@/modules/common/utils/dateUtils';

interface TextChatBubbleProps {
  chattingId: number;
  nickname: string;
  content: string;
  sentAt: string;
  isMine: boolean;
  profileImg?: string;
}

export const TextChatBubble = ({ isMine, ...props }: TextChatBubbleProps) => {
  return isMine ? <MyChatBubble {...props} /> : <OtherChatBubble {...props} />;
};

const MyChatBubble = ({
  sentAt,
  content,
}: Omit<TextChatBubbleProps, 'isMine'>) => {
  return (
    <div className="flex w-full items-end justify-end gap-2">
      <p className="text-xs text-default-500">{toAMPM_ko(sentAt)}</p>

      <div className="max-w-[50%] rounded-xl bg-primary px-2 py-1 text-xs text-white">
        {content}
      </div>
    </div>
  );
};

const OtherChatBubble = ({
  sentAt,
  nickname,
  content,
  profileImg,
}: Omit<TextChatBubbleProps, 'isMine'>) => {
  return (
    <div className="flex items-start justify-start gap-2">
      <div className="h-10 w-10 overflow-hidden rounded-full">
        {profileImg ? (
          <Image
            alt="profileImg"
            className="h-full w-full object-cover"
            src={profileImg}
          />
        ) : (
          <div className="h-full w-full bg-primary p-2 text-white">
            <UserIcon />
          </div>
        )}
      </div>
      <div className="flex max-w-[50%] flex-col gap-1">
        <p className="text-sm text-default-600">{nickname}</p>
        <div className="rounded-xl bg-default-200 px-2 py-1 text-xs text-default-600">
          {content}
        </div>
      </div>
      <p className="self-end text-xs text-default-500">{toAMPM_ko(sentAt)}</p>
    </div>
  );
};
