import { Button, Card, CardBody } from '@nextui-org/react';
import { useState } from 'react';
import { BsCheck } from 'react-icons/bs';

import { AccountItem } from '../components/AccountItem';

import { NavTitle } from '@/modules/common/components';
import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { NotificationButton } from '@/modules/common/components/NotificationButton/NotificationButton';

const accountList = [
  {
    id: 1,
    name: '신한은행',
    accountNo: '110-123-45689',
  },
  {
    id: 2,
    name: '국민은행',
    accountNo: '110-123-56789',
  },
  {
    id: 3,
    name: '우리은행',
    accountNo: '110-13-456789',
  },
  {
    id: 4,
    name: '하나은행',
    accountNo: '10-123-456789',
  },
  {
    id: 5,
    name: '농협',
    accountNo: '110-123-45678',
  },
  {
    id: 6,
    name: '기업은행',
    accountNo: '110-123-4564789',
  },
  {
    id: 7,
    name: '신한은행',
    accountNo: '1110-123-456789',
  },
  {
    id: 8,
    name: '국민은행',
    accountNo: '110-1523-456789',
  },
  {
    id: 9,
    name: '우리은행',
    accountNo: '110-123-4567789',
  },
  {
    id: 10,
    name: '하나은행',
    accountNo: '110-1223-456789',
  },
  {
    id: 11,
    name: '농협',
    accountNo: '110-123-4567089',
  },
  {
    id: 12,
    name: '기업은행',
    accountNo: '110-123-4546789',
  },
  {
    id: 13,
    name: '하나은행',
    accountNo: '110-1223-456789',
  },
  {
    id: 14,
    name: '농협',
    accountNo: '110-123-4567089',
  },
  {
    id: 15,
    name: '기업은행',
    accountNo: '110-123-4546789',
  },
  {
    id: 16,
    name: '하나은행',
    accountNo: '110-1223-456789',
  },
  {
    id: 17,
    name: '농협',
    accountNo: '110-123-4567089',
  },
  {
    id: 18,
    name: '기업은행',
    accountNo: '110-123-4546789',
  },
];

export const ConnectAccountPage = () => {
  const [step, setStep] = useState<string>('list');
  const [selectedAccountNo, setSelectedAccountNo] =
    useState<string>('110-123-45689');
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const currentAccount = accountList.filter(
    (item) => item.accountNo === '110-123-45689',
  )[0];

  const otherACcountList = accountList.filter(
    (item) => item.accountNo !== '110-123-45689',
  );

  const handleClickAccount = (accountNo: string) => {
    setSelectedAccountNo(accountNo);
    setIsSelected(true);
  };

  if (step === 'list') {
    return (
      <>
        <TopBar
          center={<NavTitle title="계좌 연결하기" />}
          left={<BackButton color="black" />}
          right={<NotificationButton color="black" />}
        />
        <PageContainer>
          <div className="relative">
            <p className="py-4 text-xl font-bold">어떤 자산을 연결할까요?</p>
            <div className="sticky top-1">
              <Card className="mb-2">
                <CardBody>
                  <p>현재 연결된 계좌</p>
                  <AccountItem account={currentAccount} />
                </CardBody>
              </Card>
            </div>
            <ul className="mb-24">
              {otherACcountList.map((item) => (
                <AccountItem
                  key={item.id}
                  account={item}
                  handleClickAccount={handleClickAccount}
                  selectedAccountNo={selectedAccountNo}
                />
              ))}
            </ul>
            {isSelected && (
              <div className="fixed bottom-24 left-4 right-4">
                <Button
                  className="w-full"
                  color="primary"
                  size="lg"
                  onClick={() => setStep('success')}
                >
                  선택한 계좌 연결하기
                </Button>
              </div>
            )}
          </div>
        </PageContainer>
      </>
    );
  }

  if (step === 'success') {
    return (
      <>
        <TopBar
          center={<div>계좌 연결하기</div>}
          left={<BackButton color="black" />}
          right={<NotificationButton color="black" />}
        />
        <PageContainer>
          <div className="flex h-full flex-col items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-200">
                <BsCheck className="h-10 w-10 text-white" />
              </div>
              <div className="mt-4 text-2xl font-bold text-primary-700">
                계좌 연동 완료
              </div>
              <div className="mt-2 text-sm text-gray-500">
                계좌 연동이 완료되었습니다.
              </div>
            </div>
            <div className="mt-8">
              <Button className="w-44">확인</Button>
            </div>
          </div>
        </PageContainer>
      </>
    );
  }
};
