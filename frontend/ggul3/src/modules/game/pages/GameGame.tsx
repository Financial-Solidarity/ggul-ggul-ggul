import { Image } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { Button } from '@nextui-org/button';

import { MiniTokenBalanceChip } from '../components/common/MiniTokenBalanceChip';
import {
  useReceivableTokenAmountQuery,
  useReceiveTokenMutation,
  useTokenBalanceQuery,
  useEquippedEquipmentQuery, // 장착된 장비 조회 쿼리 훅 추가
} from '../queries';
import { EquipmentNftInfoRow } from '../components/common/EquipmentNftInfoRow';

import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { NotificationButton } from '@/modules/common/components/NotificationButton/NotificationButton';
import { useSetBottomBar } from '@/modules/common/hooks/useSetBottomBar';
import './GameGame.css'; // 스타일 파일 가져오기
import Spoon from '@/assets/images/game_spoon.png';

export const GameGame = () => {
  useSetBottomBar({ active: true, isDarkMode: true });

  // +N 애니메이션 상태
  const [animationAmount, setAnimationAmount] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);

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
    receiveTokenMutation.mutate(undefined, {
      onSuccess: () => {
        // 토큰 수령 후 갱신
        refetchReceivableToken();
        refetchTokenBalance();
        // 애니메이션 효과 트리거
        if (equippedEquipment) {
          setAnimationAmount(equippedEquipment.equipment.power);
          setShowAnimation(true);

          // 일정 시간 후 애니메이션 숨김 처리
          setTimeout(() => setShowAnimation(false), 1000);
        }
        alert('껄이 성공적으로 수령되었습니다!');
      },
      onError: (error) => {
        console.error(error);
        alert('껄 수령에 실패하였습니다.');
      },
    });
  };

  // 애니메이션 상태 변경 시 애니메이션 종료 후 상태 초기화
  useEffect(() => {
    if (showAnimation) {
      const timer = setTimeout(() => setShowAnimation(false), 1000);

      return () => clearTimeout(timer);
    }
  }, [showAnimation]);

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
        <div className="h-2/5">
          <div className="relative flex items-center justify-center">
            {/* <div className="sprite-container" /> */}
            <Image className="spoon-animation ml-12" src={Spoon} width={100} />

            <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2">
              <Image
                className=""
                src={equippedEquipment?.equipment.imageUrl}
                width={120}
              />
            </div>
          </div>
        </div>
        <div className="relative flex h-3/5 flex-col items-center justify-center bg-black">
          {/* 애니메이션 효과 */}
          {showAnimation && (
            <div className="animation-number">
              +{animationAmount} (맛도리력: {equippedEquipment?.equipment.power}
              )
            </div>
          )}
          {/*  */}
          <div className="absolute -top-10 left-1/2 flex -translate-x-1/2 flex-col items-center justify-center gap-2 text-center">
            <Button
              className="USER-AVATAR flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-primary-600 font-bold text-white"
              onClick={handleReceiveToken}
            >
              +{receivableTokenData?.receivableToken ?? 0}
            </Button>
          </div>
          {/*  */}

          <div className="mb-6 ml-12 self-start rounded-lg bg-zinc-600 px-2 py-1 text-center text-sm text-white">
            현재 장착중인 NFT
          </div>

          <EquipmentNftInfoRow equipmentNft={equippedEquipment} />
        </div>
      </PageContainer>

      {/* 스프라이트 애니메이션을 위한 컨테이너 */}
    </>
  );
};
