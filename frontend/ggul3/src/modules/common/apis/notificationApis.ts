import { NotificationListResponse } from '@types';

import { _axios } from '@/modules/common/utils/axios';

export const getNotifications = (page: number) => {
  return _axios<NotificationListResponse>({
    method: 'GET',
    url: `/notifications`,
    params: { page },
  });
};
