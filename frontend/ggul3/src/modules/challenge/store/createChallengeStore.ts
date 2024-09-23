import { create } from 'zustand';

interface CreateChallengeState {
  step: number;
  competitionType: 'S' | 'T' | null;
  setCompetitionType: (type: 'S' | 'T') => void;
  toNextStep: () => void;
  toPrevStep: () => void;
}

export const LAST_STEP = 5;

export const useCreateChallengeStore = create<CreateChallengeState>(
  (set, get) => ({
    step: 1,
    competitionType: null,
    setCompetitionType: (type: 'S' | 'T') => {
      set({ competitionType: type });
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
