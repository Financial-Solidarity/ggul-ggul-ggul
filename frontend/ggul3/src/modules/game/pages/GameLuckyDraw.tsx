import { Button, Image } from '@nextui-org/react';
import { useState } from 'react';

import { RandomNumber } from '../components/GameLuckyDraw/RandomNumber/RandomNumber.tsx';
import { CookingLottie } from '../components/GameLuckyDraw/CookingLottie/CookingLottie.tsx';
import { ConfettieLottie } from '../components/GameLuckyDraw/ConfettieLottie/ConfettieLottie.tsx';
import { useLuckyDrawStore } from '../store/useLuckyDrawStore.ts';

import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { NotificationButton } from '@/modules/common/components/NotificationButton/NotificationButton';
import { useSetBottomBar } from '@/modules/common/hooks/useSetBottomBar.ts';

const FOOD_TYPES = ['오믈렛', '만화고기'];
const GRADE_TYPES = ['완전커먼', '커먼', '레전드', '유니크', '미들'];

interface FoodDTO {
  name: string; // ㅇㅇ한 음식명
  typeIndex: number; // 음식타입인덱스 0~50?
  gradeIndex: number; // 레전더리~~
  status: number; // 맛도리력
  hexCode: string; // 고유 배경색
}

const FOOD_IMAGE_BASE_URL = '/src/assets/images/food/food_';

const mockPostFoodLuckyDraw = async () => {
  return new Promise<FoodDTO>((resolve) => {
    setTimeout(() => {
      const status = Math.floor(Math.random() * 101); // 0~100 사이의 랜덤 숫자
      const name = '비범한 오믈렛';
      const hexCode = '#C9A4FF';
      const gradeIndex = Math.floor(Math.random() * 6);
      const typeIndex = Math.floor(Math.random() * 2);

      resolve({ status, name, hexCode, gradeIndex, typeIndex });
    }, 1000);
  });
};

export const GameLuckyDraw = () => {
  useSetBottomBar({ active: false });

  const [food, setFood] = useState<FoodDTO | null>(null);
  const { step, startDrawing, stopDrawing } = useLuckyDrawStore(); // zustand 상태 가져오기

  const onClickLuckyDrawButton = async () => {
    startDrawing(); // 상태 'drawing'으로 변경

    const response = await mockPostFoodLuckyDraw();

    // 숫자 스크롤 동작
    setTimeout(() => {
      setFood(response);
      stopDrawing(response.status); // 상태 'drawed'와 status 값 변경
    }, 500); // 숫자 스크롤 2초 후 멈추기
  };

  return (
    <>
      <TopBar
        bgColor="bg-black"
        left={<BackButton />}
        right={<NotificationButton />}
      />
      <PageContainer
        bgColor="bg-black"
        titleContent={
          <p className="text-2xl font-semibold text-white">껄 음식 뽑기</p>
        }
      >
        <div className="CONTENT-SECTION flex h-2/5 w-full flex-col items-center justify-center">
          {step === 'drawing' && <CookingLottie />}

          {/* 뽑아진 상태 */}
          {step === 'drawed' && (
            <div className="FOOD-IMAGE-BOX relative h-full w-full">
              <div className="flex h-full w-full items-center justify-center">
                <div
                  className="CIRCULAR-BACKGROUND"
                  style={{
                    backgroundColor: food?.hexCode,
                  }}
                />
                <div
                  className="h-32 w-32 animate-popIn rounded-full"
                  style={{
                    backgroundColor: food?.hexCode,
                  }}
                />
                <ConfettieLottie />
                <div className="IMAGE-WRAPPER absolute left-1/2 -translate-x-1/2 animate-fadeIn">
                  <div className="animate-floating">
                    <Image
                      src={FOOD_IMAGE_BASE_URL + food?.typeIndex + '.png'}
                      width={130}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex w-full items-center justify-center">
          <RandomNumber />
          <div className="absolute bottom-8 h-12 w-5/6">
            {step === 'init' && (
              <Button
                className="w-full"
                color="primary"
                style={{ boxShadow: '0px 10px 20px rgba(192, 124, 255, 0.3)' }}
                onClick={() => onClickLuckyDrawButton()}
              >
                음식 뽑기
              </Button>
            )}
          </div>
        </div>
      </PageContainer>
    </>
  );
};
