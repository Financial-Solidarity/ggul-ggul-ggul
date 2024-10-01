import { useNavigate } from 'react-router-dom';
import { Image } from '@nextui-org/react';

import { MintedEquipmentCard } from './MintedFoodCard';
import { CookingLottie } from './CookingLottie';
import { EquipmentInfoDisplay } from './FoodInfoDisplay';
import { RandomNumber } from './RandomNumber';

import { EquipmentDTO } from '@/modules/game/@types/new_index';

// Define hex codes based on grade
const gradeHexCodes: Record<number, string> = {
  0: '#FFD700', // Gold for top grade
  1: '#C0C0C0', // Silver for second grade
  2: '#CD7F32', // Bronze for third grade
  3: '#B87333', // Copper for fourth grade
  4: '#708090', // Slate Gray for lowest grade
};

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
  // Get the hex color based on the grade
  const hexCode = equipment ? gradeHexCodes[equipment.grade] : '#FFFFFF';

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

        {/* Process info section with grade-based color */}
        <div className="PROCESS-INFO absolute -bottom-12 left-1/2 flex w-full -translate-x-1/2 items-center justify-center">
          {(step === 'minting' || step === 'minted') && (
            <>
              {step === 'minting' && (
                <div
                  className={`animate-fadeIn text-2xl font-semibold text-white`}
                >
                  <span
                    style={{
                      color: hexCode,
                    }}
                  >
                    {`${equipment?.adjective} ${equipment?.name}`}
                  </span>
                  를<p className="text-center">조리하고 있어요.</p>
                </div>
              )}
              {step === 'minted' && (
                <div
                  className={`animate-fadeIn text-2xl font-semibold text-white`}
                >
                  <span
                    style={{
                      color: hexCode,
                    }}
                  >
                    {`${equipment?.adjective} ${equipment?.name}`}
                  </span>
                  가<p className="text-center">조리되었어요.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
