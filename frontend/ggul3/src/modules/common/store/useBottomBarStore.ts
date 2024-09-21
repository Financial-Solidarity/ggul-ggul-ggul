import { create } from 'zustand';

export interface BottomBarState {
  active: boolean;
  isDarkMode: boolean;
  setActive: (param: boolean) => void;
  setIsDarkMode: (param: boolean) => void;
}

export const useBottomBarStore = create<BottomBarState>((set) => ({
  active: true,
  isDarkMode: false,
  setActive: (param: boolean) => set({ active: param }),
  setIsDarkMode: (param: boolean) => set({ isDarkMode: param }),
}));
