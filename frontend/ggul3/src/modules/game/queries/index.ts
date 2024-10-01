import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { mockGetEquippedFoodNft, mockGetFoodNftList } from '../apis';

import { FoodNftDTO } from '@/modules/game/@types/equipment';

export const useEquippedFoodNftQuery = (): UseQueryResult<FoodNftDTO> => {
  return useQuery<FoodNftDTO>({
    queryKey: ['equippedFoodNft'],
    queryFn: mockGetEquippedFoodNft,
  });
};

export const useFoodNftListQuery = (): UseQueryResult<FoodNftDTO[]> => {
  return useQuery<FoodNftDTO[]>({
    queryKey: ['foodNftList'],
    queryFn: mockGetFoodNftList,
  });
};
