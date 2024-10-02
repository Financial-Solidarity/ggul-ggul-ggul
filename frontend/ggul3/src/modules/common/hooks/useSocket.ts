import { useSocketStore } from '../store/useSocketStore';
import { useUserStore } from '../store/userStore';

import { useSocketChattingStore } from '@/modules/challenge/store/socketChattingStore';

// export const useSocket = (
//   userId: string = '31000000-0000-0000-0000-000000000000',
//   server: string = 'https://e96b-14-46-142-193.ngrok-free.app/stomp/connection',
//   // server: string = 'https://ggul3.kro.kr/stomp/connection',
// ) => {
//   const socketRef = useRef<Client>();
//   const connect = () => {
//     socketRef.current = new Client({
//       webSocketFactory: () =>
//         new SockJS(server, null, {
//           transports: ['websocket', 'jsonp'],
//         }),
//       reconnectDelay: 5000,
//       heartbeatIncoming: 4000,
//       heartbeatOutgoing: 4000,
//     });
//     const socket = socketRef.current;

//     if (!socket) {
//       return;
//     }

//     socket.onConnect = () => {
//       socket.subscribe(`/sub/${userId}`, (message) => {
//         console.log('웹소켓 subscribe', message);
//         console.log(JSON.parse(message.body));
//       });
//     };

//     socket.activate();
//   };

//   //     switch (type) {
//   //       case 'chat': {
//   //         const socket = socketRef.current;

//   //         if (!socket) {
//   //           return;
//   //         }

//   //         try {
//   //           socket.publish({
//   //             destination: `/pub/${avatarId}`,
//   //             body: JSON.stringify({
//   //               chatContent: content,
//   //               sendedAt: date,
//   //             }),
//   //           });
//   //           addLog({
//   //             me: true,
//   //             name: '나',
//   //             message: content,
//   //             dateTime: date,
//   //             avatarId,
//   //             type: 'chat',
//   //             data: null,
//   //           });
//   //           onSend();
//   //         } catch (error) {
//   //           socket.onWebSocketError('');
//   //         }

//   //         break;
//   //       }
//   //       case 'account': {
//   //         addLog({
//   //           me: true,
//   //           name: '나',
//   //           message: content,
//   //           dateTime: date,
//   //           avatarId,
//   //           type: 'account',
//   //           data: null,
//   //         });
//   //         onSend();

//   //         const result = await addAccountByChat({ query: content });
//   //         accountRef.current(result.data);
//   //         addLog({
//   //           me: false,
//   //           name: '',
//   //           message: content,
//   //           dateTime: date,
//   //           avatarId,
//   //           type: 'account',
//   //           data: result.data,
//   //         });
//   //         break;
//   //       }
//   //       case 'schedule': {
//   //         addLog({
//   //           me: true,
//   //           name: '나',
//   //           message: content,
//   //           dateTime: date,
//   //           avatarId,
//   //           type: 'schedule',
//   //           data: null,
//   //         });
//   //         onSend();

//   //         const result = await addScheduleByChat({ query: content });
//   //         scheduleRef.current(result.data);
//   //         addLog({
//   //           me: false,
//   //           name: '',
//   //           message: content,
//   //           dateTime: date,
//   //           avatarId,
//   //           type: 'schedule',
//   //           data: result.data,
//   //         });
//   //         break;
//   //       }
//   //     }
//   //   };

//   const sendChat = ({
//     chattingRoomId,
//     content,
//   }: {
//     chattingRoomId: string;
//     content: string;
//   }) => {
//     const socket = socketRef.current;

//     if (!socket) return;
//     console.log('오나?');
//     try {
//       socket.publish({
//         destination: `/pub/${userId}`,
//         body: JSON.stringify({
//           chattingRoomId,
//           content,
//         }),
//       });
//       console.log('전송');
//     } catch (e) {
//       socket.onWebSocketError('');
//     }
//   };

//   useEffect(() => {
//     return () => {
//       const socket = socketRef.current;

//       socket?.deactivate();
//     };
//   }, []);

//   return { connect, sendChat };
// };

export const useSocket = () => {
  const socket = useSocketStore((state) => state.socket);
  const user = useUserStore((state) => state.user);
  const { addChat, chatList } = useSocketChattingStore();

  const connect = () => {
    socket.onConnect = () => {
      socket.subscribe(`/sub/${user.userId}`, (message) => {
        const { type, data } = JSON.parse(message.body);

        switch (type) {
          case 'COMMON': {
            addChat({ type, ...data });
            console.log(chatList);
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
