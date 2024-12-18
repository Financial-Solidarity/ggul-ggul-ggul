import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { PropsWithChildren } from 'react';
import { Image } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

import luckyWheel from '@/assets/images/lucky-wheel.png';
import { PathNames } from '@/router';

export const Roulette = () => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(PathNames.GGULPAY.LUCKY_DRAW_ENTRY.path)}>
      <Card className="flex cursor-pointer bg-warning-400 py-1 text-black duration-200 ease-linear hover:bg-opacity-70">
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
    </div>
  );
};

const SmallText = ({ children }: PropsWithChildren) => {
  return <p className="text-nowrap text-xs">{children}</p>;
};
