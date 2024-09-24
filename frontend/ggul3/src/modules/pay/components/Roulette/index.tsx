import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { PropsWithChildren } from 'react';
import { Image } from '@nextui-org/react';

import luckyWheel from '@/assets/images/lucky-wheel.png';

const Roulette = () => {
  return (
    <Card className="mb-4 flex bg-warning-400 py-1 text-black">
      <CardHeader className="flex justify-between pb-0">
        <SmallText>이번 주의 응모상품 목록 확인하기</SmallText>
      </CardHeader>
      <div className="flex">
        <CardBody className="overflow-hidden">
          <div className="flex h-full flex-col justify-between">
            <p className="text-base font-bold">응모하기</p>
            <SmallText>이번 주의 상품은?</SmallText>
          </div>
        </CardBody>
        <CardFooter>
          <Image
            className="translate-x-0 translate-y-0"
            height={80}
            src={luckyWheel}
            width={66}
          />
        </CardFooter>
      </div>
    </Card>
  );
};

const SmallText = ({ children }: PropsWithChildren) => {
  return <p className="text-nowrap text-xs">{children}</p>;
};

export default Roulette;
