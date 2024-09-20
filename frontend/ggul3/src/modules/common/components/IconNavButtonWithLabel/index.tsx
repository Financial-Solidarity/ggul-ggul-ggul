import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  RocketLaunchIcon,
  ChatBubbleOvalLeftIcon,
  BanknotesIcon,
  UserIcon,
  QrCodeIcon,
} from '@heroicons/react/24/outline';

import { Icon } from '../Icon';
import { Typography } from '../Typography';

import { IPath } from '@/router';
import { PathNames } from '@/router';

const IconNavButtonWithLabel = ({ pathName }: { pathName: IPath }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPathname = location.pathname;

  const handleClick = () => {
    navigate(pathName.path, { state: { type: 'parent' } });
  };

  return (
    <div className="cursor-pointer" onClick={handleClick}>
      <Icon
        classNameStyles={`${currentPathname === pathName.path ? '!text-primary-600' : '!text-secondary-300'} transition-colors duration-200`}
        size="md"
      >
        {pathName.path === PathNames.HOME.path && <ChatBubbleOvalLeftIcon />}
        {pathName.path === PathNames.MISSION.path && <RocketLaunchIcon />}
        {pathName.path === PathNames.QUIZ.path && <QrCodeIcon />}
        {pathName.path === PathNames.EGG.path && <UserIcon />}
        {pathName.path === '/menu' && <BanknotesIcon />}
      </Icon>
      <Typography classNameStyles="cursor-default" color="dark" size="xs">
        {pathName.name}
      </Typography>
    </div>
  );
};

export default IconNavButtonWithLabel;
