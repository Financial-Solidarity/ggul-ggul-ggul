import { Bars3Icon } from '@heroicons/react/24/outline';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

import { ExitConfirmModal } from '../components/waitingRoom/ExitConfirmModal';
import { TeamDrawer } from '../components/waitingRoom/TeamDrawer';
import { Chatform } from '../components/chat/ChatForm';
import { ChatList } from '../components/chat/ChatList';

import { ChallengeInfoAccordion } from '@/modules/challenge/components/waitingRoom/ChallengeInfoAccordion';
import { useSetBottomBar } from '@/modules/common/hooks/useSetBottomBar';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { BackButton } from '@/modules/common/components/BackButton/BackButton';

export const WaitingRoomPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { id } = useParams();

  useSetBottomBar({ active: false });

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const sendChat = (message: string) => {
    console.log(message);
  };

  if (!id) return;

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
          <ChallengeInfoAccordion challengeId={id} />
          <div className="z-0 overflow-y-auto px-4 py-16">
            <ChatList chats={[]} />
          </div>
          <Chatform onSubmit={sendChat} />
        </div>
      </PageContainer>
      {/* <SoloDrawer isOpen={isDrawerOpen} onClose={closeDrawer} /> */}
      <TeamDrawer isOpen={isDrawerOpen} onClose={closeDrawer} />
      <ExitConfirmModal />
    </>
  );
};
