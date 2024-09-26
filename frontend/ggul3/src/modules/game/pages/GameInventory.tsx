import { MiniTokenBalanceChip } from '../components/common/MiniTokenBalanceChip';

import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { NotificationButton } from '@/modules/common/components/NotificationButton/NotificationButton';
import { useSetBottomBar } from '@/modules/common/hooks/useSetBottomBar';

export const GameInventory = (): JSX.Element => {
  useSetBottomBar({ active: true, isDarkMode: true });

  return (
    <>
      <TopBar
        bgColor="bg-black"
        left={<BackButton />}
        right={<NotificationButton />}
      />
      <PageContainer
        bgColor="bg-black"
        titleContent={
          <div className="flex w-full flex-row justify-end">
            {<MiniTokenBalanceChip />}
          </div>
        }
      >
        <div className="CONTENT-SECTION-TOP flex h-1/2 w-full flex-col items-center justify-center bg-red-500" />
        <div className="CONTENT-SECTION-BOTTOM flex h-1/2 w-full flex-col items-center justify-center bg-blue-500">
          빈공간(바텀시트에 의해 가려질 공간)
        </div>
      </PageContainer>
    </>
  );
};
