import { CreateChallengeRequestBody, CreateChallengeResponse } from '@types';

import { _axios } from '@/modules/common/utils/axios';

export const createChallenge = (data: CreateChallengeRequestBody) => {
  return _axios<CreateChallengeResponse>({
    method: 'POST',
    url: `challenges`,
    data,
  });
};
