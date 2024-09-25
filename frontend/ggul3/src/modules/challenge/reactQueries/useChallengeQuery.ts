import { useQuery } from '@tanstack/react-query';
import { ChallengeDTO, ErrorDTO } from '@types';

import { getChallengeInfo } from '../apis/waitingroom';

import { QUERY_KEYS } from '@/modules/common/constants';

export const useGetChallenge = (challengeId: string) => {
  return useQuery<ChallengeDTO, ErrorDTO>({
    queryKey: [QUERY_KEYS.CHALLENGE, challengeId],
    queryFn: () => getChallengeInfo(challengeId),
    enabled: !!challengeId,
    initialData: {} as ChallengeDTO,
  });
};
