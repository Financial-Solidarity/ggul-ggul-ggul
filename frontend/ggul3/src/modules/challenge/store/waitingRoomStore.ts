import { create } from 'zustand';

interface WaitingRoomState {
  isExitConfirmModalOpen: boolean;
  setIsExitConfirmModalOpen: (isOpen: boolean) => void;
}
export const useWaitingRoomStore = create<WaitingRoomState>((set) => ({
  isExitConfirmModalOpen: false,
  setIsExitConfirmModalOpen: (isOpen) =>
    set({ isExitConfirmModalOpen: isOpen }),
}));
