import { Button } from '@nextui-org/react';
import { useEffect } from 'react';

import { AccountItem } from '../components/AccountItem';
import { useConnectStore } from '../store/useConnectStore';
import { ConnectAccountModal, CurrentAccount } from '../components';

import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { useBottomBarStore } from '@/modules/common/store/useBottomBarStore';
import {
  getAllBankAccounts,
  getMainBankAccount,
  setMainBankAccount,
} from '@/modules/common/apis/bankApis';
import { NavTitle } from '@/modules/common/components';
import { useBankAccountStore } from '@/modules/common/store/useBankAccountStore';

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

  const handleClickConnectAccount = async () => {
    setModalStep('connecting');
    setConnectModalOpen(true);

    // 3초 기다리기
    await new Promise((resolve) => setTimeout(resolve, 3000));

    try {
      await setMainBankAccount(selectedAccount!.accountNo);
      setModalStep('connected');
      setCurrentAccount(selectedAccount);
      setBankAccount(selectedAccount);
    } catch {
      setModalStep('failed');
    }
  };

  useEffect(() => {
    if (!currentAccount) {
      setActive(false);
    }

    const getAccountList = async () => {
      const accountListResponse = await getAllBankAccounts();
      const currentMainAccount = await getMainBankAccount();

      setAccountList(accountListResponse);
      setCurrentAccount(currentMainAccount);
    };

    getAccountList();

    return () => {
      setActive(true);
    };
  }, []);

  return (
    <>
      <TopBar
        center={<NavTitle title="계좌 연결하기" />}
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
              .filter((item) => item.accountNo !== currentAccount?.accountNo)
              .map((item) => (
                <AccountItem
                  key={item.accountNo}
                  account={item}
                  handleClickAccount={handleClickAccount}
                  selectedAccount={selectedAccount}
                />
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
