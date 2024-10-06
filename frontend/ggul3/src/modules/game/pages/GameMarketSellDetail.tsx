import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Image,
  Tooltip,
  Spinner,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react';
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
  useCancelMarketSaleMutation,
} from '@/modules/game/queries';
import { PathNames } from '@/router';

export const GameMarketSellDetail = (): JSX.Element => {
  useSetBottomBar({ active: true, isDarkMode: true });
  const { state } = useLocation();
  const { marketId: paramMarketId } = useParams<{ marketId: string }>();

  const navigate = useNavigate();
  const [isLoadingBuy, setIsLoadingBuy] = useState(false);
  const [isLoadingCancel, setIsLoadingCancel] = useState(false);
  const [isBuySuccessful, setIsBuySuccessful] = useState<boolean | null>(null);

  const { isOpen: isCancelModalOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isTokenModalOpen,
    onOpen: openTokenModal,
    onClose: closeTokenModal,
  } = useDisclosure();

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
  const { mutate: cancelMarketSale } = useCancelMarketSaleMutation();

  const sessionData = localStorage.getItem('session');
  const loggedInUserName = sessionData
    ? JSON.parse(sessionData).state.user.username
    : '';

  // 내 판매글인지 판별
  const isMyPost = marketDetail?.seller.username === loggedInUserName;
  const isCompleted = marketDetail?.status === 'COMPLETED';

  const handleBuy = () => {
    if (!canAfford) {
      // Toast 알림
      toast.error('가진 껄이 부족하여 구매할 수 없어요.');

      // 모달 열기
      openTokenModal();

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

  const handleCancelSale = () => {
    setIsLoadingCancel(true);

    cancelMarketSale(marketId as string, {
      onSuccess: () => {
        toast.success('판매글을 삭제했어요.');
        handleGoBack(); // 판매 취소 성공 시 뒤로가기
      },
      onError: (error) => {
        console.error('판매 취소 오류:', error);
        toast.error('판매 취소에 실패하였습니다.');
      },
      onSettled: () => {
        setIsLoadingCancel(false);
        onClose(); // 모달 닫기
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

  if (isBuySuccessful !== null) {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-black">
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
          <div className="USER-AVATAR flex h-20 w-20 items-center justify-center overflow-hidden rounded-full">
            <Image
              alt="seller avatar"
              className="rounded-full object-cover"
              fallbackSrc="/placeholder-avatar.png"
              height={75}
              src={marketDetail.seller.profileImg}
              width={75}
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

        {/* 구매자 정보 및 판매 완료 시각 표시 */}
        {isCompleted && (
          <div className="mt-4 flex w-full flex-col gap-2 rounded-lg bg-default-900 px-2 py-4 text-white">
            <div className="text-sm">
              <span className="font-semibold text-primary-300">구매자:</span>{' '}
              {marketDetail.buyer?.nickname}
            </div>
            <div className="text-sm">
              <span className="font-semibold text-primary-300">
                판매 완료 시간:
              </span>{' '}
              {marketDetail.completedAt
                ? formatToRelativeTime(marketDetail.completedAt)
                : 'N/A'}
            </div>
          </div>
        )}

        {/* 내 판매글일 경우 판매 취소 버튼, 아니면 구매 버튼 */}
        {isMyPost ? (
          isCompleted ? (
            <Button
              disabled
              className="mt-4 h-12 w-full bg-default-700 text-white"
            >
              판매 완료
            </Button>
          ) : (
            <>
              {/* 판매 취소 버튼 */}
              <Button
                className="mt-4 h-12 w-full bg-red-600 text-white"
                onClick={onOpen}
              >
                {isLoadingCancel ? <Spinner color="white" /> : '판매 취소하기'}
              </Button>

              {/* 판매 취소 모달 */}
              <Modal
                backdrop="blur"
                isOpen={isCancelModalOpen}
                placement="center"
                onClose={onClose}
              >
                <ModalContent>
                  {() => (
                    <>
                      <ModalHeader>판매 취소</ModalHeader>
                      <ModalBody>
                        <p>정말 판매를 취소할까요?</p>
                        <p>
                          판매 취소 시 해당 NFT는 다시 보유 목록에 추가됩니다.
                        </p>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="danger"
                          disabled={isLoadingCancel}
                          onClick={handleCancelSale}
                        >
                          {isLoadingCancel ? (
                            <Spinner color="white" />
                          ) : (
                            '네, 취소합니다'
                          )}
                        </Button>
                        <Button onClick={onClose}>
                          아니요, 계속 판매합니다
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </>
          )
        ) : (
          // 구매 버튼 (내 판매글이 아닐 때만 표시)
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
              disabled={isLoadingBuy}
              onClick={handleBuy}
            >
              {isLoadingBuy ? <Spinner color="white" /> : 'NFT 음식 구매하기'}
            </Button>
          </Tooltip>
        )}
      </div>

      {/* 토큰 부족 안내 모달 */}
      <Modal
        backdrop="blur"
        isOpen={isTokenModalOpen}
        placement="center"
        onClose={closeTokenModal}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader>껄은 어떻게 얻을 수 있을까요?</ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-4">
                  <p>
                    <span className="font-semibold text-success">
                      소비 줄이기 챌린지
                    </span>{' '}
                    플레이를 통해 껄을 얻을 수 있습니다.
                  </p>
                  <p>
                    <span className="font-semibold text-primary">
                      방치형 껄 키우기 게임
                    </span>
                    을 통해 껄을 얻을 수 있어요! NFT 음식을 뽑거나 구매 후,
                    장착하면 게임이 시작돼요.
                  </p>
                </div>
              </ModalBody>
              <ModalFooter className="flex flex-col gap-2">
                <div className="flex w-full justify-between gap-3">
                  <Button
                    fullWidth
                    color="success"
                    onClick={() => {
                      navigate(PathNames.CHALLENGE.MAIN.path);
                    }}
                  >
                    챌린지 하러가기
                  </Button>
                  <Button
                    fullWidth
                    color="primary"
                    onClick={() => {
                      navigate(PathNames.GAME.MAIN.path);
                    }}
                  >
                    껄 키우기 하러가기
                  </Button>
                </div>
                <Button
                  fullWidth
                  className="bg-default-700 text-white"
                  onClick={closeTokenModal}
                >
                  알겠습니다
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </PageContainer>
  );
};
