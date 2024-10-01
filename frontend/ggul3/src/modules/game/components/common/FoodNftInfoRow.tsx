import { Image } from '@nextui-org/react';

import { GroupNumberWithBox } from './GroupNumberWithBox';

import { EquipmentNFTDTO } from '@/modules/game/@types/new_index';

interface FoodNftInfoRowProps {
  equipmentNft?: EquipmentNFTDTO;
}

// grade별 hexCode 매핑
const gradeHexCodes = {
  0: '#FFD700', // 매우 희귀 (금색)
  1: '#C0C0C0', // 희귀 (은색)
  2: '#CD7F32', // 보통 (청동색)
  3: '#4682B4', // 흔함 (파란색)
  4: '#708090', // 매우 흔함 (회색)
};

export const FoodNftInfoRow = ({ equipmentNft }: FoodNftInfoRowProps) => {
  // grade에 따른 hexCode 선택
  const hexCode = gradeHexCodes[equipmentNft?.equipment.grade || 0];

  return (
    <div className="flex flex-row items-center justify-between">
      {/* 타이틀 영역 */}
      <div className="items-left flex w-2/3 flex-col gap-3">
        <p
          className="text-left text-3xl font-semibold"
          style={{ color: hexCode }}
        >
          {equipmentNft?.equipment.name}
        </p>
        {/* 숫자 영역 */}
        <GroupNumberWithBox number={12} withLabel={false} />
      </div>
      {/* 이미지 영역 */}
      <div className="relative flex h-20 w-1/3 items-center justify-center">
        <div
          className="h-24 w-24 animate-popIn rounded-full"
          style={{ backgroundColor: hexCode }}
        />
        <div className="IMAGE-WRAPPER absolute flex animate-fadeIn items-center justify-center">
          <Image
            className="animate-floating"
            src={equipmentNft?.equipment.imageUrl}
            width={115}
          />
        </div>
      </div>
    </div>
  );
};
