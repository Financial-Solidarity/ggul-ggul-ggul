import { create } from 'zustand';

type stepType = 'init' | 'drawing' | 'drawed' | 'minting' | 'minted';

interface LuckyDrawState {
  step: stepType;
  status: number | null;
  initStep: () => void;
  startDrawing: () => void;
  stopDrawing: (status: number) => void;
  startMinting: () => void;
  stopMinting: () => void;
}

export const useLuckyDrawStore = create<LuckyDrawState>((set) => ({
  step: 'init',
  status: null,
  initStep: () => set({ step: 'init', status: null }),
  startDrawing: () => set({ step: 'drawing' }),
  stopDrawing: (status) => set({ step: 'drawed', status }),
  startMinting: () => set({ step: 'minting' }),
  stopMinting: () => set({ step: 'minted' }),
}));
