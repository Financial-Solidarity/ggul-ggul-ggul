import { Chat, ChattingRoomGroupDTO, JustifyRequestBody } from '@types';

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
    url: `chat/${chattingRoomId}/after`,
    method: 'GET',
  });
};

/**
 * 이전 채팅 목록 조회 (읽었던 채팅 조회)
 */
export const getPreviousChattingList = (chattingRoomId: string) => {
  return _axios<Chat[]>({
    url: `chat/${chattingRoomId}/before`,
    method: 'GET',
  });
};

export const justify = (data: JustifyRequestBody) => {
  return _axios<void>({
    url: 'chat/justification',
    method: 'POST',
    data,
  });
};
