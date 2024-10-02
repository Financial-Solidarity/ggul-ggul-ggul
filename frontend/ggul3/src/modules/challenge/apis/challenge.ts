import {
  GetChallengeDetailResponse,
  getChattingRooomIdsResponse,
  GetParticipatingChallengeResponse,
  ParticipantDTO,
} from '@types';

import { _axios } from '@/modules/common/utils/axios';

export const getChallengeDetail = (challengeId: string) => {
  return _axios<GetChallengeDetailResponse>({
    url: `/challenges/${challengeId}`,
    method: 'get',
  });
};

export const getParticipantList = (challengeId: string) => {
  return _axios<ParticipantDTO[]>({
    url: `/challenges/${challengeId}/participants`,
    method: 'get',
  });
};

export const getChattingRooomIds = (challengeId: string) => {
  return _axios<getChattingRooomIdsResponse>({
    url: `/challenges/${challengeId}/chatting-room`,
    method: 'get',
  });
};

export const getParticipatingChallenge = () => {
  return _axios<GetParticipatingChallengeResponse>({
    url: 'challenges/now',
    method: 'get',
  });
};
