import { AccountItemDTO } from '@types';

export interface AccountModalProps {
  currentAccount: AccountItemDTO;
  selectedAccount: AccountItemDTO;
  setModalStep?: (step: 'connecting' | 'connected' | 'failed') => void;
  setConnectModalOpen?: (isOpen: boolean) => void;
  initializeModalStates?: () => void;
}
