import { AccountItemDTO } from '@types';
import { create } from 'zustand';

interface BankAccountState {
  bankAccount: AccountItemDTO | null;
  setBankAccount: (bankAccount: AccountItemDTO | null) => void;
}

export const useBankAccountStore = create<BankAccountState>((set) => ({
  bankAccount: null,
  setBankAccount: (bankAccount) => set({ bankAccount }),
}));
