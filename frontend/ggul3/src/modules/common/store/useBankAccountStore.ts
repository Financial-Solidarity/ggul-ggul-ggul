import { BankAccountDTO } from '@types';
import { create } from 'zustand';

interface BankAccountState {
  bankAccount: BankAccountDTO | null;
  setBankAccount: (bankAccount: BankAccountDTO | null) => void;
}

export const useBankAccountStore = create<BankAccountState>((set) => ({
  bankAccount: null,
  setBankAccount: (bankAccount) => set({ bankAccount }),
}));
