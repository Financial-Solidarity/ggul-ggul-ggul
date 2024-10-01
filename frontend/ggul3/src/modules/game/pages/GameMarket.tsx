import { useRef, useEffect, useState } from 'react';
import { Input, Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

import { MiniTokenBalanceChip } from '../components/common/MiniTokenBalanceChip';
import { NFTSellCardList } from '../components/GameMarket/NFTSellCardList';
import { SearchFilterSheet } from '../components/GameMarket/SearchFilterSheet';
import { useGameMarketData } from '../hooks/useGameMarketData';

import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { NotificationButton } from '@/modules/common/components/NotificationButton/NotificationButton';
import { useSetBottomBar } from '@/modules/common/hooks/useSetBottomBar';

export const GameMarket = (): JSX.Element => {
  useSetBottomBar({ active: true, isDarkMode: true });
  const navigate = useNavigate(); // navigate 훅 사용

  const pageSize = 4;
  const pageContainerRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [isSheetOpen, setSheetOpen] = useState(false);

  const {
    foodNftSellList,
    isFetching,
    handleObserver,
    setSearchCriteria,
    setSearchKeyword,
    setFoodNftSellList,
    setPageNumber,
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
    minStatus?: number;
    maxStatus?: number;
    minPrice?: number;
    maxPrice?: number;
  }) => {
    setSearchCriteria({
      name: criteria.name || '',
      minStatus: criteria.minStatus ?? 0,
      maxStatus: criteria.maxStatus ?? 100,
      minPrice: criteria.minPrice ?? 0,
      maxPrice: criteria.maxPrice ?? 1000,
    });
    setSearchKeyword(criteria.name || '');
    setPageNumber(0);
    setFoodNftSellList([]);
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
            <p className="text-2xl font-semibold text-white">NFT 음식 마켓</p>
            <MiniTokenBalanceChip />
          </div>
        }
      >
        <div className="mt-4">
          <Input
            fullWidth
            className="bg-gray-800 text-white"
            placeholder="무언가 검색해주세요"
            onFocus={() => setSheetOpen(true)}
          />
        </div>

        <NFTSellCardList nftList={foodNftSellList} />

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
