import { Card, CardFooter } from '@nextui-org/card';
import { Image } from '@nextui-org/react';
import { Link } from 'react-router-dom';

import charityGroup from '@/assets/images/charity_group.png';
import woodenTrainingSword from '@/assets/images/wooden-training-sword.png';

export const GgulLinks = () => {
  return (
    <div className="mb-20 flex gap-3">
      <Link className="flex-1" to="/challenge">
        <GgulLinkItem
          description="거지방을 아시나요?"
          imgUrl={charityGroup}
          title="껄 챌린지"
        />
      </Link>
      <Link className="flex-1" to="/game">
        <GgulLinkItem
          description="게임을 통해 껄 모으기"
          imgUrl={woodenTrainingSword}
          title="껄 키우기"
        />
      </Link>
    </div>
  );
};

interface GgulLinkItemProps {
  title: string;
  description: string;
  imgUrl: string;
}

const GgulLinkItem = ({ title, description, imgUrl }: GgulLinkItemProps) => {
  return (
    <Card
      className="items-center pt-4 ease-linear hover:bg-slate-200"
      shadow="md"
    >
      <Image
        alt="Woman listing to music"
        className="object-cover"
        height={64}
        src={imgUrl}
        width={64}
      />
      <CardFooter className="flex flex-col">
        <p className="text-sm font-bold">{title}</p>
        <p className="text-xs">{description}</p>
      </CardFooter>
    </Card>
  );
};
