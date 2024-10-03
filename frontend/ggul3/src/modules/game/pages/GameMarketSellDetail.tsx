import { useParams } from 'react-router-dom';
import { Button, Image } from '@nextui-org/react';

import { useSetBottomBar } from '@/modules/common/hooks/useSetBottomBar';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { formatToRelativeTime } from '@/modules/common/utils/dateUtils';
import { useMarketItemDetailQuery } from '@/modules/game/queries';

export const GameMarketSellDetail = (): JSX.Element => {
  useSetBottomBar({ active: true, isDarkMode: true });
  const { marketId } = useParams<{ marketId: string }>();
  const {
    data: marketDetail,
    isLoading,
    isError,
  } = useMarketItemDetailQuery(marketId as string);

  // 로딩 및 에러 처리
  if (isLoading)
    return <div className="text-center text-white">로딩 중...</div>;
  if (isError || !marketDetail)
    return (
      <div className="text-center text-white">
        상세 정보를 불러올 수 없습니다.
      </div>
    );

  return (
    <PageContainer activePaddingX={false} bgColor="bg-black">
      {/* 상단 영역 */}
      <div className="relative h-1/2 bg-gradient-to-br from-purple-400 to-purple-800 p-4">
        <BackButton circular />
        <div className="flex flex-col items-center">
          {/* 이미지 영역 */}
          <div className="relative h-44 w-44 animate-floating">
            <Image
              alt={marketDetail.title}
              className="rounded-full object-cover"
              height={180}
              src={marketDetail.equipmentNFT.equipment.imageUrl}
              width={180}
            />
          </div>
        </div>
      </div>

      {/* 하단 영역 */}
      <div className="relative flex h-1/2 flex-col rounded-t-3xl bg-black px-4 py-6">
        {/* 판매자 및 시간 정보 */}
        <div className="text-center text-default-400">
          <p className="text-lg font-semibold">{marketDetail.title}</p>
          <p>{formatToRelativeTime(marketDetail.createdAt)}</p>
        </div>

        {/* 상세 내용 */}
        <div className="mt-4 flex justify-between">
          <div className="text-white">
            <p>파워: {marketDetail.equipmentNFT.equipment.power}</p>
            <p>등급: {marketDetail.equipmentNFT.equipment.grade}</p>
          </div>
          <div className="text-primary-300">
            <p>가격: ㄲ {marketDetail.price}</p>
          </div>
        </div>

        {/* 구매 버튼 */}
        <Button className="mt-auto bg-primary-600 text-white">
          NFT 구매하기
        </Button>
      </div>
    </PageContainer>
  );
};
