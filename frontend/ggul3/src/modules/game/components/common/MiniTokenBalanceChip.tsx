import { useEffect, useState, useRef } from 'react';

import { useTokenBalanceQuery } from '@/modules/game/queries';

export const MiniTokenBalanceChip = () => {
  const { data, isLoading } = useTokenBalanceQuery();
  const tokenBalance = data?.balance ?? 0;

  // 현재 표시되는 토큰 밸런스 상태
  const [displayedBalance, setDisplayedBalance] = useState(tokenBalance);
  const [highlight, setHighlight] = useState(false);
  const previousTokenBalance = useRef(tokenBalance);

  // 최초 렌더링 후에만 실행되도록 useLayoutEffect를 활용
  useEffect(() => {
    // 데이터가 로딩 중이거나 아직 불러오지 않은 경우 처리하지 않음
    if (isLoading || displayedBalance === tokenBalance) return;

    // 배경색 강조 애니메이션 시작
    setHighlight(true);

    // 이전 토큰 밸런스부터 목표 토큰 밸런스까지 서서히 변화를 줌
    const step = tokenBalance > previousTokenBalance.current ? 1 : -1;

    const interval = setInterval(() => {
      setDisplayedBalance((prev) => {
        const newBalance = prev + step;

        // 목표 토큰 밸런스에 도달하면 애니메이션 종료
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

    // 컴포넌트 언마운트 시 interval 정리
    return () => clearInterval(interval);
  }, [tokenBalance, isLoading, displayedBalance]);

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
