import { Bars3Icon } from '@heroicons/react/24/outline';
import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

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
import { useConsumptionModalStore } from '../store/consumptionModalStore';
import { ChallengeResultAccordion } from '../components/chat/ChallengeResultAccordion';

import { useSetBottomBar } from '@/modules/common/hooks/useSetBottomBar';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { useSocket } from '@/modules/common/hooks/useSocket';
import { beforeNow, formatCountdown } from '@/modules/common/utils/dateUtils';
import { useCountdown } from '@/modules/common/hooks/useCountDown';

export const TeamChattingRoomPage = () => {
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
  const { setChallengeId, setIsOpen, setIsTotalChattingRoom } =
    useConsumptionModalStore();

  const [isEndChallenge, setIsEndChallenge] = useState(false);

  // 스크롤이 수동으로 이동될 때 자동 스크롤 비활성화
  const handleScroll = () => {
    if (!containerRef.current) return;

    // 현재 스크롤 위치가 가장 아래에 있는지 확인
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const isBottom = scrollTop + clientHeight >= scrollHeight - 100; // 조금의 여유 공간을 둠

    setIsAutoScroll(isBottom);
  };

  const { sendChat } = useSocket();

  const {
    data: { competitionType, endAt },
  } = useGetChallengeDetail(challengeId!);
  const {
    data: { myTeamChattingRoomId },
  } = useGetChattingroomIds(challengeId!);

  const { data: previousChattingList } = usePreviousChattingList(
    myTeamChattingRoomId!,
  );
  const { data: recentChattingList, refetch: refetchRecentChattingList } =
    useRecentChattingList(myTeamChattingRoomId!);

  const countdown = useCountdown(endAt);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleSubmit = (message: string) => {
    if (!myTeamChattingRoomId) return;
    sendChat({
      chattingRoomId: myTeamChattingRoomId,
      content: message,
    });
  };

  const openConsumptionModal = () => {
    setIsTotalChattingRoom(false);
    setChallengeId(challengeId!);
    setIsOpen(true);
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
    return () => {
      if (!myTeamChattingRoomId) return;
      refetchRecentChattingList();
    };
  }, []);

  useEffect(() => {
    setIsEndChallenge(beforeNow(endAt));
  }, [endAt]);

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
        <div className="relative flex h-full w-full flex-col">
          {isEndChallenge ? (
            <ChallengeResultAccordion
              challengeId={challengeId!}
              openDetail={openConsumptionModal}
            />
          ) : (
            <div
              className="fixed z-10 flex w-full cursor-pointer flex-col border-b bg-white"
              onClick={openConsumptionModal}
            >
              <p
                className={twMerge([
                  'flex justify-center gap-1 py-2 text-sm font-semibold text-default-500',
                  countdown.days === 0 &&
                    countdown.hours === 0 &&
                    countdown.minutes < 10 &&
                    'text-danger',
                ])}
              >
                {endAt && (
                  <>
                    <span>종료까지</span>
                    <span>{formatCountdown(countdown)}</span>
                    <span>남음</span>
                  </>
                )}
              </p>
            </div>
          )}
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
          challengeId={challengeId!}
          isOpen={isDrawerOpen}
          onClose={closeDrawer}
        />
      )}
      <ExitConfirmModal challengeId={challengeId!} />
    </>
  );
};
