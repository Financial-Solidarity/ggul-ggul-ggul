import { Image, Spinner } from '@nextui-org/react';
import { useEffect, useState, useRef } from 'react';
import { Button } from '@nextui-org/button';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { MiniTokenBalanceChip } from '../components/common/MiniTokenBalanceChip';
import {
  useReceivableTokenAmountQuery,
  useReceiveTokenMutation,
  useTokenBalanceQuery,
  useEquippedEquipmentQuery,
} from '../queries';
import { EquipmentNftInfoRow } from '../components/common/EquipmentNftInfoRow';

import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { useSetBottomBar } from '@/modules/common/hooks/useSetBottomBar';
import './GameGame.css';
import Spoon from '@/assets/images/game_spoon.png';
import { formatToRelativeTime } from '@/modules/common/utils/dateUtils';
import { PathNames } from '@/router';
import { NotificationButton } from '@/modules/common/components/NotificationButton/NotificationButton';

export const GameGame = () => {
  useSetBottomBar({ active: true, isDarkMode: true });

  const navigate = useNavigate();
  const handleMoveToInventory = () => {
    navigate(`${PathNames.GAME.INVENTORY.path}`);
  };

  const [animationAmount, setAnimationAmount] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);

  const [displayedReceivableToken, setDisplayedReceivableToken] = useState(0);
  const [buttonHighlight, setButtonHighlight] = useState(false);
  const previousReceivableToken = useRef(displayedReceivableToken);

  const [isReceiving, setIsReceiving] = useState(false);

  const { data: equippedEquipment, error: equippedError } =
    useEquippedEquipmentQuery();

  const { data: receivableTokenData, refetch: refetchReceivableToken } =
    useReceivableTokenAmountQuery();

  const receiveTokenMutation = useReceiveTokenMutation();

  const { refetch: refetchTokenBalance } = useTokenBalanceQuery();

  useEffect(() => {
    const interval = setInterval(() => {
      refetchReceivableToken();
    }, 5000);

    return () => clearInterval(interval);
  }, [refetchReceivableToken]);

  const handleReceiveToken = () => {
    setIsReceiving(true);
    receiveTokenMutation.mutate(undefined, {
      onSuccess: () => {
        setIsReceiving(false);
        toast.success('껄을 성공적으로 수령했습니다!');
        refetchReceivableToken();
        refetchTokenBalance();
      },
      onError: (error) => {
        setIsReceiving(false);
        toast.error('껄 수령에 실패하였습니다.');
      },
    });
  };

  useEffect(() => {
    const receivableToken = receivableTokenData?.receivableToken ?? 0;

    if (previousReceivableToken.current !== receivableToken) {
      setButtonHighlight(true);

      // 변화량과 스텝 크기 계산 (한 번만 계산)
      const difference = Math.abs(
        receivableToken - previousReceivableToken.current,
      );
      const step =
        difference >= 100000
          ? 10000
          : difference >= 10000
            ? 1000
            : difference >= 1000
              ? 100
              : difference >= 100
                ? 10
                : 1;

      // 변화 방향 결정 (증가 or 감소)
      const direction =
        receivableToken > previousReceivableToken.current ? 1 : -1;

      const interval = setInterval(() => {
        setDisplayedReceivableToken((prev) => {
          const newToken = prev + step * direction;

          // 목표 값에 도달하면 interval 정지
          if (
            (direction > 0 && newToken >= receivableToken) ||
            (direction < 0 && newToken <= receivableToken)
          ) {
            clearInterval(interval);

            return receivableToken;
          }

          return newToken;
        });
      }, 20);

      setTimeout(() => setButtonHighlight(false), 500);

      if (receivableToken > previousReceivableToken.current) {
        const amountGained = receivableToken - previousReceivableToken.current;

        setAnimationAmount(amountGained);
        setShowAnimation(true);

        setTimeout(() => setShowAnimation(false), 1000);
      }

      previousReceivableToken.current = receivableToken;
    }
  }, [receivableTokenData]);

  if (equippedError || !equippedEquipment) {
    return (
      <PageContainer
        activePaddingX={false}
        bgColor="bg-black"
        titleContent={
          <div className="w-full px-3">
            <MiniTokenBalanceChip />
          </div>
        }
      >
        {/* 장비가 없을 때 화면 구성 */}
        <div className="flex h-full flex-col items-center justify-center px-6 text-center text-white">
          {/* 배경 이미지 */}
          <Image
            className="mb-8 opacity-50"
            src={
              'https://solsolhighasset.s3.ap-northeast-2.amazonaws.com/images/foods/dogfood.png'
            }
            width={200}
          />
          {/* 안내 메시지 */}
          <h1 className="mb-4 text-3xl font-bold">NFT를 장착해볼까요?</h1>
          <p className="mb-8">
            게임을 진행하려면 NFT 음식을 장착해야 해요.
            <br />내 가방에서 음식을 확인하고 장착해보세요!
          </p>
          {/* 가방으로 이동하는 버튼 */}
          <Button
            className="h-12 w-48 font-semibold"
            color="primary"
            style={{ boxShadow: '0px 10px 15px rgba(192, 124, 255, 0.3)' }}
            onClick={handleMoveToInventory}
          >
            내 가방 보러가기
          </Button>
        </div>
      </PageContainer>
    );
  }

  return (
    <>
      <TopBar
        bgColor="bg-default-800"
        left={<BackButton />}
        right={<NotificationButton color="white" />}
      />
      <PageContainer
        activePaddingX={false}
        bgColor="bg-default-800"
        titleContent={
          <div className="flex px-4">
            <MiniTokenBalanceChip />
          </div>
        }
      >
        <div className="relative mt-12 h-2/5">
          <div className="flex items-center justify-center">
            <Image className="spoon-animation ml-12" src={Spoon} width={100} />

            <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2">
              <Image
                className=""
                src={equippedEquipment?.equipment.imageUrl}
                width={120}
              />
            </div>

            {/* +N 애니메이션 */}
            {showAnimation && (
              <div className="floating-number flex items-center justify-center gap-2 text-lg font-semibold text-default-200">
                <div className="GGUL-ICON flex h-5 w-5 items-center justify-center rounded-full bg-default-400 text-sm font-bold text-black">
                  ㄲ
                </div>
                + {animationAmount}
              </div>
            )}
          </div>
        </div>
        <div className="relative flex h-3/5 flex-col items-center justify-center bg-black">
          <div className="CREATED_AT absolute right-4 top-5 flex flex-col items-end gap-1">
            <p className="text-sm font-semibold text-default-500">
              마지막 수령 시점
            </p>
            <p className="text-sm text-default-400">
              {formatToRelativeTime(receivableTokenData?.lastReceiveAt)}
            </p>
          </div>
          <div className="absolute -top-10 left-1/2 flex -translate-x-1/2 flex-col items-center justify-center gap-2 text-center">
            <Button
              className={`USER-AVATAR flex h-24 w-24 items-center justify-center overflow-hidden rounded-full font-bold text-white transition-colors duration-300 ${
                buttonHighlight ? 'bg-yellow-400' : 'bg-primary-600'
              }`}
              onClick={handleReceiveToken}
            >
              {isReceiving ? (
                <Spinner color="white" />
              ) : (
                `+${displayedReceivableToken}`
              )}
            </Button>
          </div>
          <div className="mt-8 flex w-full flex-col gap-12 px-8">
            <EquipmentNftInfoRow equipmentNft={equippedEquipment} />
            <Button
              className="h-12 self-end font-semibold"
              color="primary"
              style={{
                boxShadow: '0px 15px 20px rgba(192, 124, 255, 255, 0.3)',
              }}
              onClick={handleMoveToInventory}
            >
              내 음식 가방 보러가기
            </Button>
          </div>
        </div>
      </PageContainer>
    </>
  );
};
