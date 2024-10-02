import { Card, CardBody, Image } from '@nextui-org/react';

import { EquipmentNFTDTO, HexCodesByGrade } from '@/modules/game/@types';

interface NftMiniCardProps {
  equipmentNft: EquipmentNFTDTO;
  onCardClick: (equipmentNft: EquipmentNFTDTO) => void;
}

export const NftMiniCard = ({
  equipmentNft,
  onCardClick,
}: NftMiniCardProps) => {
  const { equipment } = equipmentNft;

  // grade에 따른 hexCode 선택
  const hexCode = HexCodesByGrade[equipment.grade];

  return (
    <Card
      isPressable
      className="h-24 bg-default-700 transition-shadow hover:shadow-lg"
      radius="lg"
      shadow="md"
      onPress={() => onCardClick(equipmentNft)}
    >
      <CardBody className="relative flex justify-center p-1">
        <div
          className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ backgroundColor: hexCode }} // grade에 따른 색상 적용
        />
        <Image className="relative z-10" src={equipment.imageUrl} width={80} />
      </CardBody>
    </Card>
  );
};
