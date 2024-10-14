import { Card, CardBody } from '@nextui-org/card';
import { Button, Image } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

import gameBox from '@/assets/images/game_box.png';

interface BannerProps {
  nickname: string;
}

export const Banner = ({ nickname }: BannerProps) => {
  const navigate = useNavigate();

  const handleClickEventButton = () => {
    navigate('/pay/lucky-draw');
  };

  return (
    <Card className="flex min-h-40 py-1 hover:bg-gray-200">
      <CardBody className="relative flex">
        <p className="font-medium">
          이번 주 경품을 가져갈 분은
          <span className="font-bold"> {nickname} </span>님이 아닐까요?
        </p>
        <div className="flex items-end justify-between">
          <Button color="primary" onClick={handleClickEventButton}>
            이벤트 응모하기
          </Button>

          <Image className="rotate-2" src={gameBox} />
        </div>
      </CardBody>
    </Card>
  );
};
