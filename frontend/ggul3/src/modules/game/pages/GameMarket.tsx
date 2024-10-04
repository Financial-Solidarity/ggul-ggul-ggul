import { useRef, useEffect, useState } from 'react';
import { Input, Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

import { MiniTokenBalanceChip } from '../components/common/MiniTokenBalanceChip';
import { NFTSellCardList } from '../components/GameMarket/NFTSellCardList';
import { SearchFilterSheet } from '../components/GameMarket/SearchFilterSheet';
import { useGameMarketData } from '../hooks/useGameMarketData';
import { NothingLottie } from '../components/common/Lotties/NothingLottie';

import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { NotificationButton } from '@/modules/common/components/NotificationButton/NotificationButton';
import { useSetBottomBar } from '@/modules/common/hooks/useSetBottomBar';

export const GameMarket = (): JSX.Element => {
  useSetBottomBar({ active: true, isDarkMode: true });
  const navigate = useNavigate();

  const pageSize = 4;
  const pageContainerRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [isSheetOpen, setSheetOpen] = useState(false);

  const {
    sellNftList,
    isFetching,
    handleObserver,
    setSearchCriteria,
    setSellNftList,
    setPageNumber,
    hasError,
  } = useGameMarketData(pageSize);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.5,
    });

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [handleObserver]);

  const scrollToTop = () => {
    pageContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (criteria: {
    name?: string;
    minPrice?: number;
    maxPrice?: number;
    minPower?: number;
    maxPower?: number;
    own?: 'true' | 'false';
  }) => {
    setSearchCriteria(criteria);
    setPageNumber(0);
    setSellNftList([]);
  };

  return (
    <>
      <TopBar
        bgColor="bg-black"
        left={<BackButton />}
        right={<NotificationButton />}
      />
      <PageContainer
        bgColor="bg-black"
        containerRef={pageContainerRef}
        titleContent={
          <div className="flex w-full flex-row justify-between">
            <p className="text-2xl font-semibold text-white">NFT 마켓</p>
            <MiniTokenBalanceChip />
          </div>
        }
      >
        <div className="mt-4">
          <Input
            fullWidth
            className="bg-gray-800 text-white"
            placeholder="검색"
            onFocus={() => setSheetOpen(true)}
          />
        </div>

        {/* 결과가 없거나 에러인 경우에 대한 처리 */}
        {hasError ? (
          <div className="mt-8 flex flex-col items-center text-white">
            <NothingLottie />
            <p className="text-red-500">잠시 후 다시 시도해주세요.</p>
          </div>
        ) : sellNftList.length === 0 && !isFetching ? (
          <div className="mt-8 flex flex-col items-center text-white">
            <NothingLottie />
            <p className="mt-4">텅 비어있어요.</p>
          </div>
        ) : (
          <NFTSellCardList nftList={sellNftList} />
        )}

        <div ref={observerRef} className="mt-4 flex justify-center">
          {isFetching && <>로딩 중...</>}
        </div>

        <Button
          className="fixed bottom-20 right-8 bg-purple-600 text-white"
          onClick={scrollToTop}
        >
          맨 위로
        </Button>

        <SearchFilterSheet
          isOpen={isSheetOpen}
          onClose={() => setSheetOpen(false)}
          onSearch={handleSearch}
        />
      </PageContainer>
    </>
  );
};
