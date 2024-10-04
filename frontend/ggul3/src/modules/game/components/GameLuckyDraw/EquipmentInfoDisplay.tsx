import { Image } from '@nextui-org/react';

import { EquipmentDTO, EquipmentNFTDTO, HexCodesByGrade } from '../../@types';

import { ConfettieLottie } from './Lotties/ConfettieLottie';
import { PulseLottie } from './Lotties/PulseLottie';

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
  if (!equipment) return null;

  const displayEquipment = isEquipmentNftDTO(equipment)
    ? equipment.equipment
    : equipment;

  const hexCode = HexCodesByGrade[displayEquipment.grade];

  return (
    <>
      <p
        className="text-center text-3xl font-semibold"
        style={{ color: hexCode }}
      >
        {`${displayEquipment.adjective} ${displayEquipment.name}`}
      </p>
      <div className="flex h-48 w-full items-center justify-center">
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
