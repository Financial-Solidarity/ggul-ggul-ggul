import { Button, ModalBody } from '@nextui-org/react';
import { Link } from 'react-router-dom';

import { AccountModalProps } from '../../@types/accountModal';
import { SmallText } from '../SmallText';

import { UserBoldSpan } from '@/modules/user/components';
import { PathNames } from '@/router';

type ConnectedAccountProps = Pick<
  AccountModalProps,
  | 'currentAccount'
  | 'selectedAccount'
  | 'initializeModalStates'
  | 'setModalStep'
>;

export const ConnectedAccount = ({
  currentAccount,
  selectedAccount,
  setModalStep,
  initializeModalStates,
}: ConnectedAccountProps) => {
  const handleGoBack = () => {
    initializeModalStates && initializeModalStates();
    setModalStep && setModalStep('connecting');
  };

  return (
    <ModalBody className="flex flex-col items-center py-8">
      <div className="relative flex">
        <span>계좌가 성공적으로 연동되었습니다!</span>
      </div>
      <div className="flex items-center text-center text-xl">
        <UserBoldSpan>
          {currentAccount.bankName}
          <SmallText>{currentAccount.accountNo}</SmallText>
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
