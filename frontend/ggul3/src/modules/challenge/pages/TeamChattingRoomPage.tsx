import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Bars3Icon } from '@heroicons/react/24/outline';

import { Chatform } from '../components/chat/ChatForm';

import { useSetBottomBar } from '@/modules/common/hooks/useSetBottomBar';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';

export const TeamChattingRoomPage = () => {
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
          <Bars3Icon
            className="h-6 w-6 cursor-pointer text-gray-500"
            onClick={openDrawer}
          />
        }
      />
      <PageContainer activePaddingX={false}>
        <div className="relative flex h-full w-full flex-col">
          <div className="z-0 overflow-y-auto px-4 py-16">asdasd</div>
          <Chatform onSubmit={sendChat} />
        </div>
      </PageContainer>
    </>
  );
};
