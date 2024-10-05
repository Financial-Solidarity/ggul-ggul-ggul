import { Card, CardBody, Button, Image } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

import { HexCodesByGrade, MarketItemDTO } from '@/modules/game/@types';
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
            className="relative h-56 bg-gradient-to-tr from-primary-500 to-primary-900 py-2 text-white"
          >
            <CardBody>
              <div className="flex w-full justify-between">
                <p className="mb-4 text-lg font-semibold">{marketItem.title}</p>
                <div className="CHIPS-INFO mt-2 flex flex-col items-end justify-between gap-2">
                  <div className="POWER-CHIP min-w-8 rounded-full bg-primary-600 px-2 py-1 text-sm">
                    <div>{marketItem?.power} 맛도리</div>
                  </div>
                  <div
                    className={`PREICE-CHIP flex h-7 min-w-14 max-w-24 items-center justify-between gap-2 rounded-xl bg-primary-600 px-2 py-1`}
                  >
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-center font-semibold text-primary-600">
                      ㄲ
                    </div>
                    <div className="min-w-4 text-sm text-white">
                      {marketItem.price}
                    </div>
                  </div>
                </div>
              </div>

              <div className={`relative mt-8 flex items-center justify-center`}>
                <div
                  className={`absolute h-36 w-36 animate-popIn rounded-full`}
                  style={{ backgroundColor: HexCodesByGrade[marketItem.grade] }}
                />
                <div className="IMAGE-WRAPPER absolute flex animate-fadeIn items-center justify-center">
                  <Image
                    className="animate-floating"
                    src={marketItem.imageUrl}
                    width={135}
                  />
                </div>
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
