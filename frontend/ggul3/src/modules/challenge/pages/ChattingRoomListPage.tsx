import { useGetChattingRoomList } from '../reactQueries/useChattingRoomQuery';
import { ChattingRoomGroup } from '../components/chattingRoomList/ChattingRoomGroup';

import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { useSetBottomBar } from '@/modules/common/hooks/useSetBottomBar';
import { NavTitle } from '@/modules/common/components';
import { BackButton } from '@/modules/common/components/BackButton/BackButton';

export const ChattingRoomListPage = () => {
  useSetBottomBar({ active: true, isDarkMode: false });
  const { data } = useGetChattingRoomList();

  return (
    <>
      <TopBar
        center={<NavTitle title="채팅방" />}
        left={<BackButton color="black" />}
      />
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
