import { Chat, ChattingRoomGroupDTO } from '@types';

import { _axios } from '@/modules/common/utils/axios';

/**
 * 참여중인 채팅방 목록 조회
 */
export const getChattingRooomList = () => {
  return _axios<ChattingRoomGroupDTO[]>({
    url: 'challenges',
    method: 'GET',
  });
};

/**
 * 최근 채팅 목록 조회 (읽지 않은 채팅 조회)
 */
export const getRecentChattingList = (chattingRoomId: string) => {
  return _axios<Chat[]>({
    url: `chattingRoom/${chattingRoomId}/chat/log/after`,
    method: 'GET',
  });
};
