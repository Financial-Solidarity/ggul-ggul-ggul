import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';

import {
  useGetChallengeResult,
  useGetChallengeDetail,
} from '../../reactQueries/useChallengeQuery';
import { ParticipantData, ProfileType } from '../../@types/challengeResult';

interface ChallengeResultAccordionProps {
  challengeId: string;
}

export const ChallengeResultAccordion = ({
  challengeId,
}: ChallengeResultAccordionProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  // 챌린지 상세 정보 가져오기 (예: 제목, competitionType)
  const { data: challengeDetail } = useGetChallengeDetail(challengeId);

  // 참가자 결과 정보 가져오기
  const { data: participants } = useGetChallengeResult(challengeId);

  const toggleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  // 챌린지 타입이 팀전인지 확인
  const isTeamChallenge = challengeDetail.competitionType === 'T'; // 'T'는 팀전을 의미

  // 팀전인 경우 참가자를 팀별로 그룹화
  let groupedParticipants: { [key in ProfileType]?: ParticipantData[] } = {};

  if (isTeamChallenge && participants) {
    groupedParticipants = participants.reduce(
      (acc, participant) => {
        const team = participant.profile.type;

        if (team === ProfileType.RED || team === ProfileType.BLUE) {
          if (!acc[team]) {
            acc[team] = [];
          }
          acc[team]!.push(participant);
        }

        return acc;
      },
      {} as { [key in ProfileType]?: ParticipantData[] },
    );
  }

  return (
    <div className="fixed z-10 flex w-full flex-col border-b bg-white">
      <div
        className="flex cursor-pointer items-center justify-between px-4 py-2"
        onClick={toggleIsOpen}
      >
        <h4 className="text-sm font-bold text-default-600">
          {challengeDetail.title}
        </h4>
        <div className={twMerge([isOpen && 'rotate-90'])}>
          <ChevronRightIcon className="w-5 text-default-400" />
        </div>
      </div>
      <div
        className={twMerge([
          'overflow-hidden transition-all duration-300',
          isOpen ? 'max-h-[1000px]' : 'max-h-0',
        ])}
      >
        <div className="flex flex-col p-4">
          <h5 className="mb-4 text-lg font-bold">챌린지 결과</h5>
          {isTeamChallenge ? (
            // 팀전 결과
            <>
              {Object.entries(groupedParticipants).map(
                ([teamType, teamMembers]) => (
                  <div key={teamType}>
                    <h6 className="text-md mb-2 font-semibold">
                      {teamType === ProfileType.RED ? '레드팀' : '블루팀'}{' '}
                      {teamMembers[0].isSuccess === 'true' ? '승리' : '패배'}
                    </h6>
                    <div className="mb-4 flex flex-col gap-4">
                      {teamMembers.map((participant) => (
                        <div
                          key={participant.profile.participantId}
                          className="flex items-center gap-4 rounded border p-2"
                        >
                          <img
                            alt="Profile"
                            className="h-10 w-10 rounded-full"
                            src={participant.profile.profileImg}
                          />
                          <div className="flex flex-col">
                            <span className="font-semibold">
                              {participant.profile.nickname}
                              {participant.profile.isMine && ' (나)'}
                            </span>
                            {participant.isLose === 'true' && (
                              <span className="text-sm text-yellow-500">
                                팀 내 1등
                              </span>
                            )}
                          </div>
                          <div className="ml-auto flex flex-col text-right">
                            <span className="text-sm">
                              획득 꿀: {participant.ggulNum}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ),
              )}
            </>
          ) : (
            // 개인전 결과
            <div className="flex flex-col gap-4">
              {participants?.map((participant) => (
                <div
                  key={participant.profile.participantId}
                  className="flex items-center gap-4 rounded border p-2"
                >
                  <img
                    alt="Profile"
                    className="h-10 w-10 rounded-full"
                    src={participant.profile.profileImg}
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold">
                      {participant.profile.nickname}
                      {participant.profile.isMine && ' (나)'}
                    </span>
                  </div>
                  <div className="ml-auto flex flex-col text-right">
                    <span
                      className={`text-sm ${
                        participant.isSuccess === 'true'
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}
                    >
                      {participant.isSuccess === 'true' ? '성공' : '실패'}
                    </span>
                    <span className="text-sm">
                      획득 꿀: {participant.ggulNum}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
