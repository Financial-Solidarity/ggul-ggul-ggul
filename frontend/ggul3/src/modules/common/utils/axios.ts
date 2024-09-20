import axios from 'axios';
export const _axios = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

_axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    alert(error.message);

    return Promise.reject(error);
  },
);

_axios.interceptors.response.use(
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

    return res.data;
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
