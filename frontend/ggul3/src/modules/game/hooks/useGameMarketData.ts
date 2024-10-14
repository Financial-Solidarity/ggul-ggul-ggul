import { useState, useEffect, useCallback } from 'react';

import { useSellNFTListQuery, useCancelMarketSaleMutation } from '../queries';
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
    own?: 'true' | 'false';
    status?: 'PENDING' | 'COMPLETED' | 'CANCELED';
  }>({
    own: 'false',
    status: 'PENDING',
  });
  const [isLastPage, setIsLastPage] = useState(false);
  const [hasError, setHasError] = useState(false);

  const { data, isFetching, isError } = useSellNFTListQuery({
    page: pageNumber,
    size: pageSize,
    ...searchCriteria,
  });

  const { mutate: cancelMarketSale } = useCancelMarketSaleMutation();

  useEffect(() => {
    if (isError) {
      setHasError(true);

      return;
    }

    if (data?.content) {
      setHasError(false);

      // 데이터를 업데이트하고 마지막 페이지인지 여부를 설정
      if (pageNumber === 0) {
        setSellNftList(data.content);
      } else {
        setSellNftList((prevList) => [...prevList, ...data.content]);
      }
      setIsLastPage(data.pageable.last || data.content.length < pageSize);
    }
  }, [data, pageNumber, isError, pageSize]);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];

      // target이 보이고, 마지막 페이지가 아니며, 에러가 없고, 페칭 중이 아닐 때만 페이지를 증가시킴
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

  const handleCancelSale = (marketId: string) => {
    cancelMarketSale(marketId, {
      onSuccess: () => {
        // 성공적으로 판매 취소 시 리스트 갱신
        setSellNftList((prevList) =>
          prevList.filter((item) => item.marketId !== marketId),
        );
      },
      onError: (error) => {
        console.error('판매 취소 오류:', error);
      },
    });
  };

  return {
    sellNftList,
    isFetching,
    handleObserver,
    setSearchCriteria,
    setSellNftList,
    setPageNumber,
    hasError,
    handleCancelSale,
  };
};
