import { Image } from '@nextui-org/react';

import { GroupNumberWithBox } from './GroupNumberWithBox';

import { FoodNftDTO } from '@/modules/game/@types/equipment';

interface FoodNftInfoRowProps {
  foodNft?: FoodNftDTO;
}

export const FoodNftInfoRow = ({ foodNft }: FoodNftInfoRowProps) => {
  return (
    <div className="flex flex-row items-center">
      {/* 타이틀 영역 */}
      <div className="items-left flex w-2/3 flex-col gap-3">
        <p
          className="text-left text-3xl font-semibold"
          style={{ color: foodNft?.hexCode }}
        >
          {foodNft?.name}
        </p>
        {/* 숫자 영역 */}
        <GroupNumberWithBox number={12} withLabel={false} />
      </div>
      {/* 이미지 영역 */}
      <div className="relative flex h-20 w-1/3 w-full items-center justify-center">
        <div
          className="h-24 w-24 animate-popIn rounded-full"
          style={{ backgroundColor: foodNft?.hexCode }}
        />
        <div className="IMAGE-WRAPPER absolute flex animate-fadeIn items-center justify-center">
          <Image
            className="animate-floating"
            src={'/src/assets/images/food/food_' + foodNft?.typeIndex + '.png'}
            width={115}
          />
        </div>
      </div>
    </div>
  );
};
