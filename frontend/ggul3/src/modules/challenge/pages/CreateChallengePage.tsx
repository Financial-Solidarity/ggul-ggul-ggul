import { Button } from '@nextui-org/button';
import { Progress } from '@nextui-org/react';
import { ArrowLongLeftIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { ErrorDTO } from '@types';
import toast from 'react-hot-toast';

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
    resetState,
  } = useCreateChallengeStore();
  const { mutateAsync: createChallenge, isPending } = useCreateChallenge();
  const navigate = useNavigate();

  useSetBottomBar({ active: false });

  const isCompetitionTypeValid =
    competitionType === 'S' || competitionType === 'T';

  let isLimitParticipantValid = limitParticipant >= 2 && limitParticipant <= 30;

  if (competitionType === 'T') {
    isLimitParticipantValid =
      isLimitParticipantValid && limitParticipant % 2 === 0;
  }

  const isPasswordValid = password === null || password.length > 0;

  const startAt =
    startDate && startTime
      ? dayjs()
          .year(startDate.year)
          .month(startDate.month - 1)
          .date(startDate.day)
          .hour(startTime.hour)
          .minute(startTime.minute)
      : null;

  const endAt =
    endDate && endTime
      ? dayjs()
          .year(endDate.year)
          .month(endDate.month - 1)
          .date(endDate.day)
          .hour(endTime.hour)
          .minute(endTime.minute)
      : null;

  const now = dayjs();

  const isStartTimeValid = startAt ? startAt.isAfter(now) : false;
  const isEndTimeValid = startAt && endAt ? endAt.isAfter(startAt) : false;
  const isBudgetValid = budgetCap > 0;
  const isTitleValid = title.trim().length > 0;

  const isDetailValid =
    isStartTimeValid && isEndTimeValid && isBudgetValid && isTitleValid;

  const isInvalid = !isDetailValid;

  let isStepValid = true;

  switch (step) {
    case 1:
      isStepValid = isCompetitionTypeValid;
      break;
    case 2:
      isStepValid = isLimitParticipantValid;
      break;
    case 3:
      isStepValid = true;
      break;
    case 4:
      isStepValid = isPasswordValid;
      break;
    case 5:
      isStepValid = isDetailValid;
      break;
    default:
      isStepValid = true;
  }

  const handleCreateChallenge = () => {
    if (!startAt || !endAt) return;

    createChallenge({
      title,
      competitionType,
      limitParticipant,
      isBlindness,
      password,
      startAt: startAt.format('YYYY-MM-DD HH:mm:00'),
      endAt: endAt.format('YYYY-MM-DD HH:mm:00'),
      budgetCap,
    })
      .then((res) => {
        navigate(`/challenge/waiting-room/${res.challengeId}`, {
          replace: true,
        });
        resetState();
      })
      .catch((err: ErrorDTO) => {
        toast.error(err.message);
      });
  };

  return (
    <>
      <TopBar />
      <PageContainer>
        <div className="flex h-full w-full flex-col">
          <Progress value={(step / (LAST_STEP + 1)) * 100} />
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
                isDisabled={!isStepValid}
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
