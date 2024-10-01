import { Input } from '@nextui-org/react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { ItemInfo } from '../components';
import { PaymentSlideBar } from '../components/PaymentSlideBar';

import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { NotificationButton } from '@/modules/common/components/NotificationButton/NotificationButton';

export const QrPayPage = () => {
  const [slideValue, setSlideValue] = useState<number>(0);
  const [spendGgulToken, setSpendGgulToken] = useState<string>('0');

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

  return (
    <>
      <TopBar
        left={<BackButton color="black" />}
        right={<NotificationButton color="black" />}
      />
      <PageContainer>
        <div>
          <ItemInfo itemInfo={itemInfo} />
          <SpendGgulInput input={spendGgulToken} setInput={setSpendGgulToken} />

          <PaymentSlideBar
            itemInfo={itemInfo}
            slideValue={slideValue}
            spendGgulToken={spendGgulToken}
            // @ts-ignore
            setSlideValue={setSlideValue}
          />
        </div>
      </PageContainer>
    </>
  );
};

interface SpendGgulInputProps {
  input: string;
  setInput: (ggulTokenValue: string) => void;
}

const SpendGgulInput = ({ input, setInput }: SpendGgulInputProps) => {
  return (
    <div className="flex w-full max-w-[240px] flex-col gap-2">
      <Input
        label="사용할 껄 토큰"
        placeholder="사용할 껄 토큰"
        type="number"
        value={input}
        onValueChange={setInput}
      />
    </div>
  );
};
