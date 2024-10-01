import { Card, CardBody, Image } from '@nextui-org/react';

import { EquipmentNFTDTO } from '@/modules/game/@types/new_index';

interface NftCardProps {
  equipmentNft: EquipmentNFTDTO;
  onCardClick: (equipmentNft: EquipmentNFTDTO) => void;
}

// grade별 hexCode 매핑
const gradeHexCodes = {
  0: '#FFD700', // 매우 희귀 (금색)
  1: '#C0C0C0', // 희귀 (은색)
  2: '#CD7F32', // 보통 (청동색)
  3: '#4682B4', // 흔함 (파란색)
  4: '#708090', // 매우 흔함 (회색)
};

export const NftCard = ({ equipmentNft, onCardClick }: NftCardProps) => {
  const { equipment } = equipmentNft;

  // grade에 따른 hexCode 선택
  const hexCode = gradeHexCodes[equipment.grade];

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
