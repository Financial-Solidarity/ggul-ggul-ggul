import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  ChallengeJoinRequestBody,
  ChallengeJoinResponse,
  ChallengeListResponse,
  ChangeTeamResponse,
  CreateChallengeRequestBody,
  CreateChallengeResponse,
  ErrorDTO,
  GetChallengeDetailResponse,
  getChattingRooomIdsResponse,
  Pageable,
  ParticipantDTO,
} from '@types';

import { createChallenge } from '../apis/createChallenge';
import {
  getChallengeDetail,
  getChattingRooomIds,
  getParticipantList,
} from '../apis/challenge';
import {
  changeTeam,
  exitChallenge,
  getChallengeList,
  joinChallenge,
  startChallenge,
} from '../apis/waitingroom';

import { QUERY_KEYS } from '@/modules/common/constants';

/**
 * 챌린지 상세 조회 query
 */
export const useGetChallengeDetail = (challengeId: string) => {
  return useQuery<GetChallengeDetailResponse, ErrorDTO>({
    queryKey: [QUERY_KEYS.CHALLENGE, challengeId],
    queryFn: () => getChallengeDetail(challengeId),
    enabled: !!challengeId,
    initialData: {} as GetChallengeDetailResponse,
  });
};

/**
 * 챌린지 목록 조회 query
 */
// TODO:  infiniteQuery로 변경하기
export const useGetChallengeList = ({
  title,
  page = 0,
}: {
  title?: string;
  page: number;
}) => {
  return useQuery<ChallengeListResponse, ErrorDTO>({
    queryKey: [QUERY_KEYS.CHALLENGE, page, title],
    queryFn: () => getChallengeList({ title, page }),
    initialData: {
      content: [],
      pageable: {} as Pageable,
    },
  });
};

/**
 * 챌린지 생성하기 mutation
 */
export const useCreateChallenge = () => {
  return useMutation<
    CreateChallengeResponse,
    ErrorDTO,
    CreateChallengeRequestBody
  >({
    mutationFn: (data) => createChallenge(data),
  });
};

/**
 * 챌린지 참가자 목록 조회 query
 */
export const useGetParticipantList = (challengeId: string) => {
  return useQuery<ParticipantDTO[], ErrorDTO>({
    queryKey: [QUERY_KEYS.PARTICIPANT, challengeId],
    queryFn: () => getParticipantList(challengeId),
    enabled: !!challengeId,
    initialData: [],
  });
};

export const useJoinChallenge = () => {
  return useMutation<ChallengeJoinResponse, ErrorDTO, ChallengeJoinRequestBody>(
    {
      mutationFn: (data) => joinChallenge(data),
    },
  );
};

export const useGetChattingroomIds = (challengeId: string) => {
  return useQuery<getChattingRooomIdsResponse, ErrorDTO>({
    queryKey: [QUERY_KEYS.CHATTINGROOM_IDS, challengeId],
    queryFn: () => getChattingRooomIds(challengeId),
    enabled: !!challengeId,
    initialData: {} as getChattingRooomIdsResponse,
  });
};

export const useStartChallenge = () => {
  return useMutation<void, ErrorDTO, string>({
    mutationFn: (challengeId) => startChallenge(challengeId),
  });
};

export const useExitChallenge = () => {
  return useMutation<void, ErrorDTO, string>({
    mutationFn: (challengeId) => exitChallenge(challengeId),
  });
};

export const useChangeTeam = () => {
  const client = useQueryClient();

  return useMutation<ChangeTeamResponse, ErrorDTO, string>({
    mutationFn: (participantId) => changeTeam(participantId),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: [QUERY_KEYS.PARTICIPANT],
      });
    },
  });
};
