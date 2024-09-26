import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { Image } from '@nextui-org/react';
import { useState } from 'react';

interface AccountBookHistoryItemProps {
  imgUrl: string;
  accountName: string;
  active: boolean;
}

export const AccountConnectionItem = ({
  imgUrl,
  accountName,
  active,
}: AccountBookHistoryItemProps) => {
  const [isActive, setIsActive] = useState<boolean>(active);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image sizes={'32'} src={imgUrl} />
          <div className="h-8 w-8 rounded-full bg-gray-400" />
          <div className="ml-2">{accountName}</div>
        </div>
        <div>
          <CheckButton active />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-gray-400" />
          <div className="ml-2">{accountName}</div>
        </div>
        <div>
          <CheckButton />
        </div>
      </div>
    </div>
  );
};

interface CheckButtonProps {
  active?: boolean;
  onClick?: () => void;
}

const CheckButton = ({ active, onClick }: CheckButtonProps) => {
  return (
    <button>
      <CheckCircleIcon
        className={`w-8 rounded-full ${active ? 'bg-primary text-white' : 'text-gray-300'}`}
        onClick={onClick}
      />
    </button>
  );
};
