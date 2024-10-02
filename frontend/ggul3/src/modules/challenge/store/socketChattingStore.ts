import { Chat } from '@types';
import { create } from 'zustand';

interface SocketChattingState {
  chatList: Chat[];
  clearChatList: () => void;
  addChat: (chat: Chat) => void;
}

export const useSocketChattingStore = create<SocketChattingState>((set) => ({
  chatList: [],
  clearChatList: () => set({ chatList: [] }),
  addChat: (chat) => set((state) => ({ chatList: [...state.chatList, chat] })),
}));
