import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

export const toYYMDhm_ko = (date: string) => {
  return dayjs(date).format('YY년 M월 D일  H시 m분');
};

export const toYYMDhm = (date: string) => {
  return dayjs(date).format('YY.M.D H:mm');
};

export const toAMPM_ko = (date: string) => {
  const d = dayjs(date);
  const ampm = d.hour() < 12 ? '오전' : '오후';

  return `${ampm} ${d.format('h:mm')}`;
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

dayjs.extend(utc);
dayjs.extend(timezone);

export const formatToRelativeTime = (dateString: string | undefined) => {
  const date = dayjs(dateString).tz('Asia/Seoul');
  const now = dayjs().tz('Asia/Seoul');
  // console.log('now:', now);
  // console.log('dateString:', dateString);

  const diffSeconds = now.diff(date, 'second');
  const diffMinutes = now.diff(date, 'minute');
  const diffHours = now.diff(date, 'hour');
  const diffDays = now.diff(date, 'day');
  const diffMonths = now.diff(date, 'month');
  const diffYears = now.diff(date, 'year');

  if (diffSeconds < 60) return `${diffSeconds}초 전`;
  if (diffMinutes < 60) return `${diffMinutes}분 전`;
  if (diffHours < 24) return `${diffHours}시간 전`;
  if (diffDays < 30) return `${diffDays}일 전`;
  if (diffMonths < 12) return `${diffMonths}달 전`;

  return `${diffYears}년 전`;
};
