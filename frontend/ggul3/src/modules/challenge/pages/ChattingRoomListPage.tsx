import { useGetChattingRoomList } from '../reactQueries/useChattingRoomQuery';
import { ChattingRoomGroup } from '../components/chattingRoomList/ChattingRoomGroup';

import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { useSetBottomBar } from '@/modules/common/hooks/useSetBottomBar';

export const ChattingRoomListPage = () => {
  useSetBottomBar({ active: true, isDarkMode: false });
  const { data } = useGetChattingRoomList();

  return (
    <>
      <TopBar />
      <PageContainer>
        <div className="mb-20 flex flex-col gap-4 py-4">
          {data.map((chattingRoomGroup) => (
            <ChattingRoomGroup
              key={chattingRoomGroup.challenge.challengeId}
              {...chattingRoomGroup}
            />
          ))}
        </div>
      </PageContainer>
    </>
  );
};
