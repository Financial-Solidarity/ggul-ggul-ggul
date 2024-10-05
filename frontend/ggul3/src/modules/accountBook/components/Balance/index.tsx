import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { useState } from 'react';
import { BsCopy } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import { SmallText, ToggleBalanceVisibilityButton } from '../../components';

import { PathNames } from '@/router';

export const Balance = () => {
  const [isMoneyVisible, setIsMoneyVisible] = useState<boolean>(false);

  const hasAccount = false;

  if (!hasAccount) {
    return (
      <Link to={PathNames.ACCOUNT_BOOK.CONNECT_ACCOUNT.path}>
        <Card className="flex cursor-pointer bg-primary-200 text-center text-white hover:bg-primary-400">
          <CardBody className="text-center">
            <div className="flex h-28 items-center justify-center">
              <div className="absolute left-[50%] top-[68%] h-20 w-20 translate-x-[-50%] translate-y-[-50%] rounded-full border border-dashed border-primary-700">
                <div className="absolute left-[50%] top-[50%] h-[2px] w-8 -translate-x-1/2 -translate-y-1/2 transform bg-primary-700">
                  {' '}
                </div>
                <div className="absolute left-[50%] top-[50%] h-8 w-[2px] -translate-x-1/2 -translate-y-1/2 transform bg-primary-700">
                  {' '}
                </div>
              </div>
            </div>
          </CardBody>
          <CardFooter className="mb-2 justify-center text-sm font-medium text-primary-700">
            계좌를 연동하고 껄페이 혜택을 받아보세요!
          </CardFooter>
        </Card>
      </Link>
    );
  }

  if (hasAccount) {
    return (
      <Card className="flex bg-primary text-center text-white">
        <CardHeader className="flex justify-between">
          <div>
            <SmallText>계좌 잔고</SmallText>
          </div>
          <div className="flex items-center">
            <SmallText>금액 표시</SmallText>
            <ToggleBalanceVisibilityButton
              isMoneyVisible={isMoneyVisible}
              setIsMoneyVisible={setIsMoneyVisible}
            />
          </div>
        </CardHeader>
        <CardBody className="text-center">
          <div className="text-2xl">
            {isMoneyVisible ? (
              '12,345,678,910,111 원'
            ) : (
              <p className="text-gray-300">금액 숨김</p>
            )}
          </div>
        </CardBody>
        <CardFooter className="justify-center">
          <SmallText>연동 계좌번호 {'123-******-***789'}</SmallText>
          <BsCopy className="ml-2 w-3" />
        </CardFooter>
      </Card>
    );
  }
};