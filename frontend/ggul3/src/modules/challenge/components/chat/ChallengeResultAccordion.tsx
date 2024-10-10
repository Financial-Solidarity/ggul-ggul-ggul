import React from 'react';
import { ChevronRightIcon, UserIcon } from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';
import { FaCrown, FaGift } from 'react-icons/fa';
import { Button, Image } from '@nextui-org/react';

import { ParticipantData, ProfileType } from '../../@types/challengeResult';
import {
  useGetChallengeResult,
  useGetChallengeDetail,
} from '../../reactQueries/useChallengeQuery';

interface ChallengeResultAccordionProps {
  challengeId: string;
  openDetail: () => void;
}

export const ChallengeResultAccordion = ({
  challengeId,
  openDetail,
}: ChallengeResultAccordionProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const useMockData = true;

  let challengeDetail: {
    title: string;
    competitionType: string;
  };
  let participants: ParticipantData[] = [];

  //   if (useMockData) {
  //     const teamChallengeDetail = {
  //       title: '모킹 팀전 챌린지',
  //       competitionType: 'T',
  //     };

  //     const teamParticipants: ParticipantData[] = [
  //       {
  //         profile: {
  //           participantId: 'uuid-4',
  //           nickname: '레드팀원 1',
  //           profileImg: 'https://via.placeholder.com/40x40',
  //           type: ProfileType.RED,
  //           isMine: false,
  //         },
  //         isSuccess: 'false',
  //         isLose: 'true',
  //         ggulNum: 120,
  //       },
  //       {
  //         profile: {
  //           participantId: 'uuid-5',
  //           nickname: '레드팀원 2',
  //           profileImg: 'https://via.placeholder.com/40x40',
  //           type: ProfileType.RED,
  //           isMine: false,
  //         },
  //         isSuccess: 'false',
  //         isLose: 'false',
  //         ggulNum: 80,
  //       },
  //       {
  //         profile: {
  //           participantId: 'uuid-6',
  //           nickname: '블루팀원 1',
  //           profileImg: 'https://via.placeholder.com/40x40',
  //           type: ProfileType.BLUE,
  //           isMine: true,
  //         },
  //         isSuccess: 'true',
  //         isLose: 'true',
  //         ggulNum: 150,
  //       },
  //       {
  //         profile: {
  //           participantId: 'uuid-7',
  //           nickname: '블루팀원 2',
  //           profileImg: 'https://via.placeholder.com/40x40',
  //           type: ProfileType.BLUE,
  //           isMine: false,
  //         },
  //         isSuccess: 'true',
  //         isLose: 'false',
  //         ggulNum: 100,
  //       },
  //     ];

  //     const individualChallengeDetail = {
  //       title: '모킹 개인전 챌린지',
  //       competitionType: 'S',
  //     };

  //     const individualParticipants: ParticipantData[] = [
  //       {
  //         profile: {
  //           participantId: 'uuid-1',
  //           nickname: '참가자 1',
  //           profileImg: 'https://via.placeholder.com/40x40',
  //           type: ProfileType.PERSONAL,
  //           isMine: false,
  //         },
  //         isSuccess: 'true',
  //         isLose: null,
  //         ggulNum: 150,
  //       },
  //       {
  //         profile: {
  //           participantId: 'uuid-2',
  //           nickname: '참가자 2',
  //           profileImg: 'https://via.placeholder.com/40x40',
  //           type: ProfileType.PERSONAL,
  //           isMine: true,
  //         },
  //         isSuccess: 'false',
  //         isLose: null,
  //         ggulNum: 80,
  //       },
  //       {
  //         profile: {
  //           participantId: 'uuid-3',
  //           nickname: '참가자 3',
  //           profileImg: 'https://via.placeholder.com/40x40',
  //           type: ProfileType.PERSONAL,
  //           isMine: false,
  //         },
  //         isSuccess: 'true',
  //         isLose: null,
  //         ggulNum: 120,
  //       },
  //     ];

  //     challengeDetail = teamChallengeDetail;
  //     participants = teamParticipants;

  //     // challengeDetail = individualChallengeDetail;
  //     // participants = individualParticipants;
  //   } else {
  // 실제 데이터 가져오기
  const { data: fetchedChallengeDetail, isLoading: isChallengeDetailLoading } =
    useGetChallengeDetail(challengeId);
  const { data: fetchedParticipants, isLoading: isParticipantsLoading } =
    useGetChallengeResult(challengeId);

  if (isChallengeDetailLoading || isParticipantsLoading) {
    return <div>로딩 중...</div>;
  }

  if (!fetchedChallengeDetail || !fetchedParticipants) {
    return <div>데이터를 가져올 수 없습니다.</div>;
  }

  challengeDetail = {
    title: fetchedChallengeDetail.title,
    competitionType: fetchedChallengeDetail.competitionType,
  };

  participants = fetchedParticipants;
  //   }

  const toggleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const isTeamChallenge = challengeDetail.competitionType === 'T';

  // 참가자 데이터를 그룹화 (팀전의 경우 팀별로 그룹화)
  let groupedParticipants: { [key in ProfileType]?: ParticipantData[] } = {};

  if (participants) {
    if (isTeamChallenge) {
      groupedParticipants = participants.reduce(
        (acc, participant) => {
          const team = participant.profile.type;

          if (team === ProfileType.RED || team === ProfileType.BLUE) {
            if (!acc[team]) acc[team] = [];
            acc[team]!.push(participant);
          }

          return acc;
        },
        {} as { [key in ProfileType]?: ParticipantData[] },
      );
    } else {
      groupedParticipants[ProfileType.PERSONAL] = participants;
    }
  }

  // 참가자 카드 컴포넌트 (공통)
  const ParticipantCard = ({
    participant,
  }: {
    participant: ParticipantData;
  }) => (
    <div
      key={participant.profile.participantId}
      className="relative flex w-max flex-col items-center rounded-lg p-2"
    >
      {/* 성공 여부에 따른 아이콘 표시 */}
      {!participant.isLose && !isTeamChallenge && (
        <div>
          <FaCrown className="absolute -top-1 left-1/2 z-20 -translate-x-1/2 transform text-2xl text-yellow-500" />
          <div className="absolute right-1 top-10 z-20 flex h-7 w-7 flex-col items-center justify-center rounded-full bg-yellow-500 text-sm font-semibold text-white">
            <p>성공</p>
          </div>
        </div>
      )}
      {/* {participant.isSuccess && !isTeamChallenge && (
        <FaCrown className="absolute -top-1 left-1/2 z-20 -translate-x-1/2 transform text-2xl text-yellow-500" />
      )} */}
      <div className="mb-2 h-10 w-10 overflow-hidden rounded-full">
        {participant.profile.profileImg ? (
          <Image
            alt="profileImg"
            className="h-full w-full object-cover"
            src={participant.profile.profileImg}
          />
        ) : (
          <div className="h-full w-full bg-primary p-2 text-white">
            <UserIcon />
          </div>
        )}
      </div>
      {/* <Image
        alt="Profile"
        className="mb-2 h-14 w-14 rounded-full"
        src={participant.profile.profileImg}
      /> */}
      <div className="flex flex-col items-center">
        <span className="text-sm font-semibold">
          {participant.profile.nickname}
          {participant.profile.isMine && (
            <div className="absolute left-1 top-10 z-20 flex h-7 w-7 flex-col items-center justify-center rounded-full bg-primary-300 text-sm font-semibold text-white">
              <p>나</p>
            </div>
          )}
        </span>
        <div className="mt-1 flex items-center justify-center rounded-full bg-primary px-2 py-1 text-sm">
          <FaGift className="mr-1 text-white" />
          <span className="text-white">{participant.ggulNum} 껄</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed z-10 flex w-full flex-col border-b bg-gray-100 px-4">
      <div
        className="flex cursor-pointer items-center justify-between py-2"
        onClick={toggleIsOpen}
      >
        <h4 className="text-sm font-bold text-default-600">
          {'챌린지 결과 보기'}
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
        <div className="flex flex-col px-1 py-4">
          {Object.entries(groupedParticipants).map(
            ([groupType, groupMembers]) => (
              <div key={groupType} className="mb-6">
                {isTeamChallenge ? (
                  <h6
                    className={`mb-2 text-lg font-semibold ${
                      groupType === ProfileType.RED
                        ? 'text-red-500'
                        : 'text-blue-500'
                    }`}
                  >
                    {groupType === ProfileType.RED ? '팀 레드' : '팀 블루'}
                    <span className="text-black">
                      {groupMembers[0].isLose ? '실패' : '성공'}
                    </span>
                  </h6>
                ) : (
                  <></>
                )}
                <div
                  className={`rounded-2xl p-4 ${
                    isTeamChallenge
                      ? groupType === ProfileType.RED
                        ? 'bg-red-100'
                        : 'bg-blue-100'
                      : 'bg-gray-200'
                  }`}
                >
                  <div className="flex gap-4 overflow-x-auto">
                    {groupMembers.map((participant) => (
                      <ParticipantCard
                        key={participant.profile.participantId}
                        participant={participant}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ),
          )}
          <Button color="primary" onClick={openDetail}>
            기록 상세 보기
          </Button>
        </div>
      </div>
    </div>
  );
};
