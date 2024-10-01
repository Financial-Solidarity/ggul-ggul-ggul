import { useNavigate } from 'react-router-dom';
import { Image } from '@nextui-org/react';

import { CookingLottie } from './CookingLottie';
import { MintedFoodCard } from './MintedFoodCard';
import { FoodInfoDisplay } from './FoodInfoDisplay';
import { RandomNumber } from './RandomNumber';

import { FoodDTO } from '@/modules/game/@types/equipment';

export interface ContentSectionProps {
  step: string;
  food: FoodDTO | null;
  navigate: ReturnType<typeof useNavigate>;
}

export const ContentSection = ({
  step,
  food,
  navigate,
}: ContentSectionProps) => {
  return (
    <div className="CONTENT-SECTION flex h-3/5 w-full flex-col items-center justify-center">
      <div className="FOOD-BOX relative mt-24 flex h-full w-full flex-col items-center">
        {step === 'init' && (
          <Image src={'/src/assets/images/serving_lid.png'} width={180} />
        )}
        {step === 'minted' && (
          <MintedFoodCard food={food} navigate={navigate} />
        )}
        {step === 'drawing' && <CookingLottie />}
        {(step === 'drawed' || step === 'minting') && (
          <FoodInfoDisplay food={food} step={step} />
        )}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="flex w-full flex-col items-center justify-center gap-12">
            {step !== 'minted' && <RandomNumber />}
          </div>
        </div>

        <div className="PREOCESS-INFO absolute -bottom-12 left-1/2 flex -translate-x-1/2 items-center justify-center">
          {(step === 'minting' || step === 'minted') && (
            <>
              {step === 'minting' && (
                <div
                  className={`animate-fadeIn text-2xl font-semibold text-white`}
                >
                  <span
                    style={{
                      color: food?.hexCode,
                    }}
                  >
                    {food?.name}
                  </span>
                  을<p className="text-center">조리하고 있어요.</p>
                </div>
              )}
              {step === 'minted' && (
                <div
                  className={`animate-fadeIn text-2xl font-semibold text-white`}
                >
                  <span
                    style={{
                      color: food?.hexCode,
                    }}
                  >
                    {food?.name}
                  </span>
                  이<p className="text-center">조리되었어요.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
