import { Input } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { ItemInfo } from '../components';
import { PaymentSlideBar } from '../components/PaymentSlideBar';

import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { NavTitle } from '@/modules/common/components';
import { useConnectStore } from '@/modules/accountBook/store/useConnectStore';
import { CurrentAccount } from '@/modules/accountBook/components';

export const QrPayPage = () => {
  const [slideValue, setSlideValue] = useState<number>(0);
  const [spendGgulToken, setSpendGgulToken] = useState<string>('1');

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

  const { currentAccount, setCurrentAccount } = useConnectStore();

  useEffect(() => {
    setCurrentAccount({
      id: 11,
      name: '농협',
      accountNo: '110-1851-4567',
    });
  }, []);

  return (
    <>
      <TopBar
        center={<NavTitle title="상품 결제" />}
        left={<BackButton color="black" />}
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
                onValueChange={setSpendGgulToken}
              />
              <p className="flex justify-between text-sm">
                <span>사용 가능한 껄 토큰</span>
                <span className="font-bold text-primary">1,723 P</span>
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
              slideValue={slideValue}
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
