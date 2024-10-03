import { Card, CardBody, Image } from '@nextui-org/react';

import { EquipmentNFTDTO, HexCodesByGrade } from '@/modules/game/@types';

interface NftMiniCardProps {
  equipmentNft: EquipmentNFTDTO;
  onCardClick: (equipmentNft: EquipmentNFTDTO) => void;
  isEquipped: boolean;
}

export const NftMiniCard = ({
  equipmentNft,
  onCardClick,
  isEquipped,
}: NftMiniCardProps) => {
  const hexCode = HexCodesByGrade[equipmentNft?.equipment.grade];

  return (
    <Card
      isPressable
      className={`h-24 transition-shadow hover:shadow-lg ${
        isEquipped ? 'border-2 border-blue-500' : 'bg-default-700'
      }`}
      radius="lg"
      shadow="md"
      onPress={() => onCardClick(equipmentNft)}
    >
      <CardBody className="relative flex justify-center p-1">
        <div
          className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ backgroundColor: hexCode }}
        />
        <Image
          className="relative z-10"
          src={equipmentNft?.equipment.imageUrl}
          width={80}
        />
      </CardBody>
    </Card>
  );
};
