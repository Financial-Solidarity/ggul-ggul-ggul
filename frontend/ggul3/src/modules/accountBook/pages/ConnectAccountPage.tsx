import { Button, Card, Skeleton } from '@nextui-org/react';
import { useEffect } from 'react';

import { AccountItem } from '../components/AccountItem';
import { useConnectStore } from '../store/useConnectStore';
import { ConnectAccountModal, CurrentAccount } from '../components';

import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { useBottomBarStore } from '@/modules/common/store/useBottomBarStore';
import { setMainBankAccount } from '@/modules/common/apis/bankApis';
import { NavTitle } from '@/modules/common/components';
import { useBankAccountStore } from '@/modules/common/store/useBankAccountStore';
import { useUserStore } from '@/modules/common/store/userStore';
import { NotificationButton } from '@/modules/common/components/NotificationButton/NotificationButton';
import {
  useGetAllBankAccountsMutation,
  useGetMainBankAccountMutation,
} from '@/modules/common/reactQueries/useBankQuery';

export const ConnectAccountPage = () => {
  const {
    modalStep,
    isConnectModalOpen,
    isSelected,
    accountList,
    selectedAccount,
    currentAccount,
    setModalStep,
    initializeModalStates,
    setConnectModalOpen,
    setAccountList,
    setCurrentAccount,
    handleClickAccount,
  } = useConnectStore();

  const { setActive } = useBottomBarStore();
  const { setBankAccount } = useBankAccountStore();
  const { setIsBankAccountPossessed } = useUserStore();

  const { data: allAccounts } = useGetAllBankAccountsMutation();
  const { data: mainBankAccount } = useGetMainBankAccountMutation();

  const handleClickConnectAccount = async () => {
    setModalStep('connecting');
    setConnectModalOpen(true);

    // 2초 기다리기
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      await setMainBankAccount(selectedAccount!.accountNo);
      setModalStep('connected');
      setCurrentAccount(selectedAccount);
      setBankAccount(selectedAccount);
      setIsBankAccountPossessed(true);
    } catch {
      setModalStep('failed');
    }
  };

  useEffect(() => {
    setCurrentAccount(mainBankAccount);
    setAccountList(allAccounts);

    if (currentAccount) {
      setActive(false);
    } else {
      setActive(true);
    }

    return () => {
      setActive(true);
    };
  }, [mainBankAccount, allAccounts, currentAccount]);

  return (
    <>
      <TopBar
        center={<NavTitle title="계좌 연결하기" />}
        left={<BackButton color="black" />}
        right={<NotificationButton />}
      />
      <PageContainer>
        <div className="relative">
          <p className="py-4 text-xl font-bold">어떤 자산을 연결할까요?</p>
          <div className="sticky top-1">
            <CurrentAccount currentAccount={currentAccount} />
          </div>
          <ul className="mb-24">
            {allAccounts && mainBankAccount
              ? accountList
                  .filter(
                    (item) => item.accountNo !== currentAccount?.accountNo,
                  )
                  .map((item) => (
                    <AccountItem
                      key={item.accountNo}
                      account={item}
                      handleClickAccount={handleClickAccount}
                      selectedAccount={selectedAccount}
                    />
                  ))
              : [1, 2, 3, 4, 5].map((item) => (
                  <Card key={item} className="mb-3 space-y-5" radius="lg">
                    <Skeleton className="rounded-lg">
                      <div className="h-10 w-full rounded-lg bg-default-300">
                        {' '}
                      </div>
                    </Skeleton>
                  </Card>
                ))}
          </ul>
          {isSelected && (
            <div className="fixed bottom-20 left-4 right-4">
              <Button
                className="w-full"
                color="primary"
                size="lg"
                onClick={handleClickConnectAccount}
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
