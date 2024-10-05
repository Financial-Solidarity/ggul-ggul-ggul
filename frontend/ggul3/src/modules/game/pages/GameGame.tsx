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
import { NotificationButton } from '@/modules/common/components/NotificationButton/NotificationButton';
import { useSetBottomBar } from '@/modules/common/hooks/useSetBottomBar';
import './GameGame.css';
import Spoon from '@/assets/images/game_spoon.png';
import { formatToRelativeTime } from '@/modules/common/utils/dateUtils';
import { PathNames } from '@/router';

export const GameGame = () => {
  useSetBottomBar({ active: true, isDarkMode: true });

  const navigate = useNavigate();
  const handleMoveToInventory = () => {
    navigate(`${PathNames.GAME.INVENTORY.path}`);
  };

  // +N 애니메이션 상태
  const [animationAmount, setAnimationAmount] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);

  // 버튼의 수령 가능한 토큰 상태
  const [displayedReceivableToken, setDisplayedReceivableToken] = useState(0);
  const [buttonHighlight, setButtonHighlight] = useState(false);
  const previousReceivableToken = useRef(displayedReceivableToken);

  // 스피너 상태
  const [isReceiving, setIsReceiving] = useState(false);

  // 장착된 장비 조회 쿼리 훅 사용
  const { data: equippedEquipment, error: equippedError } =
    useEquippedEquipmentQuery();

  // 껄 수령 가능 토큰 조회
  const { data: receivableTokenData, refetch: refetchReceivableToken } =
    useReceivableTokenAmountQuery();

  // 껄 수령 뮤테이션 훅 사용
  const receiveTokenMutation = useReceiveTokenMutation();

  // 토큰 밸런스 조회 훅
  const { refetch: refetchTokenBalance } = useTokenBalanceQuery();

  // 5초마다 수령 가능한 껄 조회
  useEffect(() => {
    const interval = setInterval(() => {
      refetchReceivableToken();
    }, 5000);

    return () => clearInterval(interval);
  }, [refetchReceivableToken]);

  // 껄 수령 버튼 클릭 핸들러
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
        console.error(error);
        toast.error('껄 수령에 실패하였습니다.');
      },
    });
  };

  // 수령 가능 토큰 변화 시 애니메이션 처리
  useEffect(() => {
    const receivableToken = receivableTokenData?.receivableToken ?? 0;

    // 상태 변경 확인을 위한 디버깅용 로그
    console.log(
      'Current:',
      previousReceivableToken.current,
      'New:',
      receivableToken,
    );

    if (previousReceivableToken.current !== receivableToken) {
      setButtonHighlight(true);

      const step = receivableToken > previousReceivableToken.current ? 10 : -10;

      const interval = setInterval(() => {
        setDisplayedReceivableToken((prev) => {
          const newToken = prev + step;

          if (
            (step > 0 && newToken >= receivableToken) ||
            (step < 0 && newToken <= receivableToken)
          ) {
            clearInterval(interval);

            return receivableToken;
          }

          return newToken;
        });
      }, 20);

      // 일정 시간 후 강조 효과를 종료
      setTimeout(() => setButtonHighlight(false), 500);

      // 수령 가능한 토큰이 증가하는 경우에만 +N 애니메이션을 트리거
      if (receivableToken > previousReceivableToken.current) {
        const amountGained = receivableToken - previousReceivableToken.current;

        setAnimationAmount(amountGained);
        setShowAnimation(true);

        // 일정 시간 후 애니메이션 숨김 처리
        setTimeout(() => setShowAnimation(false), 1000);
      }

      // 이전 수령 가능한 토큰 업데이트
      previousReceivableToken.current = receivableToken;
    }
  }, [receivableTokenData]);

  // 장착된 장비가 없는 경우 처리
  if (equippedError || !equippedEquipment) {
    return (
      <PageContainer
        activePaddingX={false}
        bgColor="bg-black"
        titleContent={<MiniTokenBalanceChip />}
      >
        <div className="flex h-full items-center justify-center text-center text-white">
          장비를 장착하고 게임을 시작해보세요.
        </div>
      </PageContainer>
    );
  }

  return (
    <>
      <TopBar
        bgColor="bg-default-800"
        left={<BackButton />}
        right={<NotificationButton />}
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
              style={{ boxShadow: '0px 15px 20px rgba(192, 124, 255, 0.3)' }}
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
