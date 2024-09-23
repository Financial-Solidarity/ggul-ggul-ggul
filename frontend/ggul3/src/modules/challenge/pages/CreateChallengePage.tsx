import { Button } from '@nextui-org/button';
import { Progress } from '@nextui-org/react';
import { ArrowLongLeftIcon } from '@heroicons/react/24/outline';

import { useCreateChallengeStore, LAST_STEP } from '@/modules/challenge/store';
import {
  CompetitionTypeStep,
  DetailStep,
  NicknameOptionStep,
  PlayerNumberStep,
  RoomTypeStep,
} from '@/modules/challenge/components/createChallenge';
import { useSetBottomBar } from '@/modules/common/hooks/useSetBottomBar';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';

const STEPS: Record<number, JSX.Element> = {
  1: <CompetitionTypeStep />,
  2: <PlayerNumberStep />,
  3: <NicknameOptionStep />,
  4: <RoomTypeStep />,
  5: <DetailStep />,
};

export const CretaeChallengePage = () => {
  const { step, toNextStep, toPrevStep } = useCreateChallengeStore();

  useSetBottomBar({ active: false });

  return (
    <>
      <TopBar />
      <PageContainer>
        <div className="flex h-full w-full flex-col">
          <Progress value={(step / LAST_STEP) * 100} />
          <div className="flex flex-1 flex-col items-center justify-center">
            {STEPS[step]}
          </div>
          <div className="mt-auto flex flex-col pb-2">
            {step !== 1 && (
              <button
                className="flex items-center justify-center gap-1 self-start p-4 font-semibold text-default-400"
                onClick={toPrevStep}
              >
                <ArrowLongLeftIcon className="w-4" />
                <span className="">이전</span>
              </button>
            )}
            {step === LAST_STEP ? (
              <Button className="w-full" color="primary">
                챌린지 만들기
              </Button>
            ) : (
              <Button
                className="w-full"
                color="primary"
                isDisabled={step === LAST_STEP}
                onClick={toNextStep}
              >
                다음
              </Button>
            )}
          </div>
        </div>
      </PageContainer>
    </>
  );
};
