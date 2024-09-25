import { Bars3Icon } from '@heroicons/react/24/outline';

import { useSetBottomBar } from '@/modules/common/hooks/useSetBottomBar';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { BackButton } from '@/modules/common/components/BackButton/BackButton';

export const WaitingRoomPage = () => {
  useSetBottomBar({ active: false });

  return (
    <>
      <TopBar
        left={<BackButton color="black" />}
        right={<Bars3Icon className="h-6 w-6 text-gray-500" />}
      />
      <PageContainer>
        <div className="flex h-full w-full flex-col">asdasd</div>
      </PageContainer>
    </>
  );
};
