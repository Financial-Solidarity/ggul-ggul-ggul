import { useEffect } from 'react';

import { useGetChattingRoomList } from '../reactQueries/useChattingRoomQuery';
import { ChattingRoomGroup } from '../components/chattingRoomList/ChattingRoomGroup';
import { useSocketChattingRoomListStore } from '../store/socketChattingRoomListStore';

import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { useSetBottomBar } from '@/modules/common/hooks/useSetBottomBar';
import { NavTitle } from '@/modules/common/components';
import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { NotificationButton } from '@/modules/common/components/NotificationButton/NotificationButton';

export const ChattingRoomListPage = () => {
  useSetBottomBar({ active: true, isDarkMode: false });
  const { chattingRoomList, setChattingRoomList } =
    useSocketChattingRoomListStore();
  const { data } = useGetChattingRoomList();

  useEffect(() => {
    if (!data) return;
    setChattingRoomList(data);
  }, [data]);

  return (
    <>
      <TopBar
        center={<NavTitle title="채팅방" />}
        left={<BackButton color="black" />}
        right={<NotificationButton color="black" />}
      />
      <PageContainer>
        <div className="mb-20 flex flex-col gap-4 py-4">
          {chattingRoomList.map((chattingRoomGroup) => (
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
