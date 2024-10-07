import { useRef, useEffect, useState } from 'react';
import { Button, Tabs, Tab } from '@nextui-org/react';

import { MiniTokenBalanceChip } from '../components/common/MiniTokenBalanceChip';
import { NFTSellCardList } from '../components/GameMarket/NFTSellCardList';
import { SearchFilterSheet } from '../components/GameMarket/SearchFilterSheet';
import { useGameMarketData } from '../hooks/useGameMarketData';
import { NothingLottie } from '../components/common/Lotties/NothingLottie';

import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { useSetBottomBar } from '@/modules/common/hooks/useSetBottomBar';

export const GameMarket = (): JSX.Element => {
  useSetBottomBar({ active: true, isDarkMode: true });

  const pageSize = 4;
  const pageContainerRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [own, setOwn] = useState<'true' | 'false'>('false');

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
    handleSearch({ status: 'PENDING' });
  }, [own]);

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

  // 검색 조건이 변경될 때에만 리스트를 비우고 새로운 검색 수행
  const handleSearch = (criteria: {
    name?: string;
    minPrice?: number;
    maxPrice?: number;
    minPower?: number;
    maxPower?: number;
    status?: 'PENDING' | 'COMPLETED';
  }) => {
    setSearchCriteria((prevCriteria) => {
      const newCriteria = { ...prevCriteria, ...criteria, own };

      if (JSON.stringify(newCriteria) !== JSON.stringify(prevCriteria)) {
        setPageNumber(0);
        setSellNftList([]);
      }

      return newCriteria;
    });
  };

  const handleTabChange = (key: 'true' | 'false') => {
    if (own !== key) {
      setOwn(key);
      handleSearch({});
    }
  };

  return (
    <>
      <TopBar bgColor="bg-black" left={<BackButton />} />
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
        {/* Tabs 추가 */}
        <Tabs
          fullWidth
          color="primary"
          selectedKey={own}
          onSelectionChange={(key) => handleTabChange(key as 'true' | 'false')}
        >
          <Tab key="false" className="w-full" title="다른 사람들의 판매글" />
          <Tab key="true" className="w-full" title="내 판매글" />
        </Tabs>

        <div className="mt-4">
          <Button
            fullWidth
            className="bg-default-100 font-semibold text-default-400"
            onClick={() => setSheetOpen(true)}
          >
            검색
          </Button>
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
            <p className="mt-4 text-2xl font-bold">텅 비어있어요.</p>
          </div>
        ) : (
          <NFTSellCardList nftList={sellNftList} />
        )}

        <div ref={observerRef} className="mt-4 flex justify-center">
          {isFetching && <>로딩 중...</>}
        </div>

        <Button
          className="fixed bottom-20 right-8 z-30 bg-purple-600 text-white"
          onClick={scrollToTop}
        >
          맨 위로
        </Button>

        <SearchFilterSheet
          isMyPost={own === 'true'}
          isOpen={isSheetOpen}
          onClose={() => setSheetOpen(false)}
          onSearch={handleSearch}
        />
      </PageContainer>
    </>
  );
};
