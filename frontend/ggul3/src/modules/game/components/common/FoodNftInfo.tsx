import { Image } from '@nextui-org/react';

import { GroupNumberWithBox } from './GroupNumberWithBox';

import { FoodNftDTO } from '@/modules/game/@types/food';

interface FoodNftInfoProps {
  foodNft?: FoodNftDTO;
}

export const FoodNftInfo = ({ foodNft }: FoodNftInfoProps) => {
  return (
    <div className="flex flex-col">
      <p
        className="text-center text-2xl font-semibold"
        style={{ color: foodNft?.hexCode }}
      >
        {foodNft?.name}
      </p>
      <div className="relative flex h-44 w-full items-center justify-center">
        <div
          className="h-28 w-28 animate-popIn rounded-full"
          style={{ backgroundColor: foodNft?.hexCode }}
        />
        <div className="IMAGE-WRAPPER absolute flex animate-fadeIn items-center justify-center">
          <Image
            className="animate-floating"
            src={'/src/assets/images/food/food_' + foodNft?.typeIndex + '.png'}
            width={135}
          />
        </div>
      </div>
      <GroupNumberWithBox number={12} />
    </div>
  );
};
