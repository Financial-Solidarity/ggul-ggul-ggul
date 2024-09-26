import { Card, CardFooter } from '@nextui-org/card';
import { Image } from '@nextui-org/react';

import charityGroup from '@/assets/images/charity-group.png';
import woodenTrainingSword from '@/assets/images/wooden-training-sword.png';

export const GgulLinks = () => {
  return (
    <div className="mb-20 flex gap-2">
      <GgulLinkItem
        description="거지방을 아시나요?"
        imgUrl={charityGroup}
        title="껄 챌린지"
      />
      <GgulLinkItem
        description="게임을 통해 껄 모으기"
        imgUrl={woodenTrainingSword}
        title="껄 키우기"
      />
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
      className="flex flex-1 content-center items-center justify-center pt-4 ease-linear hover:bg-slate-200"
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
