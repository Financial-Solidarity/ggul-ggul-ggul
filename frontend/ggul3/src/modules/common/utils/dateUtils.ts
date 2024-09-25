import dayjs from 'dayjs';
export const toYYMDhm_ko = (date: string) => {
  return dayjs(date).format('YY년 M월 D일  H시 m분');
};

export const padZero = (num: number) => num.toString().padStart(2, '0');

export const formatCountdown = ({
  days = 0,
  hours = 0,
  minutes = 0,
  seconds = 0,
}: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}): string => {
  return `${padZero(days)}:${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
};
