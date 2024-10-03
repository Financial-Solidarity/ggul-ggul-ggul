import { useState, useEffect, useCallback } from 'react';

import { useSellNFTListQuery } from '../queries';
import { GetSellNFTListResponse } from '../@types';

export const useGameMarketData = (pageSize: number) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [sellNftList, setSellNftList] = useState<
    GetSellNFTListResponse['content']
  >([]);
  const [searchCriteria, setSearchCriteria] = useState<{
    name?: string;
    minPrice?: number;
    maxPrice?: number;
    minPower?: number;
    maxPower?: number;
    own?: 'x' | 'true' | 'false';
  }>({});
  const [isLastPage, setIsLastPage] = useState(false);
  const [hasError, setHasError] = useState(false);

  const { data, isFetching, isError } = useSellNFTListQuery({
    page: pageNumber,
    size: pageSize,
    ...searchCriteria,
  });

  useEffect(() => {
    // 에러가 발생한 경우
    if (isError) {
      setHasError(true);

      return;
    }

    // 데이터를 정상적으로 가져온 경우
    if (data?.content) {
      setHasError(false);
      if (pageNumber === 0) {
        setSellNftList(data.content);
      } else {
        setSellNftList((prevList) => [...prevList, ...data.content]);
      }
      setIsLastPage(data.pagination.last);
    }
  }, [data, pageNumber, isError]);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];

      // 페이지네이션: 검색 결과가 있고, 에러가 없으며, 더 가져올 데이터가 있을 때만
      if (
        target.isIntersecting &&
        !isFetching &&
        !isLastPage &&
        !hasError &&
        sellNftList.length > 0
      ) {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      }
    },
    [isFetching, isLastPage, hasError, sellNftList.length],
  );

  return {
    sellNftList,
    isFetching,
    handleObserver,
    setSearchCriteria,
    setSellNftList,
    setPageNumber,
    hasError,
  };
};
