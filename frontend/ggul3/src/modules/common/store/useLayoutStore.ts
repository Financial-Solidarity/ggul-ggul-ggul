import { create } from 'zustand';

export interface LayoutState {
  isBottomBarActivated: boolean;
  setIsBottomBarActivated: (param: boolean) => void;

  topBarMenu?: React.ReactNode;
  setTopBarMenu: (newTopButton: React.ReactNode) => void;
}

export const useLayoutStore = create<LayoutState>((set) => ({
  isBottomBarActivated: true,
  topBarMenu: null,

  setTopBarMenu: (newTopButton: React.ReactNode) =>
    set({ topBarMenu: newTopButton }),
  setIsBottomBarActivated: (param: boolean) =>
    set({ isBottomBarActivated: param }),
}));
