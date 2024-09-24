import dayjs from 'dayjs';
export const toYYMDhm_ko = (date: string) => {
  return dayjs(date).format('YY년 M월 D일  H시 m분');
};
