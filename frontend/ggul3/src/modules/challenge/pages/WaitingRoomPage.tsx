import { Bars3Icon } from '@heroicons/react/24/outline';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

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

import { ChallengeInfoAccordion } from '@/modules/challenge/components/waitingRoom/ChallengeInfoAccordion';
import { useSetBottomBar } from '@/modules/common/hooks/useSetBottomBar';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { useSocket } from '@/modules/common/hooks/useSocket';

export const WaitingRoomPage = () => {
  useSetBottomBar({ active: false });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { id: challengeId } = useParams();
  const [chat, setChat] = useState([]);

  const { sendChat, connect } = useSocket();

  const {
    data: { competitionType },
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
    console.log('lobbyChattingRoomId', lobbyChattingRoomId);
    sendChat({
      chattingRoomId: lobbyChattingRoomId,
      content: message,
    });
  };

  useEffect(() => {
    connect();
  }, []);

  return (
    <>
      <TopBar
        left={<BackButton color="black" />}
        right={
          <Bars3Icon className="h-6 w-6 text-gray-500" onClick={openDrawer} />
        }
      />
      <PageContainer activePaddingX={false}>
        <div className="relative flex h-full w-full flex-col">
          if (!id) return;
          <ChallengeInfoAccordion challengeId={challengeId!} />
          <div className="z-0 overflow-y-auto px-4 py-16">
            <ChatList
              chats={[...previousChattingList, ...recentChattingList]}
            />
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
