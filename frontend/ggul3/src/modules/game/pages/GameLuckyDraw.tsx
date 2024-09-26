import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import {
  useGameLuckyDrawState,
  useLuckyDrawActions,
} from '../hooks/luckyDraw.ts';
import { ContentSection } from '../components/GameLuckyDraw/ContentSection.tsx';
import { ActionButtons } from '../components/GameLuckyDraw/ActionButtons.tsx';
import { MiniTokenBalanceChip } from '../components/common/MiniTokenBalanceChip.tsx';

import { useLuckyDrawStore } from '@/modules/game/store/useLuckyDrawStore.ts';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { NotificationButton } from '@/modules/common/components/NotificationButton/NotificationButton';
import { useSetBottomBar } from '@/modules/common/hooks/useSetBottomBar.ts';

export const GameLuckyDraw = (): JSX.Element => {
  useSetBottomBar({ active: false });
  const navigate = useNavigate();

  const { food, setFood, setNft, reset } = useGameLuckyDrawState();
  const { step, startDrawing, stopDrawing, startMinting, stopMinting } =
    useLuckyDrawStore();
  const { onClickLuckyDrawButton, onClickMintButton } = useLuckyDrawActions({
    setFood,
    setNft,
    startDrawing,
    stopDrawing,
    startMinting,
    stopMinting,
  });

  const { initStep } = useLuckyDrawStore();

  useEffect(() => {
    return () => {
      reset();
      initStep();
    };
  }, []);

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
          <div className="flex w-full flex-row justify-between">
            <p className="text-2xl font-semibold text-white">껄 음식 뽑기</p>
            {<MiniTokenBalanceChip />}
          </div>
        }
      >
        <ContentSection food={food} navigate={navigate} step={step} />
        <ActionButtons
          food={food}
          step={step}
          onClickLuckyDrawButton={onClickLuckyDrawButton}
          onClickMintButton={onClickMintButton}
        />
      </PageContainer>
    </>
  );
};
