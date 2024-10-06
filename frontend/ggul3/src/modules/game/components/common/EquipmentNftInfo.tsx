import { Button, Image } from '@nextui-org/react';

import { EquipmentNFTDTO, HexCodesByGrade } from '../../@types';

import { GroupNumberWithBox } from './GroupNumberWithBox';

interface EquipmentNftInfoProps {
  equipmentNft?: EquipmentNFTDTO;
  showTitle?: boolean;
  showNumber?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
  xs: { circle: 'h-16 w-16', image: 60 },
  sm: { circle: 'h-20 w-20', image: 80 },
  md: { circle: 'h-28 w-28', image: 135 },
  lg: { circle: 'h-36 w-36', image: 160 },
  xl: { circle: 'h-44 w-44', image: 200 },
};

export const EquipmentNftInfo = ({
  equipmentNft,
  showTitle = true,
  showNumber = true,
  size = 'md',
}: EquipmentNftInfoProps) => {
  const { circle, image } = sizeClasses[size];

  const hexCode = HexCodesByGrade[equipmentNft?.equipment.grade || 0];

  return (
    <div className="flex flex-col items-center">
      {/* 타이틀 영역 */}
      {showTitle && (
        <p
          className="text-center text-2xl font-bold"
          style={{ color: hexCode }}
        >
          {`${equipmentNft?.equipment.adjective} ${equipmentNft?.equipment.name}`}
        </p>
      )}

      {/* 이미지 영역 */}
      <div
        className={`relative flex h-44 items-center justify-center ${circle}`}
      >
        <div
          className={`animate-popIn rounded-full ${circle}`}
          style={{ backgroundColor: hexCode }}
        />
        {equipmentNft?.equipment.transactionUrl ? (
          <Button
            fullWidth
            as="a"
            className="absolute -right-12 top-28 w-max animate-popIn bg-secondary-600 font-semibold text-black"
            href={equipmentNft?.equipment.transactionUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            블록 로그
          </Button>
        ) : (
          <Button
            fullWidth
            as="a"
            className="absolute -right-12 top-28 w-max animate-popIn bg-secondary-600 font-semibold text-black"
            href={equipmentNft?.nftUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            NFT 정보
          </Button>
        )}

        <div className="IMAGE-WRAPPER absolute flex animate-fadeIn items-center justify-center">
          <Image
            className="animate-floating"
            src={equipmentNft?.equipment.imageUrl}
            width={image}
          />
        </div>
      </div>

      {/* 숫자 영역 */}
      {showNumber && (
        <GroupNumberWithBox number={equipmentNft?.equipment.power} />
      )}
    </div>
  );
};
