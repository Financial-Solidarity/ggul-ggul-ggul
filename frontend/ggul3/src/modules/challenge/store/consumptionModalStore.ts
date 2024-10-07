import { create } from 'zustand';

interface ConsumptionModalState {
  isOpen: boolean;
  challengeId: string;
  setIsOpen: (isOpen: boolean) => void;
  setChallengeId: (challengeId: string) => void;
}

export const useConsumptionModalStore = create<ConsumptionModalState>(
  (set) => ({
    isOpen: false,
    challengeId: '',
    setIsOpen: (isOpen: boolean) => set({ isOpen }),
    setChallengeId: (challengeId: string) => set({ challengeId }),
  }),
);
