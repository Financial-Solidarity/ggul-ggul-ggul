import { JustificationChatDTO } from '@types';
import { Image } from '@nextui-org/react';
import { UserIcon } from '@heroicons/react/24/outline';

import { formatWon } from '../../utils/chat';

import { toAMPM_ko } from '@/modules/common/utils/dateUtils';
import Sorry from '@/assets/images/sorry-hand-gesture.png';

interface JustificationChatBubbleProps {
  chat: JustificationChatDTO;
}

export const JustificationChatBubble = ({
  chat,
}: JustificationChatBubbleProps) => {
  return chat.profile.isMine ? (
    <MyJustificationChatBubble chat={chat} />
  ) : (
    <OtherJustificationChatBubble chat={chat} />
  );
};

const MyJustificationChatBubble = ({ chat }: JustificationChatBubbleProps) => {
  const {
    sentAt,
    consumption: { balance, category },
    content,
    img,
  } = chat;

  return (
    <div className="flex w-full items-end justify-end gap-2">
      <p className="text-xs text-default-500">{toAMPM_ko(sentAt)}</p>
      <div className="flex min-w-40 max-w-[50%] flex-col overflow-hidden rounded-lg">
        <div className="relative flex flex-col bg-secondary px-2 py-2 text-default-800">
          <p className="text-sm font-bold">소명합니다</p>
          <p className="text-lg font-black">{formatWon(balance)}</p>
          <p className="text-sm font-bold">{category}</p>
          <div className="absolute -bottom-2 right-2">
            <Image alt="burn-money" height={32} src={Sorry} width={32} />
          </div>
        </div>
        <div className="flex flex-col gap-2 bg-default-200 px-4 py-2 text-sm">
          {img && (
            <div className="h-32 overflow-hidden">
              <Image
                alt="justificationImg"
                className="h-full object-contain"
                src={img}
              />
            </div>
          )}
          <p className="whitespace-pre-wrap text-sm text-default-800">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
};

const OtherJustificationChatBubble = ({
  chat,
}: JustificationChatBubbleProps) => {
  const {
    sentAt,
    consumption: { balance, category },
    profile: { nickname, profileImg },
    content,
    img,
  } = chat;

  return (
    <div className="flex w-full items-start justify-start gap-2">
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
        <div className="flex min-w-40 flex-col overflow-hidden rounded-lg">
          <div className="relative flex flex-col bg-secondary px-2 py-2 text-default-800">
            <p className="text-sm font-bold">소명합니다</p>
            <p className="text-lg font-black">{formatWon(balance)}</p>
            <p className="text-sm font-bold">{category}</p>
            <div className="absolute -bottom-2 right-2">
              <Image alt="burn-money" height={32} src={Sorry} width={32} />
            </div>
          </div>
          <div className="flex flex-col gap-2 bg-default-200 px-4 py-2 text-sm">
            {img && (
              <div className="h-32 overflow-hidden">
                <Image
                  alt="justificationImg"
                  className="h-full object-contain"
                  src={img}
                />
              </div>
            )}
            <p className="whitespace-pre-wrap text-sm text-default-800">
              {content}
            </p>
          </div>
        </div>
      </div>
      <p className="self-end text-xs text-default-500">{toAMPM_ko(sentAt)}</p>
    </div>
  );
};
