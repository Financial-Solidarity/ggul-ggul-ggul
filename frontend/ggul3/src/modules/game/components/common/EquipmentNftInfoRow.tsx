import { Image } from '@nextui-org/react';

import { GroupNumberWithBox } from './GroupNumberWithBox';

import { EquipmentNFTDTO, HexCodesByGrade } from '@/modules/game/@types';

interface EquipmentNftInfoRowProps {
  equipmentNft?: EquipmentNFTDTO;
}

export const EquipmentNftInfoRow = ({
  equipmentNft,
}: EquipmentNftInfoRowProps) => {
  // grade에 따른 hexCode 선택
  const hexCode = HexCodesByGrade[equipmentNft?.equipment.grade || 0];

  return (
    <div className="flex flex-row items-center justify-between">
      {/* 타이틀 영역 */}
      <div className="items-left flex w-2/3 flex-col gap-3">
        <p
          className="text-left text-3xl font-semibold"
          style={{ color: hexCode }}
        >
          {`${equipmentNft?.equipment.adjective} ${equipmentNft?.equipment.name}`}
        </p>
        {/* 숫자 영역 */}
        <GroupNumberWithBox
          number={equipmentNft?.equipment.power}
          withLabel={false}
        />
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
