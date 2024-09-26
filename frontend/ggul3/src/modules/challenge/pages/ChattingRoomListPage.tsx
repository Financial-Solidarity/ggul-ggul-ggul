import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { useSetBottomBar } from '@/modules/common/hooks/useSetBottomBar';

export const ChattingRoomListPage = () => {
  useSetBottomBar({ active: true, isDarkMode: false });

  return (
    <>
      <TopBar />
      <PageContainer>
        <div className="mb-20 flex flex-col gap-2">chattingroomlist</div>
      </PageContainer>
    </>
  );
};
