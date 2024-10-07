import { _axios } from '@/modules/common/utils/axios';

interface ILogin {
  email: string;
  password: string;
}

export const login = ({ email, password }: ILogin) => {
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
