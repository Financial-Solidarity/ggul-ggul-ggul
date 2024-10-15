import { ModalBody } from '@nextui-org/react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import Lottie from 'lottie-react';
import { AccountItemDTO } from '@types';

import { AccountModalProps } from '../../@types/accountModal';
import { SmallText } from '../SmallText';

import { UserBoldSpan } from '@/modules/user/components';
import loading_dots from '@/assets/lotties/loading_dots.json';

type ConnectingAccountProps = Pick<
  AccountModalProps,
  'selectedAccount' | 'setModalStep'
> & {
  currentAccount: AccountItemDTO | null; // YourCurrentAccountType은 currentAccount의 실제 타입으로 교체하세요.
};

export const ConnectingAccount = ({
  currentAccount,
  selectedAccount,
}: ConnectingAccountProps) => {
  return (
    <ModalBody className="relative flex flex-col items-center py-8">
      <div className="absolute right-3 top-3 h-4 w-4 bg-white"> </div>
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
        {currentAccount && (
          <>
            <UserBoldSpan>
              {currentAccount?.bankName}
              <SmallText>{currentAccount?.accountNo}</SmallText>
            </UserBoldSpan>
            <div className="px-4">
              <ChevronRightIcon className="w-4" />
            </div>
          </>
        )}
        <UserBoldSpan>
          {selectedAccount.bankName}
          <SmallText>{selectedAccount?.accountNo}</SmallText>
        </UserBoldSpan>
      </div>
    </ModalBody>
  );
};
