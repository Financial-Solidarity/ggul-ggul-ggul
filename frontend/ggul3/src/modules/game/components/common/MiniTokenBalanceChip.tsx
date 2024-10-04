import { useTokenBalanceQuery } from '@/modules/game/queries';

export const MiniTokenBalanceChip = () => {
  const { data, isLoading } = useTokenBalanceQuery();

  // data가 객체이므로, data?.balance로 balance 값만 추출
  const tokenBalance = data?.balance ?? 0;

  return (
    <div className="flex min-w-20 max-w-24 items-center justify-between gap-1 rounded-xl bg-primary-200 px-3 py-1">
      <div className="h-6 w-6 rounded-full bg-white text-center">ㄲ</div>
      <div className="text-white">{isLoading ? '0000' : tokenBalance}</div>
    </div>
  );
};
