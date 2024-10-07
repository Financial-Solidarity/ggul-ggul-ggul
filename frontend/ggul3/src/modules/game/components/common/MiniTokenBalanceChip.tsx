import { useEffect, useState, useRef } from 'react';

import { useTokenBalanceQuery } from '@/modules/game/queries';

export const MiniTokenBalanceChip = () => {
  const { data, isLoading } = useTokenBalanceQuery();
  const tokenBalance = data?.balance ?? 0;

  const [displayedBalance, setDisplayedBalance] = useState(tokenBalance);
  const [highlight, setHighlight] = useState(false);
  const previousTokenBalance = useRef(tokenBalance);

  useEffect(() => {
    if (isLoading || displayedBalance === tokenBalance) return;

    setHighlight(true);

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
    }, 20);

    setTimeout(() => setHighlight(false), 500);

    previousTokenBalance.current = tokenBalance;

    return () => clearInterval(interval);
  }, [tokenBalance, isLoading, displayedBalance]);

  return (
    <div
      className={`flex h-8 w-max min-w-20 max-w-36 items-center justify-between gap-2 rounded-xl px-2 py-1 transition-colors duration-300 ${
        highlight ? 'bg-yellow-400' : 'bg-primary-300'
      }`}
    >
      <div className="h-6 w-6 rounded-full bg-white text-center font-semibold text-primary-400">
        ㄲ
      </div>
      <div className="min-w-10 text-right text-white">
        {isLoading ? '0' : displayedBalance}
      </div>
    </div>
  );
};
