import { UserIcon } from '@heroicons/react/24/outline';
import { Image } from '@nextui-org/react';
import { twMerge } from 'tailwind-merge';

interface ParticipantProps {
  nickname: string;
  isMe?: boolean;
  img?: string;
}

export const Participant = ({
  nickname,
  isMe = false,
  img,
}: ParticipantProps) => {
  return (
    <div className="flex w-full items-center px-4 py-2">
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 overflow-hidden rounded-full">
          {img ? (
            <Image
              alt="profile"
              className="h-full w-full object-cover"
              src={img}
            />
          ) : (
            <div className="h-full w-full bg-primary p-2 text-white">
              <UserIcon />
            </div>
          )}
        </div>

        <span className={twMerge([isMe && 'font-bold'])}>{nickname}</span>
        {isMe && (
          <div className="ml-2 flex h-6 w-6 items-center justify-center rounded bg-primary p-1 text-xs text-white">
            나
          </div>
        )}
      </div>
    </div>
  );
};
