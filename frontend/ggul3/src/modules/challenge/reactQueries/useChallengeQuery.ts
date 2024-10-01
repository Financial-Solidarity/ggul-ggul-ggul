import { useMutation, useQuery } from '@tanstack/react-query';
import {
  CreateChallengeRequestBody,
  CreateChallengeResponse,
  ErrorDTO,
  GetChallengeDetailResponse,
  getChattingRooomIdsResponse,
  ParticipantDTO,
} from '@types';

import { createChallenge } from '../apis/createChallenge';
import {
  getChallengeDetail,
  getChattingRooomIds,
  getParticipantList,
} from '../apis/challenge';
import { exitChallenge, startChallenge } from '../apis/waitingroom';

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
