import { LoginForm } from '@types';

import { _axios } from '@/modules/common/utils/axios';

export const login = ({ email, password }: LoginForm) => {
  return _axios({
    method: 'POST',
    url: `/auth/login`,
    data: { email, password },
  });
};

export const fetchLogout = () => {
  return _axios({
    method: 'POST',
    url: `/auth/logout`,
  });
};

export const postFcmToken = (fcmToken: string | undefined) => {
  return _axios({
    method: 'POST',
    url: `/fcm`,
    data: { fcmToken },
  });
};
