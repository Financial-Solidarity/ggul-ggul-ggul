// Equipment 타입 정의
export interface EquipmentDTO {
  adjective: string;
  name: string;
  imageUrl: string;
  power: number;
  grade: 0 | 1 | 2 | 3 | 4; // grade는 0~4의 값으로 제한됨
  transactionHash: string;
  transactionUrl: string;
}

// EquipmentNFT 타입 정의
export interface EquipmentNFTDTO {
  ipfsCID: string;
  nftUrl: string;
  status: 'EQUIPPED' | 'SELLING' | 'NONE';
  equipment: EquipmentDTO;
}

// User 타입 정의
export interface UserDTO {
  username: string; // 이메일 형식
  nickname: string;
  profileImage: string;
}

// Sale 타입 정의
export interface SaleDTO {
  title: string;
  description: string;
  price: number;
  createdAt: string; // 날짜 형식 문자열
}

// SellNFT 타입 정의
export interface SellNFTDTO {
  sale: SaleDTO;
  ipfsCID: string;
  nftUrl: string;
  equipment: EquipmentDTO;
  seller: UserDTO;
}

// 보유한 장비 조회 API 응답 타입 (장비 리스트)
export type GetEquipmentListResponse = EquipmentNFTDTO[];

// 장비 장착 API 요청 타입
export interface EquipEquipmentRequest {
  ipfsCID: string;
}

// 장비 해제 API 요청 타입
export interface UnequipEquipmentRequest {
  ipfsCID: string;
}

// 장비 삭제 API 요청 타입
export interface RemoveEquipmentRequest {
  ipfsCID: string;
}

// 장비 NFT 발행 API 요청 타입
export interface MintEquipmentRequest {
  transactionHash: string;
}

// 장비 NFT 발행 API 응답 타입
export interface MintEquipmentResponse extends EquipmentNFTDTO {}

// 장비 뽑기 API 응답 타입 (뽑힌 장비)
export interface DrawEquipmentResponse extends EquipmentDTO {}

// =================껄지갑============================

// 현재 토큰 개수 조회 응답 타입
export interface GetTokenBalanceResponse {
  balance: number;
}
