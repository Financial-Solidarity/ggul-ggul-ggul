import { create } from 'zustand';

interface CreateChallengeState {
  step: number;
  competitionType: 'S' | 'T';
  limitParticipant: number;
  isCustomLimit: boolean;
  isBlindness: boolean;
  password: string | null;
  title: string;
  budgetCap: number;
  startDate: {
    year: number;
    month: number;
    day: number;
  } | null;
  startTime: {
    hour: number;
    minute: number;
  } | null;
  endDate: {
    year: number;
    month: number;
    day: number;
  } | null;
  endTime: {
    hour: number;
    minute: number;
  } | null;
  setCompetitionType: (type: 'S' | 'T') => void;
  setLimitParticipant: (limit: number) => void;
  setIsCustomLimit: (isCustom: boolean) => void;
  setIsBlindness: (isBlindness: boolean) => void;
  setPassword: (password: string | null) => void;
  setTitle: (title: string) => void;
  setStartDate: (date: { year: number; month: number; day: number }) => void;
  setStartTime: (time: { hour: number; minute: number }) => void;
  setEndDate: (date: { year: number; month: number; day: number }) => void;
  setEndTime: (time: { hour: number; minute: number }) => void;
  setBudgetCap: (budgetCap: number) => void;
  toNextStep: () => void;
  toPrevStep: () => void;
  resetState: () => void;
}

export const LAST_STEP = 5;

export const useCreateChallengeStore = create<CreateChallengeState>(
  (set, get) => ({
    step: 1,
    competitionType: 'S',
    limitParticipant: 2,
    isCustomLimit: false,
    isBlindness: false,
    password: null,
    title: '',
    budgetCap: 0,
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null,
    setCompetitionType: (type: 'S' | 'T') => {
      set({ competitionType: type });
    },
    setLimitParticipant: (limit: number) => {
      set({ limitParticipant: limit });
    },
    setIsCustomLimit: (isCustom: boolean) => {
      set({ isCustomLimit: isCustom });
    },
    setIsBlindness: (isBlindness: boolean) => {
      set({ isBlindness });
    },
    setPassword: (password: string | null) => {
      set({ password });
    },
    setTitle: (title: string) => {
      set({ title });
    },
    setBudgetCap: (budgetCap: number) => {
      set({ budgetCap });
    },
    setStartDate: (date) => {
      set({ startDate: date });
    },
    setStartTime: (time) => {
      set({ startTime: time });
    },
    setEndDate: (date) => {
      set({ endDate: date });
    },
    setEndTime: (time) => {
      set({ endTime: time });
    },
    toNextStep: () => {
      if (get().step >= LAST_STEP) return;
      set((state) => ({ step: state.step + 1 }));
    },
    toPrevStep: () => {
      if (get().step <= 1) return;
      set((state) => ({ step: state.step - 1 }));
    },
    resetState: () => {
      set({
        step: 1,
        competitionType: 'S',
        limitParticipant: 2,
        isCustomLimit: false,
        isBlindness: false,
        password: null,
        title: '',
        budgetCap: 0,
        startDate: null,
        startTime: null,
        endDate: null,
        endTime: null,
      });
    },
  }),
);
