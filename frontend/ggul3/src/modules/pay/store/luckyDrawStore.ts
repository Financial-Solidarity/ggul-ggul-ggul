import { create } from 'zustand';
import { LuckyDrawItemDTO } from '@types';

interface LuckDrawState {
  luckDrawList: LuckyDrawItemDTO[];
  setLuckDrawList: (luckDrawList: LuckyDrawItemDTO[]) => void;
}

export const useLuckyDrawStore = create<LuckDrawState>((set, get) => ({
  luckDrawList: [],

  setLuckDrawList: (luckDrawList: LuckyDrawItemDTO[]) => {
    set({ luckDrawList });
  },
}));
