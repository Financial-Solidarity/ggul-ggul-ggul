import { ChallengeListItem } from '@types';
import { create } from 'zustand';

interface ChallengeListState {
  item: ChallengeListItem | null;
  isSheetOpen: boolean;
  openSheet: () => void;
  closeSheet: () => void;
  setItem: (item: ChallengeListItem) => void;
}

export const useChallengeListStore = create<ChallengeListState>((set) => ({
  item: null,
  isSheetOpen: false,
  openSheet: () => set({ isSheetOpen: true }),
  closeSheet: () => set({ isSheetOpen: false }),
  setItem: (item) => set({ item }),
}));
