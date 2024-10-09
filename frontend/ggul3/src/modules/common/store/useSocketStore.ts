import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { create } from 'zustand';

interface SocketState {
  socket: Client;
}

export const useSocketStore = create<SocketState>((set) => ({
  socket: new Client({
    webSocketFactory: () =>
      new SockJS(import.meta.env.VITE_SOCKET_CONNECT_ENDPOINT, null, {
        transports: ['websocket'],
      }),
    reconnectDelay: 1000,
    heartbeatIncoming: 2000,
    heartbeatOutgoing: 2000,
  }),
}));
