import { Button, Image } from '@nextui-org/react';

import { ConfettieLottie } from '../GameLuckyDraw/ConfettieLottie';
import { EquipmentDTO } from '../../@types/new_index';

import { PathNames } from '@/router';

interface MintedEquipmentCardProps {
  equipment: EquipmentDTO;
  onCardClick: (equipment: EquipmentDTO) => void; // 추가된 onCardClick prop
}

export const MintedEquipmentCard = ({
  equipment,
  onCardClick,
}: MintedEquipmentCardProps): JSX.Element => (
  <div
    className="NFT-CARD-CONTAINER h-80 w-56 rounded-2xl bg-primary-600 p-4"
    onClick={() => onCardClick(equipment)} // 클릭 시 onCardClick 호출
  >
    <p className="text-xl font-semibold text-white">{equipment.name}</p>
    <div className="flex h-48 w-full items-center justify-center">
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
        e.stopPropagation(); // prevent triggering onCardClick when button is clicked
        window.location.href = PathNames.GAME.INVENTORY.path; // 변경된 이동 로직
      }}
    >
      NFT 장비 보러가기
    </Button>
  </div>
);
