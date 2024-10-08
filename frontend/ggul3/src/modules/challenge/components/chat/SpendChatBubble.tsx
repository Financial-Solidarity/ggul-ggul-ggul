import { SpendChatDTO } from '@types';
import { Image } from '@nextui-org/react';
import { UserIcon } from '@heroicons/react/24/outline';

import { formatWon } from '../../utils/chat';
import { useJustifyModalStore } from '../../store/JustifyModalStore';

import { toAMPM_ko } from '@/modules/common/utils/dateUtils';
import BurnMoney from '@/assets/images/burn-money.png';

interface SpendChatBubbleProps {
  chat: SpendChatDTO;
}

export const SpendChatBubble = ({ chat }: SpendChatBubbleProps) => {
  return chat.profile.isMine ? (
    <MySpendChatBubble chat={chat} />
  ) : (
    <OtherSpendChatBubble chat={chat} />
  );
};

const MySpendChatBubble = ({ chat }: SpendChatBubbleProps) => {
  const openModal = useJustifyModalStore((state) => state.open);
  const setSpendChat = useJustifyModalStore((state) => state.setSpendChat);

  const {
    sentAt,
    consumption: { balance, category },
  } = chat;

  const onClickJustify = () => {
    setSpendChat(chat);
    openModal();
  };

  return (
    <div className="flex w-full items-end justify-end gap-2">
      <p className="text-xs text-default-500">{toAMPM_ko(sentAt)}</p>
      <div className="flex min-w-52 flex-col overflow-hidden rounded-lg">
        <div className="relative flex flex-col bg-secondary px-2 py-2 text-default-800">
          <p className="text-sm font-bold">지출발생</p>
          <p className="text-lg font-black">{formatWon(balance)}</p>
          <p className="text-sm font-bold">{category}</p>
          <div className="absolute -bottom-2 right-2">
            <Image alt="burn-money" height={32} src={BurnMoney} width={32} />
          </div>
        </div>
        <button
          className="bg-default-200 px-4 py-2 font-bold text-default-600"
          onClick={onClickJustify}
        >
          소명하기
        </button>
      </div>
    </div>
  );
};

const OtherSpendChatBubble = ({ chat }: SpendChatBubbleProps) => {
  const {
    sentAt,
    consumption: { balance, category },
    profile: { nickname, profileImg },
  } = chat;

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
        <div className="flex min-w-40 flex-col overflow-hidden rounded-lg">
          <div className="relative flex flex-col bg-secondary px-2 py-2 text-default-800">
            <p className="text-sm font-bold">지출발생</p>
            <p className="text-lg font-black">{formatWon(balance)}</p>
            <p className="text-sm font-bold">{category}</p>
            <div className="absolute bottom-2 right-2">
              <Image alt="burn-money" height={32} src={BurnMoney} width={32} />
            </div>
          </div>
        </div>
      </div>
      <p className="self-end text-xs text-default-500">{toAMPM_ko(sentAt)}</p>
    </div>
  );
};
