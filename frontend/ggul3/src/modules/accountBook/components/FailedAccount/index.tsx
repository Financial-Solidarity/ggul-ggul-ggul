import { Button, ModalBody } from '@nextui-org/react';

import { AccountModalProps } from '../../@types/accountModal';
import { SmallText } from '../SmallText';

import { UserBoldSpan } from '@/modules/user/components';

type FailedAccountProps = Pick<
  AccountModalProps,
  'selectedAccount' | 'setConnectModalOpen' | 'initializeModalStates'
>;

export const FailedAccount = ({
  selectedAccount,
  setConnectModalOpen,
  initializeModalStates,
}: FailedAccountProps) => {
  const handleGoBack = () => {
    setConnectModalOpen && setConnectModalOpen(false);
    initializeModalStates && initializeModalStates();
  };

  return (
    <ModalBody className="flex flex-col items-center py-8">
      <div className="relative flex">
        <span>계좌 연동에 실패했습니다.</span>
      </div>
      <div className="flex items-center text-xl">
        <UserBoldSpan>
          {selectedAccount.bankName}
          <SmallText>{selectedAccount.accountNo}</SmallText>
        </UserBoldSpan>
      </div>
      <Button
        className="mt-2"
        color="default"
        radius="full"
        size="lg"
        onClick={handleGoBack}
      >
        창 닫기
      </Button>
    </ModalBody>
  );
};
