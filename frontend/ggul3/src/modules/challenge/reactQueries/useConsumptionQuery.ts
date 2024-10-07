import { useQuery } from '@tanstack/react-query';
import { ErrorDTO, GetConsumptionListResponse } from '@types';

import { getConsumtionList } from '../apis/consumption';

import { QUERY_KEYS } from '@/modules/common/constants';

export const useGetConsumptionList = (challengeId: string) => {
  return useQuery<GetConsumptionListResponse, ErrorDTO>({
    queryKey: [QUERY_KEYS.CONSUMPTION, challengeId],
    queryFn: () => getConsumtionList(challengeId),
    enabled: !!challengeId,
    initialData: [],
  });
};
