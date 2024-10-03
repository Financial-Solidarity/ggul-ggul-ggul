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

  // 판매 리스트 가져오기 쿼리
  const { data, isFetching } = useSellNFTListQuery({
    page: pageNumber,
    size: pageSize,
    ...searchCriteria,
  });

  useEffect(() => {
    if (data?.content) {
      // 검색 조건이 있을 경우 초기화 후 데이터 교체
      if (pageNumber === 0) {
        setSellNftList(data.content);
      } else {
        setSellNftList((prevList) => [...prevList, ...data.content]);
      }

      // 마지막 페이지 여부를 확인하여 페칭 중단
      setIsLastPage(data.pagination.last);
    }
  }, [data, pageNumber]);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];

      // last가 false이고 더 가져올 데이터가 있다면 페칭
      if (target.isIntersecting && !isFetching && !isLastPage) {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      }
    },
    [isFetching, isLastPage],
  );

  return {
    sellNftList,
    isFetching,
    handleObserver,
    setSearchCriteria,
    setSellNftList,
    setPageNumber,
  };
};
