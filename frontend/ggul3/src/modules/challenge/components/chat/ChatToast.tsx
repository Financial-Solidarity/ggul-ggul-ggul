import { UserIcon } from '@heroicons/react/24/outline';
import { Image } from '@nextui-org/react';
import { SocketChat } from '@types';
import toast, { Toast } from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';
import { useNavigate } from 'react-router-dom';

import { useFindChattingRoomStore } from '../../store/findChattingRoomStore';

import { toAMPM_ko } from '@/modules/common/utils/dateUtils';
import { PathNames } from '@/router';

interface ChatToastProps {
  t: Toast;
  chat: SocketChat;
}

export const ChatToast = ({ t, chat }: ChatToastProps) => {
  const navigate = useNavigate();
  const { setChallengeId, setChattingRoomId } = useFindChattingRoomStore();
  const {
    type,
    data,
    data: {
      challengeId,
      chattingRoomId,
      profile: { profileImg, nickname },
      sentAt,
    },
  } = chat;

  const onClickToast = () => {
    toast.dismiss('chatting');
    setChallengeId(challengeId);
    setChattingRoomId(chattingRoomId);
    navigate(PathNames.CHALLENGE.CHATTING_ROOM.path);
  };

  return (
    <div
      className={twMerge([
        t.visible ? 'animate-enter' : 'animate-leave',
        'pointer-events-auto flex w-full max-w-md flex-col rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5',
      ])}
      onClick={onClickToast}
    >
      <div className="flex-1 px-4 py-2">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
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
          </div>
          <div className="ml-3 flex-1">
            <p className="flex items-center gap-2 text-sm font-medium text-default-800">
              <span>{nickname}</span>
              <span className="text-xs text-default-400">
                {toAMPM_ko(sentAt)}
              </span>
            </p>
            <p className="mt-1 line-clamp-2 text-sm text-gray-500">
              {type === 'SPEND' ? '지출 발생' : data.content}
            </p>
          </div>
        </div>
      </div>
      {/* <div className="flex border-l border-gray-200">
        <button
          className="flex w-full items-center justify-center rounded-none rounded-r-lg border border-transparent px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onClick={() => {
            toast.dismiss('chatting');
          }}
        >
          닫기
        </button>
      </div> */}
    </div>
  );
};
