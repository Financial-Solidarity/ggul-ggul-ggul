import React from 'react';

import { buttonStyles } from './BottomBar.styles';

interface BottomBarButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  isDarkMode: boolean;
  onClick: () => void;
}

const BottomBarButton = ({
  icon,
  label,
  isActive,
  isDarkMode,
  onClick,
}: BottomBarButtonProps) => {
  return (
    <li
      className={buttonStyles({
        isActive,
        isDarkMode,
      })}
      onClick={onClick}
    >
      {icon}
      <span className="text-xs">{label}</span>
    </li>
  );
};

export default BottomBarButton;
