import { useEffect, useState, useRef } from 'react';

import { useTokenBalanceQuery } from '@/modules/game/queries';

export const MiniTokenBalanceChip = () => {
  const { data, isLoading } = useTokenBalanceQuery();

  const tokenBalance = data?.balance ?? 0;

  // 현재 표시되는 토큰 밸런스 상태
  const [displayedBalance, setDisplayedBalance] = useState(tokenBalance);
  const [highlight, setHighlight] = useState(false);
  const isFirstRender = useRef(true); // 최초 렌더링 여부 확인

  const previousTokenBalance = useRef(tokenBalance);

  useEffect(() => {
    // 최초 렌더링 시 애니메이션 적용 안함
    if (isFirstRender.current) {
      isFirstRender.current = false;
      setDisplayedBalance(tokenBalance);

      return;
    }

    if (previousTokenBalance.current !== tokenBalance) {
      // 배경색 강조 애니메이션 시작
      setHighlight(true);

      // 이전 토큰 밸런스부터 목표 토큰 밸런스까지 서서히 변화를 줌
      const step = tokenBalance > previousTokenBalance.current ? 1 : -1;

      const interval = setInterval(() => {
        setDisplayedBalance((prev) => {
          const newBalance = prev + step;

          if (
            (step > 0 && newBalance >= tokenBalance) ||
            (step < 0 && newBalance <= tokenBalance)
          ) {
            clearInterval(interval);

            return tokenBalance;
          }

          return newBalance;
        });
      }, 20); // 20ms마다 1씩 변하도록 설정

      // 일정 시간 후 강조 효과를 종료
      setTimeout(() => setHighlight(false), 500);

      // 이전 토큰 밸런스 업데이트
      previousTokenBalance.current = tokenBalance;
    }
  }, [tokenBalance]);

  return (
    <div
      className={`flex min-w-20 max-w-24 items-center justify-between gap-2 rounded-xl px-2 py-1 transition-colors duration-300 ${
        highlight ? 'bg-yellow-400' : 'bg-primary-200'
      }`}
    >
      <div className="h-6 w-6 rounded-full bg-white text-center">ㄲ</div>
      <div className="min-w-10 text-white">
        {isLoading ? '0000' : displayedBalance}
      </div>
    </div>
  );
};
