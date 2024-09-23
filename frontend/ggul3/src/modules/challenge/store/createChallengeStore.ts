import { create } from 'zustand';

interface CreateChallengeState {
  step: number;
  competitionType: 'S' | 'T' | null;
  limitParticipant: number;
  isCustomLimit: boolean; // 참가자수 직접 입력 여부
  setCompetitionType: (type: 'S' | 'T') => void;
  setLimitParticipant: (limit: number) => void;
  setIsCustomLimit: (isCustom: boolean) => void;
  toNextStep: () => void;
  toPrevStep: () => void;
}

export const LAST_STEP = 5;

export const useCreateChallengeStore = create<CreateChallengeState>(
  (set, get) => ({
    step: 1,
    competitionType: null,
    limitParticipant: 0,
    isCustomLimit: false,

    setCompetitionType: (type: 'S' | 'T') => {
      set({ competitionType: type });
    },
    setLimitParticipant: (limit: number) => {
      set({ limitParticipant: limit });
    },
    setIsCustomLimit: (isCustom: boolean) => {
      set({ isCustomLimit: isCustom });
    },
    toNextStep: () => {
      if (get().step >= LAST_STEP) return;
      set((state) => ({ step: state.step + 1 }));
    },
    toPrevStep: () => {
      if (get().step <= 1) return;
      set((state) => ({ step: state.step - 1 }));
    },
  }),
);
