import { useLocation, useNavigate } from 'react-router-dom';
import {
  RocketLaunchIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  CalendarIcon,
  UserCircleIcon,
  QrCodeIcon,
} from '@heroicons/react/24/outline';

import { useBottomBarStore } from '../../../store/useBottomBarStore';

import BottomBarButton from './BottomBarButton';
import { centerButtonStyles, boxShadowStyle } from './BottomBar.styles';

import { PathNames } from '@/router';
import { zIndex } from '@/modules/common/constants/zIndex';

export const BottomBar = () => {
  const { active, isDarkMode } = useBottomBarStore();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPathname = location.pathname;

  const isCurrentPath = (path: string) => currentPathname.includes(path);

  const handleNavigation = (path: string) => {
    navigate(path, { replace: true });
  };

  if (!active) return null;

  return (
    <div
      className={`BOTTOM-BAR fixed rounded-t-2xl border-t-2 ${
        isDarkMode ? 'border-[#494949] bg-zinc-800' : 'border-gray-300 bg-white'
      } bottom-0 ${zIndex.NAVIGATION} flex h-16 w-full items-center justify-between px-2 transition-colors duration-300`}
    >
      <ul className="flex w-full flex-row items-center justify-between px-4">
        {/* 좌측 버튼 */}
        <ul className="flex flex-row gap-7">
          <BottomBarButton
            icon={
              <ChatBubbleOvalLeftEllipsisIcon className="mb-[2px] h-7 w-7" />
            }
            isActive={isCurrentPath(PathNames.CHALLENGE.MAIN.path)}
            isDarkMode={isDarkMode}
            label="챌린지"
            onClick={() => handleNavigation(PathNames.CHALLENGE.MAIN.path)}
          />
          <BottomBarButton
            icon={<RocketLaunchIcon className="mb-[2px] h-7 w-7" />}
            isActive={isCurrentPath(PathNames.GAME.MAIN.path)}
            isDarkMode={isDarkMode}
            label="껄키우기"
            onClick={() => handleNavigation(PathNames.GAME.MAIN.path)}
          />
        </ul>

        {/* 중앙 버튼 */}
        <div
          className="absolute bottom-2 left-1/2 -translate-x-1/2 transform cursor-pointer"
          onClick={() => handleNavigation(PathNames.GGULPAY.MAIN.path)}
        >
          <div
            className={centerButtonStyles({
              isActive: isCurrentPath(PathNames.GGULPAY.MAIN.path),
            })}
            style={{
              boxShadow: boxShadowStyle(
                isCurrentPath(PathNames.GGULPAY.MAIN.path),
              ),
            }}
          >
            <QrCodeIcon className="h-8 w-8 text-white" />
          </div>
        </div>

        {/* 우측 버튼 */}
        <ul className="flex flex-row gap-7">
          <BottomBarButton
            icon={<CalendarIcon className="mb-[2px] h-7 w-7" />}
            isActive={isCurrentPath(PathNames.ACCOUNT_BOOK.MAIN.path)}
            isDarkMode={isDarkMode}
            label="가계부"
            onClick={() => handleNavigation(PathNames.ACCOUNT_BOOK.MAIN.path)}
          />
          <BottomBarButton
            icon={<UserCircleIcon className="mb-[2px] h-7 w-7" />}
            isActive={isCurrentPath(PathNames.MYPAGE.MAIN.path)}
            isDarkMode={isDarkMode}
            label="마이페이지"
            onClick={() => handleNavigation(PathNames.MYPAGE.MAIN.path)}
          />
        </ul>
      </ul>
    </div>
  );
};
