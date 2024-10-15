import { GetConsumptionListResponse } from '@types';

import { _axios } from '@/modules/common/utils/axios';

export const getConsumtionList = (challengeId: string) => {
  return _axios<GetConsumptionListResponse>({
    url: `/challenges/${challengeId}/consumptions`,
    method: 'get',
  });
};
