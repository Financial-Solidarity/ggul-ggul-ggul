import { Button, Image } from '@nextui-org/react';

import { EquipmentDTO, EquipmentNFTDTO, HexCodesByGrade } from '../../@types';

import { ConfettieLottie } from './Lotties/ConfettieLottie';

import { PathNames } from '@/router';

interface MintedEquipmentCardProps {
  equipment: EquipmentDTO | EquipmentNFTDTO;
}

const isNFT = (
  equipment: EquipmentDTO | EquipmentNFTDTO,
): equipment is EquipmentNFTDTO => {
  return (equipment as EquipmentNFTDTO).equipment !== undefined;
};

export const MintedEquipmentCard = ({
  equipment,
}: MintedEquipmentCardProps): JSX.Element => {
  const equip = isNFT(equipment) ? equipment.equipment : equipment;

  const hexCode = HexCodesByGrade[equip.grade];

  return (
    <div className="NFT-CARD-CONTAINER h-70 relative w-56 rounded-2xl bg-primary-600 p-4 pb-4">
      <p className="text-xl font-semibold text-white">{`${equip?.adjective} ${equip?.name}`}</p>
      <div className="flex h-48 w-full items-center justify-center">
        <div
          className="h-28 w-28 animate-popIn rounded-full"
          style={{ backgroundColor: hexCode }}
        />
        <ConfettieLottie />
        <div className="IMAGE-WRAPPER absolute left-1/2 -translate-x-1/2 animate-fadeIn">
          <div className="animate-floating">
            <Image src={equip.imageUrl} width={130} />
          </div>
        </div>
        <div className="absolute -right-4 top-3">
          {isNFT(equipment) && (
            <Button
              fullWidth
              as="a"
              className="mt-4 animate-popIn bg-secondary-600 font-bold text-black"
              href={equipment.nftUrl}
              rel="noopener noreferrer"
              target="_blank"
              variant="flat"
            >
              NFT 확인
            </Button>
          )}
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
