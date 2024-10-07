import { useEffect } from 'react';
import { Button, Skeleton } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

import { useGetChattingRoomList } from '../reactQueries/useChattingRoomQuery';
import { ChattingRoomGroup } from '../components/chattingRoomList/ChattingRoomGroup';
import { useSocketChattingRoomListStore } from '../store/socketChattingRoomListStore';

import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { useSetBottomBar } from '@/modules/common/hooks/useSetBottomBar';
import { NavTitle } from '@/modules/common/components';
import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { NothingLottie } from '@/modules/game/components/common/Lotties/NothingLottie';
import { PathNames } from '@/router';

export const ChattingRoomListPage = () => {
  useSetBottomBar({ active: true, isDarkMode: false });
  const { chattingRoomList, setChattingRoomList } =
    useSocketChattingRoomListStore();
  const { data, isFetching } = useGetChattingRoomList();

  const navigate = useNavigate();

  const toChallengeList = () => {
    navigate(PathNames.CHALLENGE.MAIN.path);
  };

  useEffect(() => {
    if (!data) return;
    setChattingRoomList(data);
  }, [data]);

  return (
    <>
      <TopBar
        center={<NavTitle title="채팅방" />}
        left={<BackButton color="black" />}
      />
      <PageContainer>
        {isFetching ? (
          <div className="flex flex-col gap-2">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <Skeleton key={index} className="rounded-2xl">
                  <div className="h-36 w-full" />
                </Skeleton>
              ))}
          </div>
        ) : chattingRoomList.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2">
            <NothingLottie />
            <p className="text-center text-default-500">채팅방이 없어요</p>
            <Button color="primary" onClick={toChallengeList}>
              챌린지 하러가기
            </Button>
          </div>
        ) : (
          <div className="mb-20 flex flex-col gap-4 py-4">
            {chattingRoomList.map((chattingRoomGroup) => (
              <ChattingRoomGroup
                key={chattingRoomGroup.challenge.challengeId}
                {...chattingRoomGroup}
              />
            ))}
          </div>
        )}
      </PageContainer>
    </>
  );
};
