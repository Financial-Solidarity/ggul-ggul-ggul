import axios, { AxiosRequestConfig } from 'axios';
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

    return Promise.reject(error.response.data);
  },
);

export const _axios = async <T>(config: AxiosRequestConfig) => {
  const { data } = await instance<T>(config);

  return data;
};
