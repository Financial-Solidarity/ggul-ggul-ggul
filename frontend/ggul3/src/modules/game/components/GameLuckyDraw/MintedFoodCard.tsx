import { Button, Image } from '@nextui-org/react';

import { EquipmentDTO, HexCodesByGrade } from '../../@types';

import { ConfettieLottie } from './Lotties/ConfettieLottie';

import { PathNames } from '@/router';

interface MintedEquipmentCardProps {
  equipment: EquipmentDTO;
  onCardClick: (equipment: EquipmentDTO) => void;
}

export const MintedEquipmentCard = ({
  equipment,
  onCardClick,
}: MintedEquipmentCardProps): JSX.Element => {
  const hexCode = HexCodesByGrade[equipment.grade];

  return (
    <div
      className="NFT-CARD-CONTAINER h-70 w-56 rounded-2xl bg-primary-600 p-4 pb-4"
      onClick={() => onCardClick(equipment)}
    >
      <p className="text-xl font-semibold text-white">{`${equipment?.adjective} ${equipment?.name}`}</p>
      <div className="flex h-48 w-full items-center justify-center">
        <div
          className="h-28 w-28 animate-popIn rounded-full"
          style={{ backgroundColor: hexCode }}
        />
        <ConfettieLottie />
        <div className="IMAGE-WRAPPER absolute left-1/2 -translate-x-1/2 animate-fadeIn">
          <div className="animate-floating">
            <Image src={equipment.imageUrl} width={130} />
          </div>
        </div>
      </div>
      <Button
        fullWidth
        className="bg-primary-400 py-3 text-white"
        onClick={(e) => {
          e.stopPropagation();
          window.location.href = PathNames.GAME.INVENTORY.path;
        }}
      >
        NFT 음식 보러가기
      </Button>
    </div>
  );
};
