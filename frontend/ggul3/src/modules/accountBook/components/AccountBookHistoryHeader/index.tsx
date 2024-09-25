import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const AccountBookHistoryHeader = () => {
  return (
    <div
      className={`flex flex-col bg-primary p-4 text-white transition-all duration-200`}
    >
      <p className="flex items-center gap-2 py-4 text-3xl">
        <ChevronLeftIcon className="w-7 cursor-pointer" />
        9월
        <ChevronRightIcon className="w-7 cursor-pointer" />
      </p>
      <div className="flex">
        <div className="flex-1">
          <p className="flex text-sm text-gray-300">이용 내역</p>
          <p className="text-2xl font-bold">-236,680원</p>
        </div>
        <div className="flex-1">
          <p className="flex text-sm text-gray-300">껄 페이로 절약한 비용</p>
          <p className="text-2xl font-bold">+8,310원</p>
        </div>
      </div>
    </div>
  );
};

export default AccountBookHistoryHeader;
