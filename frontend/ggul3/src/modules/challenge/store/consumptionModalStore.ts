import { create } from 'zustand';

interface ConsumptionModalState {
  isOpen: boolean;
  challengeId: string;
  isTotalChattingRoom: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setChallengeId: (challengeId: string) => void;
  setIsTotalChattingRoom: (isTotalChattingRoom: boolean) => void;
}

export const useConsumptionModalStore = create<ConsumptionModalState>(
  (set) => ({
    isOpen: false,
    challengeId: '',
    isTotalChattingRoom: false,
    setIsOpen: (isOpen: boolean) => set({ isOpen }),
    setChallengeId: (challengeId: string) => set({ challengeId }),
    setIsTotalChattingRoom: (isTotalChattingRoom: boolean) =>
      set({ isTotalChattingRoom }),
  }),
);
