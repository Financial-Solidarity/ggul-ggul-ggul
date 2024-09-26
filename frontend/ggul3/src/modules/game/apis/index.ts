import { FoodDTO, FoodNftDTO } from '../@types/food';

export const mockPostFoodLuckyDraw = async (): Promise<FoodDTO> => {
  return new Promise<FoodDTO>((resolve) => {
    setTimeout(() => {
      const status = Math.floor(Math.random() * 101);
      const name = '비범한 오믈렛';
      const hexCode = '#C9A4FF';
      const gradeIndex = Math.floor(Math.random() * 6);
      const typeIndex = Math.floor(Math.random() * 2);
      const contractUrl = 'https://www.스마트컨트랙트주소.com';

      resolve({ status, name, hexCode, gradeIndex, typeIndex, contractUrl });
    }, 1000);
  });
};

export const mockPostFoodMinting = async (
  foodData: FoodDTO,
): Promise<FoodNftDTO> => {
  return new Promise<FoodNftDTO>((resolve) => {
    setTimeout(() => {
      const tokenId = '0x12345';
      const ownerAddress = '0x98765';

      resolve({ ...foodData, tokenId, ownerAddress });
    }, 1000);
  });
};
