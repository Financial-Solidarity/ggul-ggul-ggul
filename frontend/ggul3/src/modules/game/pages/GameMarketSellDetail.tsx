import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Image, Tooltip, Spinner } from '@nextui-org/react';
import { toast } from 'react-hot-toast';
import { useState } from 'react';

import { EquipmentNftInfo } from '../components/common/EquipmentNftInfo';
import { MiniTokenBalanceChip } from '../components/common/MiniTokenBalanceChip';
import { SuccessLottie } from '../components/common/Lotties/SuccessLottie';
import { FailLottie } from '../components/common/Lotties/FailLottie';

import { useSetBottomBar } from '@/modules/common/hooks/useSetBottomBar';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { formatToRelativeTime } from '@/modules/common/utils/dateUtils';
import {
  useMarketItemDetailQuery,
  useBuyEquipmentMutation,
  useTokenBalanceQuery,
} from '@/modules/game/queries';

export const GameMarketSellDetail = (): JSX.Element => {
  useSetBottomBar({ active: true, isDarkMode: true });
  const { state } = useLocation();
  const { marketId: paramMarketId } = useParams<{ marketId: string }>();

  const navigate = useNavigate();
  const [isLoadingBuy, setIsLoadingBuy] = useState(false);
  const [isBuySuccessful, setIsBuySuccessful] = useState<boolean | null>(null);

  const handleGoBack = () => {
    navigate('/game/market', { replace: true });
  };

  const marketId = state?.marketId || paramMarketId;

  const {
    data: marketDetail,
    isLoading,
    isError,
  } = useMarketItemDetailQuery(marketId as string);

  const { data: tokenData } = useTokenBalanceQuery();
  const userTokenBalance = tokenData?.balance ?? 0;

  const { mutate: buyEquipment } = useBuyEquipmentMutation();

  const handleBuy = () => {
    if (!canAfford) {
      toast.error('가진 껄이 부족하여 구매할 수 없어요.');

      return;
    }

    setIsLoadingBuy(true);

    buyEquipment(marketId as string, {
      onSuccess: () => {
        setIsBuySuccessful(true);
        toast.success('NFT 구매가 완료되었습니다!');
      },
      onError: (error) => {
        setIsBuySuccessful(false);
        console.error('구매 오류:', error);
        toast.error('구매에 실패하였습니다.');
      },
      onSettled: () => {
        setIsLoadingBuy(false);
      },
    });
  };

  if (isLoading)
    return <div className="text-center text-white">로딩 중...</div>;
  if (isError || !marketDetail)
    return (
      <div className="text-center text-white">
        상세 정보를 불러올 수 없습니다.
      </div>
    );

  const canAfford = userTokenBalance >= marketDetail.price;

  // Handle the result screen based on the purchase outcome
  if (isBuySuccessful !== null) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        {isBuySuccessful ? <SuccessLottie /> : <FailLottie />}
        <p
          className={`mt-4 text-2xl font-semibold ${isBuySuccessful ? 'text-white' : 'text-red-500'}`}
        >
          {isBuySuccessful ? '구매에 성공했어요!' : '구매에 실패했어요!'}
        </p>
        <Button className="mt-8 bg-gray-600 text-white" onClick={handleGoBack}>
          돌아가기
        </Button>
      </div>
    );
  }

  return (
    <PageContainer activePaddingX={false} bgColor="bg-black">
      {/* 상단 영역 */}
      <div className="relative h-1/2 bg-gradient-to-br from-purple-400 to-purple-800 p-4">
        <div className="flex w-full items-center justify-between">
          <BackButton circular />
          <MiniTokenBalanceChip />
        </div>
        <div className="flex flex-col items-center">
          {/* 이미지 영역 */}
          <EquipmentNftInfo equipmentNft={marketDetail.equipmentNFT} />
        </div>
      </div>

      {/* 하단 영역 */}
      <div className="relative flex h-1/2 flex-col justify-between rounded-t-3xl bg-black px-4 py-6">
        {/* 판매자 정보 */}
        <div className="absolute -top-10 left-1/2 flex -translate-x-1/2 flex-col items-center justify-center gap-2 text-center text-default-400">
          <div className="USER-AVATAR flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-gray-300">
            <Image
              alt="seller avatar"
              className="rounded-full object-cover"
              fallbackSrc="/placeholder-avatar.png"
              height={64}
              src={marketDetail.seller.profileImg}
              width={64}
            />
          </div>
          <p className="text-lg font-semibold">
            {marketDetail.seller.nickname}
          </p>
        </div>

        {/* 판매글 등록일 */}
        <div className="CREATED_AT absolute right-4">
          <p className="text-sm text-default-400">
            {formatToRelativeTime(marketDetail.createdAt)}
          </p>
        </div>

        {/* 아이템 정보 */}
        <div className="mt-20 flex justify-between">
          <div className="flex w-2/3 flex-col gap-1">
            <p className="text-lg font-semibold text-white">
              {marketDetail.title}
            </p>
            <p className="font-light text-default-400">
              {marketDetail.description || '상세 설명이 없습니다.'}
            </p>
          </div>
          <div className="flex w-1/3 flex-col gap-3">
            <div className="GGUL-PRICE ml-auto flex flex-row items-center justify-center gap-2 text-default-400">
              <div className="GGUL-ICON flex h-5 w-5 items-center justify-center rounded-full bg-default-400 text-sm font-bold text-black">
                ㄲ
              </div>
              {marketDetail.price} 껄
            </div>
          </div>
        </div>

        {/* 구매 버튼 */}
        <Tooltip
          color="default"
          content="가진 껄이 부족해요"
          isOpen={!canAfford}
          showArrow={true}
        >
          <Button
            className={`mt-4 h-12 w-full text-white ${
              canAfford ? 'bg-primary-600' : 'bg-default-700'
            }`}
            disabled={!canAfford || isLoadingBuy}
            onClick={handleBuy}
          >
            {isLoadingBuy ? <Spinner color="white" /> : 'NFT 음식 구매하기'}
          </Button>
        </Tooltip>
      </div>
    </PageContainer>
  );
};
