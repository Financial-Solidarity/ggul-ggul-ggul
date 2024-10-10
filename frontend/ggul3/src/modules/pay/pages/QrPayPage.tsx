import { Input } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ItemInfo } from '../components';
import { PaymentSlideBar } from '../components/PaymentSlideBar';
import { useWalletStore } from '../store/walletStore';

import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { NavTitle } from '@/modules/common/components';
import { useConnectStore } from '@/modules/accountBook/store/useConnectStore';
import { CurrentAccount } from '@/modules/accountBook/components';
import { getMainBankAccount } from '@/modules/common/apis/bankApis';

export const QrPayPage = () => {
  const { currentAccount, setCurrentAccount } = useConnectStore();
  const { ggulToken, getMyGgulToken } = useWalletStore();

  const [slideValue, setSlideValue] = useState<number | ''>('');

  const [spendGgulToken, setSpendGgulToken] = useState<string>('');

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const categoryId = queryParams.get('categoryId');
  const productName = queryParams.get('productName');
  const requiredMoney = queryParams.get('requiredMoney');
  const market = queryParams.get('market');

  const itemInfo = {
    categoryId: Number(categoryId),
    productName: productName as string,
    requiredMoney: Number(requiredMoney),
    market: market as string,
  };

  const handleChangeGgulTokenInput = (value: string) => {
    if (value[value.length - 1] === '-' || value[0] === '0') {
      return;
    }

    if (value === '') {
      setSpendGgulToken('');

      return;
    }

    const numericValue = Number(value);

    if (numericValue < 0) {
      setSpendGgulToken('0');

      return;
    }

    // 사용할 수 있는 토큰 값보다 큰 경우 처리
    if (numericValue > Number(ggulToken)) {
      setSpendGgulToken(String(ggulToken));

      return;
    }

    // 최종 결제 금액보다 큰 경우 처리
    if (numericValue > itemInfo.requiredMoney) {
      setSpendGgulToken(String(itemInfo.requiredMoney - 1));

      return;
    }

    setSpendGgulToken(value);
  };

  const handleClickBackButton = () => {
    const confirm = window.confirm(
      '결제를 취소하고 페이지를 벗어나시겠습니까?',
    );

    if (confirm) {
      // @ts-ignore
      navigate(-1, { replace: true });
    }
  };

  useEffect(() => {
    const fetchMainBankAccount = async () => {
      setCurrentAccount(await getMainBankAccount());
    };

    fetchMainBankAccount();
    getMyGgulToken();
  }, []);

  return (
    <>
      <TopBar
        center={<NavTitle title="상품 결제" />}
        left={<BackButton color="black" onClickEvent={handleClickBackButton} />}
      />
      <PageContainer>
        <div className="w-full">
          <div className="mb-20 mt-10">
            <ItemInfo itemInfo={itemInfo} />
          </div>
          <div className="w-full border-t-1 pt-5">
            <div className="mb-5 flex w-full flex-col gap-2 border-b-1 pb-5">
              <CurrentAccount currentAccount={currentAccount} />

              <Input
                label="사용할 껄 토큰"
                placeholder="사용할 껄 토큰"
                type="number"
                value={spendGgulToken}
                onValueChange={handleChangeGgulTokenInput}
              />
              <p className="flex justify-between text-sm">
                <span>사용 가능한 껄 토큰</span>
                <span className="font-bold text-primary">
                  {Number(ggulToken) - Number(spendGgulToken)} P
                </span>
              </p>
            </div>
          </div>
          <div className="mb-5 flex justify-between">
            <p className="text-xl">최종 결제 금액</p>
            <p className="text-2xl font-bold">
              <span className="text-xl font-light text-gray-500 line-through">
                {Number(spendGgulToken) !== 0 && itemInfo.requiredMoney}
              </span>{' '}
              {itemInfo.requiredMoney - Number(spendGgulToken)}{' '}
              <span className="text-lg font-normal text-gray-500">원</span>
            </p>
          </div>

          <div className="rounded bg-primary-500/5 p-4">
            <PaymentSlideBar
              itemInfo={itemInfo}
              slideValue={Number(slideValue)}
              spendGgulToken={spendGgulToken}
              // @ts-ignore
              setSlideValue={setSlideValue}
            />
            <p className="text-sm text-primary">
              상품을 결제하려면 슬라이드를 끝까지 밀어주세요.
            </p>
          </div>
        </div>
      </PageContainer>
    </>
  );
};
