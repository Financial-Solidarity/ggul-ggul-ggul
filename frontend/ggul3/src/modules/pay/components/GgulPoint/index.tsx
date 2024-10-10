import { Button } from '@nextui-org/button';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { PropsWithChildren, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useWalletStore } from '../../store/walletStore';
import { getTokenTradingHistories } from '../../apis/wallet';

import { PathNames } from '@/router';

interface GgulPointProps {
  isNarrow?: boolean;
}

export const GgulPoint = ({ isNarrow }: GgulPointProps) => {
  const { ggulToken, setTokenTradingHistories } = useWalletStore();

  useEffect(() => {
    const getTokens = async () => {
      const { content } = await getTokenTradingHistories();

      setTokenTradingHistories(content);
    };

    getTokens();
  }, []);

  if (isNarrow) {
    return (
      <Card
        className="bfg flex bg-primary py-1 text-white duration-200 ease-linear hover:bg-opacity-70"
        radius="none"
        shadow="sm"
      >
        <CardBody>
          <div className="flex items-end justify-between">
            <div>
              <div>
                <SmallText>GGUL TOKEN</SmallText>
              </div>
              <p className="text-2xl">{ggulToken} P</p>
            </div>
            <div className="flex">
              <ToggleBalanceVisibilityButton />
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="flex min-h-40 bg-success py-1 text-white duration-200 ease-linear hover:bg-opacity-70">
      <CardHeader className="flex justify-between">
        <div>
          <SmallText>GGUL TOKEN</SmallText>
        </div>
        <div className="flex">
          <ToggleBalanceVisibilityButton />
        </div>
      </CardHeader>
      <CardBody className="py-0">
        <p className="text-2xl">{ggulToken} P</p>
      </CardBody>
      <CardFooter className="flex flex-col items-start">
        <SmallText>껄을 이용하여 유니크한 음식을 뽑거나</SmallText>
        <SmallText>실물 상품에 응모해보세요!</SmallText>
      </CardFooter>
    </Card>
  );
};

const SmallText = ({ children }: PropsWithChildren) => {
  return <p className="text-sm font-light">{children}</p>;
};

interface ToggleBalanceVisibilityButtonProps {}

const ToggleBalanceVisibilityButton =
  ({}: ToggleBalanceVisibilityButtonProps) => {
    return (
      <Link to={PathNames.GGULPAY.WALLET.path}>
        <Button
          className="bg-black bg-opacity-20 text-white"
          radius="full"
          size="sm"
        >
          내역
        </Button>
      </Link>
    );
  };
