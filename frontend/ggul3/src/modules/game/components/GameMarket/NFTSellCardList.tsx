import { Card, CardBody, Button } from '@nextui-org/react';

import { FoodNftInfo } from '../common/FoodNftInfo';

import { FoodNftSellDTO } from '@/modules/game/@types/food';

interface NFTSellCardListProps {
  nftList: FoodNftSellDTO[];
}

export const NFTSellCardList: React.FC<NFTSellCardListProps> = ({
  nftList,
}) => (
  <div className="mt-6 grid grid-cols-1 gap-4">
    {nftList.length === 0 ? (
      <p className="text-center text-white">텅</p>
    ) : (
      nftList.map((foodNft) => (
        <Card
          key={foodNft.tokenId}
          isHoverable
          className="bg-purple-500 text-white"
        >
          <CardBody>
            <p className="font-semibold">{foodNft.name}</p>
            <div className="mt-2 flex items-center justify-between">
              <span>껄 {foodNft.price}</span>
              <span>{foodNft.createdAt}</span>
            </div>
            <FoodNftInfo
              foodNft={foodNft}
              showNumber={false}
              showTitle={false}
            />
            <Button className="mt-4">NFT 음식 판매글 보기</Button>
          </CardBody>
        </Card>
      ))
    )}
  </div>
);
