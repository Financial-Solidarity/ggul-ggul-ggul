import { SpendChatDTO } from '@types';
import { create } from 'zustand';

interface JustifyModalState {
  isOpen: boolean;
  spendChat: SpendChatDTO | null;
  open: () => void;
  close: () => void;
  setIsOpen: (isOpen: boolean) => void;
  setSpendChat: (spendChat: SpendChatDTO) => void;
}

export const useJustifyModalStore = create<JustifyModalState>((set) => ({
  isOpen: false,
  spendChat: null,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  setIsOpen: (isOpen) => set({ isOpen }),
  setSpendChat: (spendChat) => set({ spendChat }),
}));
