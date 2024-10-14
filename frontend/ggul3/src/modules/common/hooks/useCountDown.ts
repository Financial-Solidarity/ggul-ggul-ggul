import { useEffect, useState } from 'react';

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const useCountdown = (targetDate: string | Date): Countdown => {
  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const target = new Date(targetDate).getTime();
    const difference = target - now;

    let timeLeft: Countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<Countdown>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
      // targetDate가 현재 시간을 지나면 타이머를 멈춤
      if (new Date() >= new Date(targetDate)) {
        clearInterval(timer);
      }
    }, 1000); // 매 1초마다 업데이트

    return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [targetDate]);

  return timeLeft;
};
