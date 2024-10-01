import { MiniTokenBalanceChip } from '../components/common/MiniTokenBalanceChip';

import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { NotificationButton } from '@/modules/common/components/NotificationButton/NotificationButton';
import { useSetBottomBar } from '@/modules/common/hooks/useSetBottomBar';
import './GameGame.css'; // 스타일 파일 가져오기

export const GameGame = () => {
  useSetBottomBar({ active: true, isDarkMode: true });

  return (
    <>
      <TopBar
        bgColor="bg-black"
        left={<BackButton />}
        right={<NotificationButton />}
      />
      <PageContainer bgColor="bg-black" titleContent={<MiniTokenBalanceChip />}>
        <div className="h-2/5 bg-red-500">
          <div className="flex items-center justify-center">
            <div className="sprite-container" />{' '}
          </div>
        </div>
        <div className="h-3/5 bg-blue-500" />
      </PageContainer>

      {/* 스프라이트 애니메이션을 위한 컨테이너 */}
    </>
  );
};
