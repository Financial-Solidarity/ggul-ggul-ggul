import { FoodDTO, FoodNftDTO } from '../@types/equipment';

export const mockGetEquippedFoodNft = async (): Promise<FoodNftDTO> => {
  return new Promise<FoodNftDTO>((resolve) => {
    setTimeout(() => {
      // Mock data for the equipped NFT
      const equippedNft = {
        status: Math.floor(Math.random() * 101),
        name: '비범한 오믈렛',
        hexCode: '#C9A4FF',
        gradeIndex: 0, // Example grade index
        typeIndex: 0,
        contractUrl: 'https://www.스마트컨트랙트주소.com',
        tokenId: '0xABCDE',
        ownerAddress: '0x1234567890ABCDEF',
      };

      resolve(equippedNft);
    }, 1000);
  });
};

export const mockGetFoodNft = async (): Promise<FoodNftDTO> => {
  return new Promise<FoodNftDTO>((resolve) => {
    setTimeout(() => {
      const status = Math.floor(Math.random() * 101);
      const name = '비범한 오믈렛';
      const hexCode = '#C9A4FF';
      const gradeIndex = Math.floor(Math.random() * 6);
      const typeIndex = Math.floor(Math.random() * 2);
      const contractUrl = 'https://www.스마트컨트랙트주소.com';
      const tokenId = '0xABCDE';
      const ownerAddress = '0x1234567890ABCDEF';

      resolve({
        status,
        name,
        hexCode,
        gradeIndex,
        typeIndex,
        contractUrl,
        tokenId,
        ownerAddress,
      });
    }, 1000);
  });
};

export const mockGetFoodNftList = async (): Promise<FoodNftDTO[]> => {
  return new Promise<FoodNftDTO[]>((resolve) => {
    setTimeout(() => {
      const generateNfts = (gradeIndex: number) => {
        const names = [
          ['전설의 피자', '왕의 스테이크', '별의 오믈렛'], // 매우 희귀
          ['고급 햄버거', '비싼 초밥', '루비 아이스크림'], // 희귀
          ['보통 떡볶이', '평범한 라면', '일반 김밥'], // 보통
          ['흔한 샌드위치', '보통 스낵', '무난한 카레'], // 흔함
          ['싸구려 과자', '저렴한 사탕', '일반 커피'], // 매우 흔함
        ];

        const hexCodes = [
          '#FFD700',
          '#BC75FF',
          '#CD7F32',
          '#87CEEB',
          '#D3D3D3',
        ];

        return Array.from({ length: 10 }, (_, index) => ({
          status: Math.floor(Math.random() * 101),
          name: names[gradeIndex][index % names[gradeIndex].length],
          hexCode: hexCodes[gradeIndex],
          gradeIndex,
          typeIndex: Math.floor(Math.random() * 5),
          contractUrl: 'https://www.스마트컨트랙트주소.com',
          tokenId: `0x${Math.random().toString(16).substr(2, 8)}`,
          ownerAddress: `0x${Math.random().toString(16).substr(2, 12)}`,
        }));
      };
      const data: FoodNftDTO[] = [
        ...generateNfts(0), // 매우 희귀
        ...generateNfts(1), // 희귀
        ...generateNfts(2), // 보통
        ...generateNfts(3), // 흔함
        ...generateNfts(4), // 매우 흔함
      ];

      resolve(data);
    }, 1000);
  });
};

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
