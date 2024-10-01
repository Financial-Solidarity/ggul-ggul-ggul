import { ModalBody } from '@nextui-org/react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import Lottie from 'lottie-react';

import * as SmallText from '../SmallText';
import { AccountModalProps } from '../../@types/accountModal';

import { UserBoldSpan } from '@/modules/user/components';
import loading_dots from '@/assets/lotties/loading_dots.json';

type ConnectingAccountProps = Pick<
  AccountModalProps,
  'currentAccount' | 'selectedAccount'
>;

export const ConnectingAccount = ({
  currentAccount,
  selectedAccount,
}: ConnectingAccountProps) => {
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
          <SmallText.SmallText>{currentAccount.accountNo}</SmallText.SmallText>
        </UserBoldSpan>
        <div className="px-4">
          <ChevronRightIcon className="w-4" />
        </div>
        <UserBoldSpan>
          {selectedAccount.name}
          <SmallText.SmallText>{currentAccount.accountNo}</SmallText.SmallText>
        </UserBoldSpan>
      </div>
    </ModalBody>
  );
};
