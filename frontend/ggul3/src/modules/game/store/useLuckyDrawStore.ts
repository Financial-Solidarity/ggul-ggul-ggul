import create from 'zustand';

interface LuckyDrawState {
  step: 'init' | 'drawing' | 'drawed' | 'minting' | 'minted';
  status: number | null;
  startDrawing: () => void;
  stopDrawing: (status: number) => void;
}

export const useLuckyDrawStore = create<LuckyDrawState>((set) => ({
  step: 'init',
  status: null,
  startDrawing: () => set({ step: 'drawing' }),
  stopDrawing: (status) => set({ step: 'drawed', status }),
}));
