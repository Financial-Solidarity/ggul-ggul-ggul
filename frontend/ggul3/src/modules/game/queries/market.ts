import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { GamePagination, FoodNftSellDTO } from '../@types/equipment';
import { mockGetNftSellList, mockSearchNftSellList } from '../apis/market';

interface NftSellListResponse {
  content: FoodNftSellDTO[];
  pagination: GamePagination;
}

interface NftSellListSearchResponse {
  content: FoodNftSellDTO[];
  totalElements: number;
  totalPages: number;
}

interface SearchCriteria {
  name?: string;
  minStatus?: number;
  maxStatus?: number;
  minPrice?: number;
  maxPrice?: number;
}

export const useNftSellListQuery = (
  pageNumber: number,
  pageSize: number,
): UseQueryResult<NftSellListResponse, Error> => {
  return useQuery<NftSellListResponse, Error>({
    queryKey: ['nftSellList', pageNumber, pageSize],
    queryFn: () => mockGetNftSellList(pageNumber, pageSize),
    staleTime: 5000,
  });
};

export const useNftSellListSearchQuery = (
  keyword: string,
  searchCriteria: SearchCriteria,
  pageNumber: number,
  pageSize: number,
): UseQueryResult<NftSellListSearchResponse, Error> => {
  return useQuery<NftSellListSearchResponse, Error>({
    queryKey: [
      'nftSellSearchList',
      keyword,
      searchCriteria,
      pageNumber,
      pageSize,
    ],
    queryFn: () =>
      mockSearchNftSellList(keyword, searchCriteria, pageNumber, pageSize),
    enabled:
      !!keyword ||
      Object.keys(searchCriteria).some(
        (key) => searchCriteria[key as keyof SearchCriteria] !== undefined,
      ),
    staleTime: 5000,
  });
};
