import { Modal, ModalContent } from '@nextui-org/react';
import { AccountItemDTO } from '@types';

import {
  ConnectedAccount,
  ConnectingAccount,
  FailedAccount,
} from '../../components';

interface ConnectAccountModalProps {
  modalStep: 'connecting' | 'connected' | 'failed';
  isConnectModalOpen: boolean;
  setConnectModalOpen: (isOpen: boolean) => void;
  setModalStep: (step: 'connecting' | 'connected' | 'failed') => void;
  initializeModalStates: () => void;
  currentAccount: AccountItemDTO | null;
  selectedAccount: AccountItemDTO | null;
}

export const ConnectAccountModal = ({
  modalStep,
  isConnectModalOpen,
  currentAccount,
  selectedAccount,
  setConnectModalOpen,
  setModalStep,
  initializeModalStates,
}: ConnectAccountModalProps) => {
  if (!currentAccount || !selectedAccount) {
    return null;
  }

  return (
    <Modal
      isDismissable={false}
      isOpen={isConnectModalOpen}
      placement="center"
      onOpenChange={setConnectModalOpen}
    >
      <ModalContent>
        {modalStep === 'connecting' ? (
          <ConnectingAccount
            currentAccount={currentAccount}
            selectedAccount={selectedAccount}
          />
        ) : modalStep === 'connected' ? (
          <ConnectedAccount
            currentAccount={currentAccount}
            initializeModalStates={initializeModalStates}
            selectedAccount={selectedAccount}
            setModalStep={setModalStep}
          />
        ) : (
          <FailedAccount
            currentAccount={currentAccount}
            initializeModalStates={initializeModalStates}
            selectedAccount={selectedAccount}
            setConnectModalOpen={setConnectModalOpen}
          />
        )}
      </ModalContent>
    </Modal>
  );
};
