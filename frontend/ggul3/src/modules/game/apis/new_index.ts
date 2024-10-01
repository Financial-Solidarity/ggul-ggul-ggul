// frontend/ggul3/src/modules/game/apis/index.ts
import { EquipmentDTO, EquipmentNFTDTO } from '../@types/equipment';

// Mock for getting equipped equipment NFT
export const mockGetEquippedEquipmentNft =
  async (): Promise<EquipmentNFTDTO> => {
    return new Promise<EquipmentNFTDTO>((resolve) => {
      setTimeout(() => {
        // Mock data for the equipped NFT
        const equippedNft = {
          ipfsCID: 'dummyCID',
          nftUrl: 'https://dummy-nft-url.com',
          equipment: {
            adjective: '신비한',
            name: '오믈렛',
            imageUrl: 'https://dummy-image-url.com/omellete.png',
            power: 200,
            grade: 2,
            hexCode: '#C9A4FF',
            transactionHash: '0xABCDE',
            status: 'EQUIPPED',
          },
        };

        resolve(equippedNft);
      }, 1000);
    });
  };

// Mock for getting a single equipment NFT
export const mockGetEquipmentNft = async (): Promise<EquipmentNFTDTO> => {
  return new Promise<EquipmentNFTDTO>((resolve) => {
    setTimeout(() => {
      const ipfsCID = 'dummyCID';
      const nftUrl = 'https://dummy-nft-url.com';
      const equipment = {
        adjective: '전설적인',
        name: '전설의 검',
        imageUrl: 'https://dummy-image-url.com/legendary-sword.png',
        power: 500,
        grade: Math.floor(Math.random() * 5),
        hexCode: '#FFD700',
        transactionHash: '0x12345',
        status: 'NONE',
      };

      resolve({ ipfsCID, nftUrl, equipment });
    }, 1000);
  });
};

// Mock for getting equipment NFT list
export const mockGetEquipmentNftList = async (): Promise<EquipmentNFTDTO[]> => {
  return new Promise<EquipmentNFTDTO[]>((resolve) => {
    setTimeout(() => {
      const grades = ['전설', '희귀', '보통', '흔함', '매우 흔함'];
      const generateNfts = (grade: number) => {
        return Array.from({ length: 10 }, (_, index) => ({
          ipfsCID: `dummyCID-${index}`,
          nftUrl: `https://dummy-nft-url.com/equipment-${index}.png`,
          equipment: {
            adjective: grades[grade],
            name: `${grades[grade]} 장비 ${index + 1}`,
            imageUrl: `https://dummy-image-url.com/${grades[grade].toLowerCase()}-${index + 1}.png`,
            power: Math.floor(Math.random() * 501),
            grade,
            hexCode: '#FFD700',
            transactionHash: `0x${Math.random().toString(16).substr(2, 8)}`,
            status: 'NONE',
          },
        }));
      };
      const data: EquipmentNFTDTO[] = [
        ...generateNfts(0), // 전설
        ...generateNfts(1), // 희귀
        ...generateNfts(2), // 보통
        ...generateNfts(3), // 흔함
        ...generateNfts(4), // 매우 흔함
      ];

      resolve(data);
    }, 1000);
  });
};

// Mock for equipment lucky draw
export const mockPostEquipmentLuckyDraw = async (): Promise<EquipmentDTO> => {
  return new Promise<EquipmentDTO>((resolve) => {
    setTimeout(() => {
      const equipment = {
        adjective: '비범한',
        name: '오믈렛',
        imageUrl: 'https://dummy-image-url.com/omellete.png',
        power: 150,
        grade: Math.floor(Math.random() * 5),
        hexCode: '#C9A4FF',
        transactionHash: '0xABCDE',
        status: 'NONE',
      };

      resolve(equipment);
    }, 1000);
  });
};

// Mock for equipment minting
export const mockPostEquipmentMinting = async (
  equipmentData: EquipmentDTO,
): Promise<EquipmentNFTDTO> => {
  return new Promise<EquipmentNFTDTO>((resolve) => {
    setTimeout(() => {
      const ipfsCID = 'mintedCID';
      const nftUrl = 'https://dummy-minted-nft-url.com';

      resolve({ ipfsCID, nftUrl, equipment: equipmentData });
    }, 1000);
  });
};
