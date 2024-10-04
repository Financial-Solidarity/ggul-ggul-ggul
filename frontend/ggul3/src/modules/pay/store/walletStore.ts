import { create } from 'zustand';
import { WalletDTO } from '@types';

import { getMyGgulToken, getMyWallet } from '../apis/wallet';

interface WalletState {
  myWallet: WalletDTO | null;
  ggulToken: number;
  setMyWallet: (myWallet: WalletDTO) => void;
  getMyWallet: () => void;
  setGgulToken: (ggulToken: number) => void;
  getMyGgulToken: () => void;
}

export const useWalletStore = create<WalletState>((set, get) => ({
  myWallet: null,
  ggulToken: 0,

  setMyWallet: (myWallet: WalletDTO) => {
    set({ myWallet });
  },

  getMyWallet: async () => {
    const { address, privateKey } = await getMyWallet();

    set({ myWallet: { address, privateKey } });
  },

  setGgulToken: (ggulToken: number) => {
    set({ ggulToken });
  },

  getMyGgulToken: async () => {
    const { balance } = await getMyGgulToken();

    set({ ggulToken: balance });
  },
}));
