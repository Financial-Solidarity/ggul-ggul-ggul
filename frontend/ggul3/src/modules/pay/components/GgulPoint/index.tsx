import { Button } from '@nextui-org/button';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { PropsWithChildren } from 'react';

interface GgulPointProps {
  isNarrow?: boolean;
  remainGgulToken: number;
}

export const GgulPoint = ({ isNarrow, remainGgulToken }: GgulPointProps) => {
  if (isNarrow) {
    return (
      <Card
        className="flex bg-primary py-1 text-white"
        radius="none"
        shadow="sm"
      >
        <CardBody>
          <div className="flex items-end justify-between">
            <div>
              <div>
                <SmallText>GGUL TOKEN</SmallText>
              </div>
              <p className="text-2xl">{remainGgulToken} P</p>
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
    <Card className="flex min-h-40 bg-success py-1 text-white">
      <CardHeader className="flex justify-between">
        <div>
          <SmallText>GGUL TOKEN</SmallText>
        </div>
        <div className="flex">
          <ToggleBalanceVisibilityButton />
        </div>
      </CardHeader>
      <CardBody className="py-0">
        <p className="text-2xl">{`2,450`} P</p>
      </CardBody>
      <CardFooter className="flex flex-col items-start">
        <SmallText>껄을 이용하여 유니크한 장비를 뽑거나</SmallText>
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
      <Button
        className="bg-black bg-opacity-20 text-white"
        radius="full"
        size="sm"
      >
        내역
      </Button>
    );
  };