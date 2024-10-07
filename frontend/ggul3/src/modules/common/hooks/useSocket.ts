import { useSocketStore } from '../store/useSocketStore';
import { useUserStore } from '../store/userStore';

import { useSocketChattingStore } from '@/modules/challenge/store/socketChattingStore';
import { useSocketChattingRoomListStore } from '@/modules/challenge/store/socketChattingRoomListStore';

export const useSocket = () => {
  const socket = useSocketStore((state) => state.socket);
  const user = useUserStore((state) => state.user);
  const { addChat, chatList } = useSocketChattingStore();
  const { updateChattingRoom } = useSocketChattingRoomListStore();
  const connect = () => {
    socket.onConnect = () => {
      if (!user) return;
      socket.subscribe(`/sub/${user.userId}`, (message) => {
        const { type, data } = JSON.parse(message.body);

        console.log(JSON.parse(message.body));
        switch (type) {
          case 'COMMON':
          case 'SPEND':
          case 'JUSTIFICATION': {
            addChat({ type, ...data });
            updateChattingRoom(JSON.parse(message.body));
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
