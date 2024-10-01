// import { Image } from '@nextui-org/react';

// import { ConfettieLottie } from './ConfettieLottie';
// import { PulseLottie } from './PulseLottie';

// import { FoodDTO, FoodNftDTO } from '@/modules/game/@types/equipment';

// interface FoodInfoDisplayProps {
//   step?: string | null;
//   food?: FoodDTO | FoodNftDTO | null;
// }

// function isFoodNftDTO(food: FoodDTO | FoodNftDTO): food is FoodNftDTO {
//   return (food as FoodNftDTO).tokenId !== undefined;
// }

// export const FoodInfoDisplay = ({
//   step = null,
//   food = null,
// }: FoodInfoDisplayProps): JSX.Element => (
//   <>
//     <p
//       className="text-center text-3xl font-semibold"
//       style={{ color: food?.hexCode }}
//     >
//       {food?.name}
//     </p>
//     <div className="flex h-48 w-full items-center justify-center">
//       <div
//         className="CIRCULAR-BACKGROUND"
//         style={{ backgroundColor: food?.hexCode }}
//       />
//       <div
//         className="h-32 w-32 animate-popIn rounded-full"
//         style={{ backgroundColor: food?.hexCode }}
//       />
//       {step === 'drawed' && <ConfettieLottie />}
//       {step === 'minting' && <PulseLottie />}
//       <div className="IMAGE-WRAPPER absolute left-1/2 -translate-x-1/2 animate-fadeIn">
//         {(step === 'drawed' || step === 'minting') && (
//           <div className="animate-floating">
//             <Image
//               src={'/src/assets/images/food/food_' + food?.typeIndex + '.png'}
//               width={130}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   </>
// );

// frontend/ggul3/src/modules/game/components/GameLuckyDraw/EquipmentInfoDisplay.tsx
import { Image } from '@nextui-org/react';

import { EquipmentDTO, EquipmentNFTDTO } from '../../@types/new_index';

import { ConfettieLottie } from './ConfettieLottie';
import { PulseLottie } from './PulseLottie';

// Define hex codes based on grade
const gradeHexCodes: Record<number, string> = {
  0: '#FFD700', // Gold for top grade
  1: '#C0C0C0', // Silver for second grade
  2: '#CD7F32', // Bronze for third grade
  3: '#B87333', // Copper for fourth grade
  4: '#708090', // Slate Gray for lowest grade
};

interface EquipmentInfoDisplayProps {
  step?: string | null;
  equipment?: EquipmentDTO | EquipmentNFTDTO | null;
}

function isEquipmentNftDTO(
  equipment: EquipmentDTO | EquipmentNFTDTO,
): equipment is EquipmentNFTDTO {
  return (equipment as EquipmentNFTDTO).ipfsCID !== undefined;
}

export const EquipmentInfoDisplay = ({
  step = null,
  equipment = null,
}: EquipmentInfoDisplayProps): JSX.Element | null => {
  // Check for null and return null if equipment is not provided
  if (!equipment) return null;

  const displayEquipment = isEquipmentNftDTO(equipment)
    ? equipment.equipment // Access the nested equipment
    : equipment;

  // Get the hex color based on the grade
  const hexCode = gradeHexCodes[displayEquipment.grade];

  return (
    <>
      <p
        className="text-center text-3xl font-semibold"
        style={{ color: hexCode }}
      >
        {`${displayEquipment.adjective} ${displayEquipment.name}`}
      </p>
      <div className="flex h-48 w-full items-center justify-center">
        {/* Circular background based on grade */}
        <div
          className="CIRCULAR-BACKGROUND"
          style={{ backgroundColor: hexCode }}
        />
        <div
          className="h-32 w-32 animate-popIn rounded-full"
          style={{ backgroundColor: hexCode }}
        />
        {step === 'drawed' && <ConfettieLottie />}
        {step === 'minting' && <PulseLottie />}
        <div className="IMAGE-WRAPPER absolute left-1/2 -translate-x-1/2 animate-fadeIn">
          {(step === 'drawed' || step === 'minting') && (
            <div className="animate-floating">
              <Image src={displayEquipment.imageUrl} width={130} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
