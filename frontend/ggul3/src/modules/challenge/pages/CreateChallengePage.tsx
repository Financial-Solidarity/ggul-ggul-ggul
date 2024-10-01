import { Button } from '@nextui-org/button';
import { Progress } from '@nextui-org/react';
import { ArrowLongLeftIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { ErrorDTO } from '@types';

import { useCreateChallenge } from '../reactQueries/useChallengeQuery';

import { useCreateChallengeStore, LAST_STEP } from '@/modules/challenge/store';
import {
  CompetitionTypeStep,
  DetailStep,
  BlindnessStep,
  LimitParticipantStep,
  PasswordStep,
} from '@/modules/challenge/components/createChallenge';
import { useSetBottomBar } from '@/modules/common/hooks/useSetBottomBar';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';

const STEPS: Record<number, JSX.Element> = {
  1: <CompetitionTypeStep />,
  2: <LimitParticipantStep />,
  3: <BlindnessStep />,
  4: <PasswordStep />,
  5: <DetailStep />,
};

export const CretaeChallengePage = () => {
  const {
    step,
    toNextStep,
    toPrevStep,
    title,
    competitionType,
    limitParticipant,
    isBlindness,
    password,
    startDate,
    endDate,
    startTime,
    endTime,
    budgetCap,
  } = useCreateChallengeStore();
  const { mutateAsync: createChallenge, isPending } = useCreateChallenge();
  const navigate = useNavigate();

  useSetBottomBar({ active: false });

  const isInvalid =
    title === '' ||
    startDate === null ||
    endDate === null ||
    startTime === null ||
    endTime === null ||
    budgetCap <= 0;

  const handleCreateChallenge = () => {
    if (
      startDate === null ||
      endDate === null ||
      startTime === null ||
      endTime === null
    )
      return;
    createChallenge({
      title,
      competitionType,
      limitParticipant,
      isBlindness,
      password,
      startAt: dayjs()
        .year(startDate.year)
        .month(startDate.month - 1)
        .date(startDate.day)
        .hour(startTime.hour)
        .minute(startTime.minute)
        .format('YYYY-MM-DD HH:mm:00'),
      endAt: dayjs()
        .year(endDate.year)
        .month(endDate.month - 1)
        .date(endDate.day)
        .hour(endTime.hour)
        .minute(endTime.minute)
        .format('YYYY-MM-DD HH:mm:00'),
      budgetCap,
    })
      .then((res) => {
        navigate(`/challenge/waiting-room/${res.challengeId}`);
      })
      .catch((err: ErrorDTO) => {});
  };

  return (
    <>
      <TopBar />
      <PageContainer>
        <div className="flex h-full w-full flex-col">
          <Progress value={(step / LAST_STEP) * 100} />
          <div className="flex w-full flex-1 flex-col items-center justify-center py-4">
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
              <Button
                className="w-full"
                color="primary"
                isDisabled={isInvalid}
                isLoading={isPending}
                onClick={handleCreateChallenge}
              >
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
