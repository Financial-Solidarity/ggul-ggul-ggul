import { Button, Modal, ModalBody, ModalContent } from '@nextui-org/react';
import Lottie from 'lottie-react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

import { SmallText } from '../SmallText';

import { UserBoldSpan } from '@/modules/user/components';
import loading_dots from '@/assets/lotties/loading_dots.json';
import { PathNames } from '@/router';

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
            selectedAccount={selectedAccount}
          />
        )}
      </ModalContent>
    </Modal>
  );
};

interface CurrentAccountProps {
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
  setModalStep?: (step: 'connecting' | 'connected' | 'failed') => void;
  setContentModalOpen?: (isOpen: boolean) => void;
  initializeModalStates?: () => void;
}

const ConnectingAccount = ({
  currentAccount,
  selectedAccount,
}: CurrentAccountProps) => {
  return (
    <ModalBody className="flex flex-col items-center py-8">
      <div className="relative flex">
        <span>계좌를 연동 중입니다</span>
        <Lottie
          animationData={loading_dots}
          className="absolute right-0"
          loop={true}
          style={{
            width: '100px',
            height: '200px',
            top: '50%',
            transform: 'translateX(calc(50% + 12px)) translateY(-49%)',
          }}
        />
      </div>
      <div className="flex items-center text-xl">
        <UserBoldSpan>
          {currentAccount.name}
          <SmallText>{currentAccount.accountNo}</SmallText>
        </UserBoldSpan>
        <div className="px-4">
          <ChevronRightIcon className="w-4" />
        </div>
        <UserBoldSpan>
          {selectedAccount.name}
          <SmallText>{currentAccount.accountNo}</SmallText>
        </UserBoldSpan>
      </div>
    </ModalBody>
  );
};

const ConnectedAccount = ({
  currentAccount,
  selectedAccount,
  setModalStep,
  initializeModalStates,
}: CurrentAccountProps) => {
  const handleGoBack = () => {
    initializeModalStates && initializeModalStates();
    setModalStep && setModalStep('connecting');
  };

  return (
    <ModalBody className="flex flex-col items-center py-8">
      <div className="relative flex">
        <span>계좌가 성공적으로 연동되었습니다!</span>
      </div>
      <div className="flex items-center text-xl">
        <UserBoldSpan>
          {currentAccount.name}
          <SmallText>{currentAccount.accountNo}</SmallText>
        </UserBoldSpan>
        <div className="px-4">
          <ChevronRightIcon className="w-4" />
        </div>
        <UserBoldSpan>
          {selectedAccount.name}
          <SmallText>{selectedAccount.accountNo}</SmallText>
        </UserBoldSpan>
      </div>
      <Button
        className="mt-2"
        color="primary"
        radius="full"
        size="lg"
        onClick={handleGoBack}
      >
        <Link to={PathNames.ACCOUNT_BOOK.MAIN.path}>페이로 돌아가기</Link>
      </Button>
    </ModalBody>
  );
};

const FailedAccount = ({
  currentAccount,
  selectedAccount,
  setContentModalOpen,
}: CurrentAccountProps) => {
  return (
    <ModalBody className="flex flex-col items-center py-8">
      <div className="relative flex">
        <span>계좌 연동에 실패했습니다.</span>
      </div>
      <div className="flex items-center text-xl">
        <UserBoldSpan>
          {currentAccount.name}
          <SmallText>{currentAccount.accountNo}</SmallText>
        </UserBoldSpan>
        <div className="px-4">
          <ChevronRightIcon className="w-4" />
        </div>
        <UserBoldSpan>
          {selectedAccount.name}
          <SmallText>{currentAccount.accountNo}</SmallText>
        </UserBoldSpan>
      </div>
      <Button
        className="mt-2"
        color="default"
        radius="full"
        size="lg"
        onClick={() => setContentModalOpen && setContentModalOpen(false)}
      >
        창 닫기
      </Button>
    </ModalBody>
  );
};
