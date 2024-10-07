import { AccountItemDTO } from '@types';
import { create } from 'zustand';

interface UseConnectAccountState {
  modalStep: 'connecting' | 'connected' | 'failed';
  isConnectModalOpen: boolean;
  selectedAccount: AccountItemDTO | null;
  isSelected: boolean;
  accountList: AccountItemDTO[];
  currentAccount: AccountItemDTO | null;
  initializeModalStates: () => void;
  setModalStep: (step: 'connecting' | 'connected' | 'failed') => void;
  setConnectModalOpen: (isOpen: boolean) => void;
  setAccountList: (accountList: AccountItemDTO[]) => void;
  setCurrentAccount: (account: AccountItemDTO | null) => void;
  handleClickAccount: (account: AccountItemDTO) => void;
}

export const useConnectStore = create<UseConnectAccountState>((set) => ({
  modalStep: 'failed', // 모달 상태: connecting, connected, failed
  isConnectModalOpen: false, // 모달 열기/닫기
  selectedAccount: null,
  isSelected: false, // 계좌 선택 여부
  currentAccount: null,
  accountList: [], // 계좌 목록

  // 모달 상태 초기화
  initializeModalStates: () => {
    set((state) => ({
      ...state,
      modalStep: 'connecting',
      isConnectModalOpen: false,
      selectedAccount: null,
      isSelected: false,
    }));
  },

  // 계좌 연동 api 결과에 따른 모달 상태 변경
  setModalStep: (step: 'connecting' | 'connected' | 'failed') => {
    set((state) => ({
      ...state,
      modalStep: step,
    }));
  },

  // 모달 열기/닫기
  setConnectModalOpen: (isOpen: boolean) => {
    set((state) => ({
      ...state,
      isConnectModalOpen: isOpen,
    }));
  },

  // 현재 선택된 계좌 변경
  setCurrentAccount: (account: AccountItemDTO | null) => {
    set((state) => ({
      ...state,
      currentAccount: account,
    }));
  },

  // 계좌 목록 설정
  setAccountList: (accountList: AccountItemDTO[]) => {
    set((state) => ({
      ...state,
      accountList,
    }));
  },

  // 계좌 선택 클릭 이벤트
  handleClickAccount: (account: AccountItemDTO) => {
    set((state) => ({
      ...state,
      selectedAccount: account,
      isSelected: true,
    }));
  },
}));
