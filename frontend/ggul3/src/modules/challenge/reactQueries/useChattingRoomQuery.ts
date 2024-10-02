import { useQuery } from '@tanstack/react-query';
import { Chat, ChattingRoomGroupDTO, ErrorDTO } from '@types';

import {
  getChattingRooomList,
  getPreviousChattingList,
  getRecentChattingList,
} from '../apis/chattingroom';

import { QUERY_KEYS } from '@/modules/common/constants';

export const useGetChattingRoomList = () => {
  return useQuery<ChattingRoomGroupDTO[], ErrorDTO>({
    queryKey: [QUERY_KEYS.CHATTINGROOM],
    queryFn: () => getChattingRooomList(),
    initialData: [],
  });
};

export const useRecentChattingList = (chattingRoomId: string) => {
  return useQuery<Chat[], ErrorDTO>({
    queryKey: [QUERY_KEYS.RECENT_CHATTING, chattingRoomId],
    queryFn: () => getRecentChattingList(chattingRoomId),
    initialData: [],
    enabled: !!chattingRoomId,
  });
};

export const usePreviousChattingList = (chattingRoomId: string) => {
  return useQuery<Chat[], ErrorDTO>({
    queryKey: [QUERY_KEYS.PREVIOUS_CHATTING, chattingRoomId],
    queryFn: () => getPreviousChattingList(chattingRoomId),
    initialData: [],
    enabled: !!chattingRoomId,
  });
};
