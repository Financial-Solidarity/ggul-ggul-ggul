import { ChallengeDTO } from '@types';

import { _axios } from '@/modules/common/utils/axios';
export const getChallengeInfo = (challengeId: string) => {
  return _axios<ChallengeDTO>({
    method: 'GET',
    url: `challenges/${challengeId}`,
  });
};
