import { Account } from '@types';

export interface AccountModalProps {
  currentAccount: Account;
  selectedAccount: Account;
  setModalStep?: (step: 'connecting' | 'connected' | 'failed') => void;
  setConnectModalOpen?: (isOpen: boolean) => void;
  initializeModalStates?: () => void;
}
