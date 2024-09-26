import { Image } from '@nextui-org/react';

import { ConfettieLottie } from './ConfettieLottie';
import { PulseLottie } from './PulseLottie';

import { FoodDTO } from '@/modules/game/@types/food';

interface FoodInfoDisplayProps {
  step: string;
  food: FoodDTO | null;
}

export const FoodInfoDisplay = ({
  step,
  food,
}: FoodInfoDisplayProps): JSX.Element => (
  <>
    <p
      className="text-center text-3xl font-semibold"
      style={{ color: food?.hexCode }}
    >
      {food?.name}
    </p>
    <div className="flex h-48 w-full items-center justify-center">
      <div
        className="CIRCULAR-BACKGROUND"
        style={{ backgroundColor: food?.hexCode }}
      />
      <div
        className="h-32 w-32 animate-popIn rounded-full"
        style={{ backgroundColor: food?.hexCode }}
      />
      {step === 'drawed' && <ConfettieLottie />}
      {step === 'minting' && <PulseLottie />}
      <div className="IMAGE-WRAPPER absolute left-1/2 -translate-x-1/2 animate-fadeIn">
        {(step === 'drawed' || step === 'minting') && (
          <div className="animate-floating">
            <Image
              src={'/src/assets/images/food/food_' + food?.typeIndex + '.png'}
              width={130}
            />
          </div>
        )}
      </div>
    </div>
  </>
);
