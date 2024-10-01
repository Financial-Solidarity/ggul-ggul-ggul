import { useMutation, useQuery } from '@tanstack/react-query';
import {
  CreateChallengeRequestBody,
  CreateChallengeResponse,
  ErrorDTO,
  GetChallengeDetailResponse,
} from '@types';

import { createChallenge } from '../apis/createChallenge';
import { getChallengeDetail } from '../apis/challenge';

import { QUERY_KEYS } from '@/modules/common/constants';

export const useGetChallengeDetail = (challengeId: string) => {
  return useQuery<GetChallengeDetailResponse, ErrorDTO>({
    queryKey: [QUERY_KEYS.CHALLENGE, challengeId],
    queryFn: () => getChallengeDetail(challengeId),
    enabled: !!challengeId,
    initialData: {} as GetChallengeDetailResponse,
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
