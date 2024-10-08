import { Bars3Icon } from '@heroicons/react/24/outline';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { ExitConfirmModal } from '../components/waitingRoom/ExitConfirmModal';
import { TeamDrawer } from '../components/waitingRoom/TeamDrawer';
import { Chatform } from '../components/chat/ChatForm';
import { ChatList } from '../components/chat/ChatList';
import {
  useGetChallengeDetail,
  useGetChattingroomIds,
} from '../reactQueries/useChallengeQuery';
import { SoloDrawer } from '../components/waitingRoom/SoloDrawer';
import {
  usePreviousChattingList,
  useRecentChattingList,
} from '../reactQueries/useChattingRoomQuery';
import { useSocketChattingStore } from '../store/socketChattingStore';

import { ChallengeInfoAccordion } from '@/modules/challenge/components/waitingRoom/ChallengeInfoAccordion';
import { useSetBottomBar } from '@/modules/common/hooks/useSetBottomBar';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { useSocket } from '@/modules/common/hooks/useSocket';
import { PathNames } from '@/router';

export const WaitingRoomPage = () => {
  useSetBottomBar({ active: false });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { id: challengeId } = useParams();
  const socketChattingList = useSocketChattingStore((state) => state.chatList);
  const clearSocketChattingList = useSocketChattingStore(
    (state) => state.clearChatList,
  );
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  const navigate = useNavigate();

  // 스크롤이 수동으로 이동될 때 자동 스크롤 비활성화
  const handleScroll = () => {
    if (!containerRef.current) return;

    // 현재 스크롤 위치가 가장 아래에 있는지 확인
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const isBottom = scrollTop + clientHeight >= scrollHeight - 100; // 조금의 여유 공간을 둠

    setIsAutoScroll(isBottom);
  };

  const { sendChat, connect } = useSocket();

  const {
    data: { competitionType },
    error: challengeDetailError,
  } = useGetChallengeDetail(challengeId!);
  const {
    data: { lobbyChattingRoomId },
  } = useGetChattingroomIds(challengeId!);

  const { data: previousChattingList } = usePreviousChattingList(
    lobbyChattingRoomId!,
  );
  const { data: recentChattingList } = useRecentChattingList(
    lobbyChattingRoomId!,
  );

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleSubmit = (message: string) => {
    if (!lobbyChattingRoomId) return;
    sendChat({
      chattingRoomId: lobbyChattingRoomId,
      content: message,
    });
  };

  useEffect(() => {
    clearSocketChattingList();
  }, [previousChattingList, recentChattingList]);

  useEffect(() => {
    // 새로운 메시지가 추가될 때만 자동 스크롤
    if (isAutoScroll) {
      bottomRef.current?.scrollIntoView();
    }
  }, [socketChattingList]);

  useEffect(() => {
    if (!challengeDetailError) return;
    if (challengeDetailError.status === 'C001') {
      alert('존재하지 않는 챌린지입니다.');
      navigate(PathNames.CHALLENGE.MAIN.path);
    }
  }, [challengeDetailError]);

  return (
    <>
      <TopBar
        left={<BackButton color="black" />}
        right={
          <Bars3Icon
            className="h-6 w-6 cursor-pointer text-gray-500"
            onClick={openDrawer}
          />
        }
      />
      <PageContainer activePaddingX={false}>
        <div className="relative flex h-full w-full flex-col overflow-y-auto">
          <ChallengeInfoAccordion challengeId={challengeId!} />
          <div
            ref={containerRef}
            className="z-0 overflow-y-auto px-4 py-16"
            onScroll={handleScroll}
          >
            <ChatList
              chats={[
                ...previousChattingList,
                ...recentChattingList,
                ...socketChattingList,
              ]}
            />
            <div ref={bottomRef} />
          </div>
          <Chatform onSubmit={handleSubmit} />
        </div>
      </PageContainer>
      {competitionType === 'S' ? (
        <SoloDrawer
          challengeId={challengeId!}
          isOpen={isDrawerOpen}
          onClose={closeDrawer}
        />
      ) : (
        <TeamDrawer
          isWaitingRoom
          challengeId={challengeId!}
          isOpen={isDrawerOpen}
          onClose={closeDrawer}
        />
      )}
      <ExitConfirmModal challengeId={challengeId!} />
    </>
  );
};
