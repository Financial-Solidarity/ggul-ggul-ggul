import { useState, useEffect, useCallback } from 'react';

import {
  useNftSellListQuery,
  useNftSellListSearchQuery,
} from '../queries/market';
import { FoodNftSellDTO } from '../@types/equipment';

export const useGameMarketData = (pageSize: number) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [foodNftSellList, setFoodNftSellList] = useState<FoodNftSellDTO[]>([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchCriteria, setSearchCriteria] = useState({
    name: '',
    minStatus: 0,
    maxStatus: 100,
    minPrice: 0,
    maxPrice: 1000,
  });
  const [totalContentCount, setTotalContentCount] = useState<number | null>(
    null,
  );

  const { data, isFetching } = useNftSellListQuery(pageNumber, pageSize);
  const { data: searchData } = useNftSellListSearchQuery(
    searchKeyword,
    searchCriteria,
    pageNumber,
    pageSize,
  );

  // useEffect(() => {
  //   if (data?.content) {
  //     setFoodNftSellList((prevList) => [...prevList, ...data.content]);
  //     setTotalContentCount(data.pagination.totalElements);
  //   }
  // }, [data]);

  // useEffect(() => {
  //   if (searchData?.content) {
  //     setFoodNftSellList(searchData.content);
  //     setTotalContentCount(searchData.totalElements);
  //   }
  // }, [searchData]);

  useEffect(() => {
    console.log('useEffect triggered by:', {
      data,
      searchData,
      searchKeyword,
    });

    if (searchKeyword && searchData?.content) {
      // 검색 모드에서만 리스트를 검색 데이터로 대체
      setFoodNftSellList(searchData.content);
      setTotalContentCount(searchData.totalElements);
    } else if (data?.content && !searchKeyword) {
      // 검색 모드가 아닌 경우에만 무한 스크롤 데이터 추가
      setFoodNftSellList((prevList) => [...prevList, ...data.content]);
      setTotalContentCount(data.pagination.totalElements);
    }
  }, [data, searchData, searchKeyword]);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];

      if (
        target.isIntersecting &&
        !isFetching &&
        (totalContentCount === null ||
          foodNftSellList.length < totalContentCount)
      ) {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      }
    },
    [isFetching, totalContentCount, foodNftSellList.length],
  );

  return {
    foodNftSellList,
    isFetching,
    handleObserver,
    setSearchCriteria,
    setSearchKeyword,
    setFoodNftSellList,
    setPageNumber,
  };
};
