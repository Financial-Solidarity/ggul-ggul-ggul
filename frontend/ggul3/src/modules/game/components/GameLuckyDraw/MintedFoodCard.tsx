import { Button, Image } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

import { ConfettieLottie } from './ConfettieLottie';

import { FoodDTO } from '@/modules/game/@types/food';
import { PathNames } from '@/router';

interface MintedFoodCardProps {
  food: FoodDTO | null;
  navigate: ReturnType<typeof useNavigate>;
}

export const MintedFoodCard = ({
  food,
  navigate,
}: MintedFoodCardProps): JSX.Element => (
  <div className="NFT-CARD-CONTAINER h-80d w-56 rounded-2xl bg-primary-600 p-4">
    <p className="text-xl font-semibold text-white">{food?.name}</p>
    <div className="flex h-48 w-full items-center justify-center">
      <div
        className="CIRCULAR-BACKGROUND"
        style={{ backgroundColor: food?.hexCode }}
      />
      <div
        className="h-32 w-32 animate-popIn rounded-full"
        style={{ backgroundColor: food?.hexCode }}
      />
      <ConfettieLottie />
      <div className="IMAGE-WRAPPER absolute left-1/2 -translate-x-1/2 animate-fadeIn">
        <div className="animate-floating">
          <Image
            src={'/src/assets/images/food/food_' + food?.typeIndex + '.png'}
            width={130}
          />
        </div>
      </div>
    </div>
    <Button
      fullWidth
      className="bg-primary-400 py-3 text-white"
      onClick={() => navigate(PathNames.GAME.INVENTORY.path)}
    >
      NFT 음식 보러가기
    </Button>
  </div>
);
