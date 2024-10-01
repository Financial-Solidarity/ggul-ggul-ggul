import { Modal, ModalContent } from '@nextui-org/react';

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
  currentAccount: {
    id: number;
    name: string;
    accountNo: string;
  };
  selectedAccount: {
    id: number;
    name: string;
    accountNo: string;
  };
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
