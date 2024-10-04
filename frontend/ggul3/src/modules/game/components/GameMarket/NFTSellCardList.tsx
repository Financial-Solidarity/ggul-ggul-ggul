import { Card, CardBody, Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

import { MarketItemDTO } from '@/modules/game/@types';
import { PathNames } from '@/router';

interface NFTSellCardListProps {
  nftList: MarketItemDTO[];
}

export const NFTSellCardList: React.FC<NFTSellCardListProps> = ({
  nftList,
}) => {
  const navigate = useNavigate();

  const handleDetailClick = (marketItem: MarketItemDTO) => {
    if (!marketItem.marketId) {
      console.log('marketId is undefined:', marketItem);

      return;
    }

    navigate(
      `${PathNames.GAME.MARKET_DETAIL.path.replace(':id', marketItem.marketId)}`,
      { state: { marketId: marketItem.marketId } },
    );
  };

  return (
    <div className="mt-6 grid grid-cols-1 gap-4">
      {nftList.length === 0 ? (
        <p className="text-center text-white">텅</p>
      ) : (
        nftList.map((marketItem) => (
          <Card
            key={marketItem.marketId}
            isHoverable
            className="relative bg-gradient-to-tr from-primary-500 to-primary-900 py-2 text-white"
          >
            <CardBody>
              <p className="font-semibold">{marketItem.title}</p>
              <div className="mt-2 flex items-center justify-between">
                <span>껄 {marketItem.price}</span>
              </div>
              <Button
                className="absolute bottom-1 right-4 z-20 mt-4 h-12 w-44 rounded-full bg-default-500/20 font-semibold text-white shadow-lg backdrop-blur-md backdrop-saturate-150"
                onClick={() => handleDetailClick(marketItem)}
              >
                NFT 판매글 보기
              </Button>
            </CardBody>
          </Card>
        ))
      )}
    </div>
  );
};
