import { ChattingRoomGroupDTO } from '@types';

import { _axios } from '@/modules/common/utils/axios';

export const getChattingRooomList = () => {
  return _axios<ChattingRoomGroupDTO[]>({
    url: 'challenges',
  });
};
