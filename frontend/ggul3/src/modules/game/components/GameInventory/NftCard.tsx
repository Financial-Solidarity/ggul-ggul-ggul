import { Card, CardBody, Image } from '@nextui-org/react';

import { FoodNftDTO } from '@/modules/game/@types/food';

interface NftCardProps {
  foodNft: FoodNftDTO;
  onCardClick: (foodNft: FoodNftDTO) => void;
}

export const NftCard = ({ foodNft, onCardClick }: NftCardProps) => (
  <Card
    isPressable
    className="h-24 bg-default-700 transition-shadow hover:shadow-lg"
    radius="lg"
    shadow="md"
    onPress={() => onCardClick(foodNft)}
  >
    <CardBody className="relative flex justify-center p-1">
      <div
        className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ backgroundColor: foodNft.hexCode }}
      />
      <Image
        className="relative z-10"
        src={`/src/assets/images/food/food_${foodNft.typeIndex}.png`}
        width={80}
      />
    </CardBody>
  </Card>
);
