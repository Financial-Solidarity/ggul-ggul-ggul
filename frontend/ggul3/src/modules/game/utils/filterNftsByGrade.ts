import { FoodNftDTO } from '@/modules/game/@types/equipment';

export const filterNftsByGrade = (
  nfts: FoodNftDTO[],
  gradeIndex: string,
): FoodNftDTO[] => {
  return nfts.filter((foodNft) => foodNft.gradeIndex.toString() === gradeIndex);
};
