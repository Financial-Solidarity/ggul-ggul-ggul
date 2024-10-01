import { GetChallengeDetailResponse } from '@types';

import { _axios } from '@/modules/common/utils/axios';

export const getChallengeDetail = (challengeId: string) => {
  return _axios<GetChallengeDetailResponse>({
    url: `/challenges/${challengeId}`,
    method: 'get',
  });
};
