import { Button, Image } from '@nextui-org/react';

import { ConfettieLottie } from '../GameLuckyDraw/ConfettieLottie';
import { EquipmentDTO } from '../../@types/new_index';

import { PathNames } from '@/router';

interface MintedEquipmentCardProps {
  equipment: EquipmentDTO;
  onCardClick: (equipment: EquipmentDTO) => void;
}

// grade별 hexCode 매핑
const gradeHexCodes = {
  0: '#FFD700', // 매우 희귀 (금색)
  1: '#C0C0C0', // 희귀 (은색)
  2: '#CD7F32', // 보통 (청동색)
  3: '#4682B4', // 흔함 (파란색)
  4: '#708090', // 매우 흔함 (회색)
};

export const MintedEquipmentCard = ({
  equipment,
  onCardClick,
}: MintedEquipmentCardProps): JSX.Element => {
  // equipment의 grade에 따라 색상을 결정
  const hexCode = gradeHexCodes[equipment.grade];

  return (
    <div
      className="NFT-CARD-CONTAINER h-70 w-56 rounded-2xl bg-primary-600 p-4 pb-2"
      onClick={() => onCardClick(equipment)}
    >
      <p className="text-xl font-semibold text-white">{equipment.name}</p>
      <div className="flex h-48 w-full items-center justify-center">
        {/* Circular Background 적용 */}
        <div
          className="CIRCULAR-BACKGROUND"
          style={{ backgroundColor: hexCode }}
        />
        <div
          className="h-30 w-30 animate-popIn rounded-full"
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
