import { useMutation, useQuery } from '@tanstack/react-query';
import {
  ChallengeDTO,
  CreateChallengeRequestBody,
  CreateChallengeResponse,
  ErrorDTO,
} from '@types';

import { getChallengeInfo } from '../apis/waitingroom';
import { createChallenge } from '../apis/createChallenge';

import { QUERY_KEYS } from '@/modules/common/constants';

export const useGetChallenge = (challengeId: string) => {
  return useQuery<ChallengeDTO, ErrorDTO>({
    queryKey: [QUERY_KEYS.CHALLENGE, challengeId],
    queryFn: () => getChallengeInfo(challengeId),
    enabled: !!challengeId,
    initialData: {} as ChallengeDTO,
  });
};

export const useCreateChallenge = () => {
  return useMutation<
    CreateChallengeResponse,
    ErrorDTO,
    CreateChallengeRequestBody
  >({
    mutationFn: (data) => createChallenge(data),
  });
};
