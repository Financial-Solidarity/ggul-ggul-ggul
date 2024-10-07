import { Button } from '@nextui-org/react';
import { useEffect } from 'react';

import { AccountItem } from '../components/AccountItem';
import { useConnectStore } from '../store/useConnectStore';
import { ConnectAccountModal, CurrentAccount } from '../components';

import * as components from '@/modules/common/components';
import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';

export const ConnectAccountPage = () => {
  const {
    modalStep,
    isConnectModalOpen,
    isSelected,
    selectedAccount,
    currentAccount,
    setModalStep,
    initializeModalStates,
    setConnectModalOpen,
    setAccountList,
    setCurrentAccount,
    handleClickAccount,
  } = useConnectStore();

  useEffect(() => {
    setCurrentAccount({
      id: 11,
      name: '농협',
      accountNo: '110-1851-4567',
    });

    setAccountList(accountList);
  }, []);

  return (
    <>
      <TopBar
        center={<components.NavTitle title="계좌 연결하기" />}
        left={<BackButton color="black" />}
      />
      <PageContainer>
        <div className="relative">
          <p className="py-4 text-xl font-bold">어떤 자산을 연결할까요?</p>
          <div className="sticky top-1">
            <CurrentAccount currentAccount={currentAccount} />
          </div>
          <ul className="mb-24">
            {accountList
              .filter((item) => item.accountNo !== currentAccount.accountNo)
              .map((item) => (
                <AccountItem
                  key={item.id}
                  account={item}
                  handleClickAccount={handleClickAccount}
                  selectedAccount={selectedAccount}
                />
              ))}
          </ul>
          {isSelected && (
            <div className="fixed bottom-24 left-4 right-4">
              <Button
                className="w-full"
                color="primary"
                size="lg"
                onClick={() => setConnectModalOpen(true)}
              >
                선택한 계좌 연결하기
              </Button>
            </div>
          )}
        </div>
        <ConnectAccountModal
          currentAccount={currentAccount}
          initializeModalStates={initializeModalStates}
          isConnectModalOpen={isConnectModalOpen}
          modalStep={modalStep}
          selectedAccount={selectedAccount}
          setConnectModalOpen={setConnectModalOpen}
          setModalStep={setModalStep}
        />
      </PageContainer>
    </>
  );
};

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
