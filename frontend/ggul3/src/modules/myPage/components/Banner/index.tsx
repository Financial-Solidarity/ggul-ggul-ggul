import { Card, CardBody, CardFooter } from '@nextui-org/card';
import { Button, Image } from '@nextui-org/react';

import gameBox from '@/assets/images/game_box.png';

interface BannerProps {
  nickname: string;
}

export const Banner = ({ nickname }: BannerProps) => {
  return (
    <Card className="flex min-h-40 py-1 hover:bg-gray-200">
      <CardBody className="relative flex overflow-y-hidden">
        <p className="w-2/3 font-medium">
          이번 주 1억원을 가져갈 분은 {nickname}님이 아닐까요?
        </p>
        <div className="absolute right-0 w-1/4 translate-x-[-25%]">
          <Image className="rotate-2" src={gameBox} />
        </div>
      </CardBody>
      <CardFooter className="flex flex-col items-start">
        <Button color="primary">이벤트 응모하기</Button>
      </CardFooter>
    </Card>
  );
};
