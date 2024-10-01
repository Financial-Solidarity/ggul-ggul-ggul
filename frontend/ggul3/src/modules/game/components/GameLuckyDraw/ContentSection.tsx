import { useNavigate } from 'react-router-dom';
import { Image } from '@nextui-org/react';

import { MintedEquipmentCard } from '../GameInventory/NftCard';

import { CookingLottie } from './CookingLottie';
import { EquipmentInfoDisplay } from './FoodInfoDisplay';
import { RandomNumber } from './RandomNumber';

import { EquipmentDTO } from '@/modules/game/@types/new_index';

export interface ContentSectionProps {
  step: string;
  equipment: EquipmentDTO | null;
  navigate: ReturnType<typeof useNavigate>;
}

export const ContentSection = ({
  step,
  equipment,
  navigate,
}: ContentSectionProps) => {
  return (
    <div className="CONTENT-SECTION flex h-3/5 w-full flex-col items-center justify-center">
      <div className="EQUIPMENT-BOX relative mt-24 flex h-full w-full flex-col items-center">
        {step === 'init' && (
          <Image src={'/src/assets/images/serving_lid.png'} width={180} />
        )}
        {/* equipment가 null이 아닐 때만 렌더링 */}
        {step === 'minted' && equipment && (
          <MintedEquipmentCard equipment={equipment} onCardClick={() => {}} />
        )}
        {step === 'drawing' && <CookingLottie />}
        {(step === 'drawed' || step === 'minting') && (
          <EquipmentInfoDisplay equipment={equipment} step={step} />
        )}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="flex w-full flex-col items-center justify-center gap-12">
            {step !== 'minted' && <RandomNumber />}
          </div>
        </div>

        <div className="PROCESS-INFO absolute -bottom-12 left-1/2 flex -translate-x-1/2 items-center justify-center">
          {(step === 'minting' || step === 'minted') && (
            <>
              {step === 'minting' && (
                <div
                  className={`animate-fadeIn text-2xl font-semibold text-white`}
                >
                  <span>{equipment?.name}</span>을
                  <p className="text-center">조리하고 있어요.</p>
                </div>
              )}
              {step === 'minted' && (
                <div
                  className={`animate-fadeIn text-2xl font-semibold text-white`}
                >
                  <span>{equipment?.name}</span>이
                  <p className="text-center">조리되었어요.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
