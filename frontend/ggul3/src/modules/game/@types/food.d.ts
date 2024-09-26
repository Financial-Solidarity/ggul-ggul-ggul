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
