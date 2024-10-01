import { useQuery } from '@tanstack/react-query';
import { ChattingRoomGroupDTO, ErrorDTO } from '@types';

import { getChattingRooomList } from '../apis/chattingroom';

import { QUERY_KEYS } from '@/modules/common/constants';

export const useGetChattingRoomList = () => {
  return useQuery<ChattingRoomGroupDTO[], ErrorDTO>({
    queryKey: [QUERY_KEYS.CHATTINGROOM],
    queryFn: () => getChattingRooomList(),
    initialData: [],
  });
};
