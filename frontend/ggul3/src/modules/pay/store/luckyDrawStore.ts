import { create } from 'zustand';
import { LuckyDrawItemDTO } from '@types';

import { PrizeHistoryItem } from '../apis/luckyDraw';

interface LuckDrawState {
  luckDrawList: LuckyDrawItemDTO[];
  luckDrawHistory: PrizeHistoryItem[];
  setLuckDrawList: (luckDrawList: LuckyDrawItemDTO[]) => void;
  setLuckDrawHistory: (luckDrawHistory: PrizeHistoryItem[]) => void;
}

export const useLuckyDrawStore = create<LuckDrawState>((set, get) => ({
  luckDrawList: [],
  luckDrawHistory: [],

  setLuckDrawList: (luckDrawList: LuckyDrawItemDTO[]) => {
    set({ luckDrawList });
  },

  setLuckDrawHistory: (luckDrawHistory: PrizeHistoryItem[]) => {
    set({ luckDrawHistory });
  },
}));
