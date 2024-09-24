import { Button } from '@nextui-org/button';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { PropsWithChildren } from 'react';

const GgulPoint = () => {
  return (
    <Card className="mb-4 flex min-h-[160px] bg-success-500 py-1 text-white">
      <CardHeader className="flex justify-between">
        <div>
          <SmallText>나의 껄값</SmallText>
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
  return <p className="text-xs font-light">{children}</p>;
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

export default GgulPoint;
