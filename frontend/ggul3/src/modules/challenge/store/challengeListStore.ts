import { ChallengeListItem } from '@types';
import { create } from 'zustand';

interface ChallengeListState {
  challengeList: ChallengeListItem[];
  item: ChallengeListItem;
  isSheetOpen: boolean;
  openSheet: () => void;
  closeSheet: () => void;
  setChallengeList: (challengeList: ChallengeListItem[]) => void;
  setItem: (item: ChallengeListItem) => void;
}

export const useChallengeListStore = create<ChallengeListState>((set) => ({
  challengeList: [],
  item: {} as ChallengeListItem,
  isSheetOpen: false,
  openSheet: () => set({ isSheetOpen: true }),
  closeSheet: () => set({ isSheetOpen: false }),
  setChallengeList: (challengeList) => set({ challengeList }),
  setItem: (item) => set({ item }),
}));
