import { useState, useEffect, useCallback } from 'react';

import {
  useNftSellListQuery,
  useNftSellListSearchQuery,
} from '../queries/market';
import { FoodNftSellDTO } from '../@types/food';

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

  useEffect(() => {
    if (data?.content) {
      setFoodNftSellList((prevList) => [...prevList, ...data.content]);
      setTotalContentCount(data.pagination.totalElements);
    }
  }, [data]);

  useEffect(() => {
    if (searchData?.content) {
      setFoodNftSellList(searchData.content);
      setTotalContentCount(searchData.totalElements);
    }
  }, [searchData]);

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
