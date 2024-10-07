import toast from 'react-hot-toast';
import { SocketChat } from '@types';

import { useSocketStore } from '../store/useSocketStore';
import { useUserStore } from '../store/userStore';

import { useSocketChattingStore } from '@/modules/challenge/store/socketChattingStore';
import { useSocketChattingRoomListStore } from '@/modules/challenge/store/socketChattingRoomListStore';
import { ChatToast } from '@/modules/challenge/components/chat/ChatToast';

const CHAT_TOAST_NOT_ALLOWED_PATH = [
  '/challenge/chatting-room',
  '/challenge/chatting-rooms',
  '/challenge/solo-chatting',
  '/challenge/team-chatting',
  '/challenge/total-chatting',
  '/challenge/waiting-room',
];

export const useSocket = () => {
  const socket = useSocketStore((state) => state.socket);
  const user = useUserStore((state) => state.user);
  const { addChat } = useSocketChattingStore();
  const { updateChattingRoom } = useSocketChattingRoomListStore();
  const connect = () => {
    socket.onConnect = () => {
      if (!user) return;
      socket.subscribe(`/sub/${user.userId}`, (message) => {
        const { type, data } = JSON.parse(message.body);

        switch (type) {
          case 'COMMON':
          case 'SPEND':
          case 'JUSTIFICATION': {
            const chat: SocketChat = JSON.parse(message.body);

            addChat({ type, ...data });
            updateChattingRoom(chat);
            if (
              !CHAT_TOAST_NOT_ALLOWED_PATH.some((path) =>
                window.location.pathname.startsWith(path),
              )
            ) {
              toast.custom((t) => <ChatToast chat={chat} t={t} />, {
                id: 'chatting',
                duration: 2000,
              });
            }

            break;
          }
        }
      });
    };
    socket.activate();
  };

  const sendChat = ({
    chattingRoomId,
    content,
  }: {
    chattingRoomId: string;
    content: string;
  }) => {
    if (!socket) return;
    if (!user) return;
    try {
      socket.publish({
        destination: `/pub/${user.userId}`,
        body: JSON.stringify({
          chattingRoomId,
          content,
        }),
      });
      console.log('전송');
    } catch (e) {
      socket.onWebSocketError('');
    }
  };

  return { connect, sendChat };
};
