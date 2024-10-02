import { Pagination } from '@types';

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
  equipment: EquipmentNFTDTO;
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
// =============================마켓 ( 임시 ) ======================
// Sale 타입 정의
export interface SaleDTO {
  title: string;
  description: string;
  price: number;
  createdAt: string;
}

export interface SellNFTDTO extends SaleDTO {
  // @@@ 판매글 ID 따로 줄지 안줄지 유승이가 결정 후 알려줄 예정.
  ipfsCID: string;
  nftUrl: string;
  equipmentNFT: EquipmentNFTDTO;
  seller: UserDTO;
}

// 판매 글 작성 요청 타입
export interface RegisterSellNFTRequest {
  ipfsCID: string;
  title: string;
  description: string;
  price: number;
}

// 판매 글 리스트 조회 요청 파라미터 타입
export interface GetSellNFTListParams {
  limit: number;
  offset: number;
  minPrice?: number;
  maxPrice?: number;
  minPower?: number;
  maxPower?: number;
  name?: string;
}

// 판매 글 리스트 조회 응답 타입
export interface GetSellNFTListResponse {
  content: SellNFTDTO[];
  pagination: Pagination;
}

// =============== 껄 키우기 게임 ======================

// 현재 누적 얻을 수 있는 껄 조회
export interface GetReceivableTokenResponse {
  lastReceivedAt: string;
  receivableToken: number;
}
