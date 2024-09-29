import { Image } from '@nextui-org/react';

import { GroupNumberWithBox } from './GroupNumberWithBox';

import { FoodNftDTO } from '@/modules/game/@types/food';

interface FoodNftInfoProps {
  foodNft?: FoodNftDTO;
  showTitle?: boolean;
  showNumber?: boolean;
}

export const FoodNftInfo = ({
  foodNft,
  showTitle = true,
  showNumber = true,
}: FoodNftInfoProps) => {
  return (
    <div className="flex flex-col items-center">
      {/* 타이틀 영역 */}
      {showTitle && (
        <p
          className="text-center text-2xl font-semibold"
          style={{ color: foodNft?.hexCode }}
        >
          {foodNft?.name}
        </p>
      )}

      {/* 이미지 영역 */}
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

      {/* 숫자 영역 */}
      {showNumber && <GroupNumberWithBox number={12} />}
    </div>
  );
};
