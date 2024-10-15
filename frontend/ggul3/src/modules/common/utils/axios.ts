import axios, { AxiosRequestConfig } from 'axios';

import { useUserStore } from '../store/userStore';
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    if (import.meta.env.MODE !== 'production') {
      config.headers['Access-Control-Allow-Credentials'] = true;
      config.headers['ngrok-skip-browser-warning'] = true;
    }

    return config;
  },
  (error) => {
    alert(error.message);

    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (res) => {
    if (import.meta.env.MODE !== 'production') {
      console.groupCollapsed(
        `🟢[${res.config.method?.toUpperCase()}][${res.status}${
          res.statusText && ' ' + res.statusText
        }]${res.config.url}`,
      );
      console.group('data');

      console.log(res.data);
      console.groupEnd();
      console.groupCollapsed('ALL');
      console.log(res);
      console.groupEnd();
      console.groupEnd();
    }

    return res;
  },
  async (error) => {
    const { config } = error;

    if (import.meta.env.MODE !== 'production' && config) {
      console.group(`🔴[${config.method.toUpperCase()}][]${config.url}`);
      console.error(error);
      console.groupEnd();
    }
    if (error.config.url === '/auth/login' && error.response.status === 401) {
      window.alert('이메일 또는 비밀번호가 일치하지 않습니다.');
    } else if (error.status === 401) {
      useUserStore.getState().setUser({
        userId: '',
        username: '',
        nickname: '',
        profileImg: '',
      });

      useUserStore.getState().setIsLoggedIn(false);
      window.alert('세션이 만료되었습니다. 다시 로그인해주세요.');

      window.location.href = '/login';
    }

    return Promise.reject(error.response.data);
  },
);

export const _axios = async <T>(config: AxiosRequestConfig) => {
  const { data } = await instance<T>(config);

  return data;
};
