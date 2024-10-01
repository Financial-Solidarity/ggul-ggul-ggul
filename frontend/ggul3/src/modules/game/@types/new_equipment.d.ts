export type Grade = 0 | 1 | 2 | 3 | 4;
export type StatusRange = 1 | 999;

// 0~1000, 20간격으로 가격목록 items 생성
export const PRICE_LIST = Array.from({ length: 21 }, (_, index) => index * 50);

export interface EquipmentDTO {
  adjective: string;
  name: string;
  imageUrl: string;
  power: number;
  grade: Grade;
  hexCode: string;
  transactionHash: string;
  status: 'EQUIPPED' | 'SELLING' | 'NONE';
}

// NFT Data
export interface NFTDTO {
  ipfsCID: string;
  nftUrl: string;
}

export interface EquipmentNFTDTO {
  NFT: NFTDTO;
  equipment: EquipmentDTO;
}

export interface SaleDTO {
  title: string;
  description: string;
  price: (typeof PRICE_LIST)[number];
  createdAt: string;
}

export interface UserDTO {
  username: string;
  nickname: string;
  profileImage: string;
}

export interface SellNFTDTO {
  sale: SaleDTO;
  equipment: EquipmentDTO;
  nft: NFTDTO;
  seller: UserDTO;
}
