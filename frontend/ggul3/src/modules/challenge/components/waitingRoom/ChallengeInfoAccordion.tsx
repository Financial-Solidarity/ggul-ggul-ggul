import { Button } from '@nextui-org/react';
import { ChevronRightIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';
import react from 'react';

import { useGetChallenge } from '../../reactQueries/useChallengeQuery';

import { useCountdown } from '@/modules/common/hooks/useCountDown';
import { formatCountdown, toYYMDhm_ko } from '@/modules/common/utils/dateUtils';

interface ChallengeInfoAccordionProps {
  challengeId: string;
}
export const ChallengeInfoAccordion = ({
  challengeId,
}: ChallengeInfoAccordionProps) => {
  const [isOpen, setIsOpen] = react.useState(false);
  const {
    data: {
      title,
      isEncrypted,
      competitionType,
      isBlindness,
      currentParticipant,
      limitParticipant,
      budgetCap,
      startDatetime,
      endDatetime,
    },
  } = useGetChallenge(challengeId);
  const countdown = useCountdown(startDatetime);
  const toggleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col border-b">
      <div
        className="flex cursor-pointer items-center justify-between px-4 py-4"
        onClick={toggleIsOpen}
      >
        <h4 className="font-bold text-default-600">{title}</h4>
        <div className={twMerge([isOpen && 'rotate-90'])}>
          <ChevronRightIcon className="w-6 text-default-400" />
        </div>
      </div>
      <div
        className={twMerge([
          'max-h-[1000px] overflow-hidden',
          !isOpen && 'max-h-0',
        ])}
      >
        <div
          className={twMerge([
            'flex-flex-col h-full w-full overflow-hidden p-4 transition-height',
          ])}
        >
          <p
            className={twMerge([
              'mb-4 flex justify-center gap-1 font-semibold text-default-500',
              countdown.days === 0 &&
                countdown.hours === 0 &&
                countdown.minutes < 10 &&
                'text-danger',
            ])}
          >
            <span>시작까지</span>
            <span>{formatCountdown(countdown)}</span>
            <span>남음</span>
          </p>
          <div>
            <div className="flex flex-col gap-2">
              <h4 className="text-xl font-bold">{title}</h4>
              <div>
                <div className="flex items-center">
                  <span>{toYYMDhm_ko(startDatetime)}</span>
                  <span>부터</span>
                </div>
                <div className="flex items-center">
                  <span>{toYYMDhm_ko(endDatetime)}</span>
                  <span>까지</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <UserGroupIcon className="w-4" />
                <span>{currentParticipant}</span>
                <span>/</span>
                <span>{limitParticipant}</span>
              </div>
              <div className="itmes-center flex gap-1">
                <span>{competitionType === 'S' ? '개인전' : '팀전'}</span>
                <span>/</span>
                <span>{isBlindness ? '익명' : '기명'}</span>
                {isEncrypted && (
                  <>
                    <span>/</span>
                    <span>비밀방</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="py-4">
            <hr className="border-dashed border-default-300" />
          </div>
          <div className="mb-2 flex flex-col gap-4">
            <p className="text-2xl font-black">
              <span>{budgetCap}</span>
              <span>원</span>
            </p>
            {
              // TODO: 방장이면 시작하기 버튼 보이기
              false && (
                <Button className="w-full" color="primary">
                  시작하기
                </Button>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};
