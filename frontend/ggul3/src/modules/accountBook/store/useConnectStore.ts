import { Account } from '@types';
import { create } from 'zustand';

interface UseConnectAccountState {
  modalStep: 'connecting' | 'connected' | 'failed';
  isConnectModalOpen: boolean;
  selectedAccount: Account;
  isSelected: boolean;
  accountList: Account[];
  currentAccount: Account;
  initializeModalStates: () => void;
  setModalStep: (step: 'connecting' | 'connected' | 'failed') => void;
  setConnectModalOpen: (isOpen: boolean) => void;
  setAccountList: (accountList: Account[]) => void;
  setCurrentAccount: (accountNo: Account) => void;
  handleClickAccount: (account: Account) => void;
}

export const useConnectStore = create<UseConnectAccountState>((set) => ({
  modalStep: 'failed',
  isConnectModalOpen: false,
  selectedAccount: {
    id: -1,
    name: '',
    accountNo: '',
  },
  isSelected: false,
  currentAccount: {
    id: -1,
    name: '',
    accountNo: '',
  },
  accountList: [],

  initializeModalStates: () => {
    set((state) => ({
      ...state,
      modalStep: 'connecting',
      isConnectModalOpen: false,
      selectedAccount: {
        id: -1,
        name: '',
        accountNo: '',
      },
      isSelected: false,
    }));
  },

  setModalStep: (step: 'connecting' | 'connected' | 'failed') => {
    set((state) => ({
      ...state,
      modalStep: step,
    }));
  },

  setConnectModalOpen: (isOpen: boolean) => {
    set((state) => ({
      ...state,
      isConnectModalOpen: isOpen,
    }));
  },

  setCurrentAccount: (accountNo: Account) => {
    set((state) => ({
      ...state,
      currentAccount: accountNo,
    }));
  },

  setAccountList: (accountList: Account[]) => {
    set((state) => ({
      ...state,
      accountList,
    }));
  },

  handleClickAccount: (account: Account) => {
    set((state) => ({
      ...state,
      selectedAccount: account,
      isSelected: true,
    }));
  },
}));
