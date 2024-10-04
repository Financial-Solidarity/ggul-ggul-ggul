import { Pagination as BasePagination } from '@types';

export interface FoodDTO {
  name: string;
  typeIndex: number;
  gradeIndex: number;
  status: number;
  hexCode: string;
  contractUrl: string;
}

export interface FoodNftDTO extends FoodDTO {
  tokenId: string;
  ownerAddress: string;
}

export interface FoodNftSellDTO extends FoodNftDTO {
  price: number;
  createdAt: string;
}

export interface GamePagination extends BasePagination {
  totalPages: number;
  totalElements: number;
}
