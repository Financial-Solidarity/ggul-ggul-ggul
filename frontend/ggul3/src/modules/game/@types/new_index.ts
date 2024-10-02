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
  profileImg: string;
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
  ipfsCID: string; //@@@@@@@@@@@@@@ marketId로 대체될 예정
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

//@@@@@@@@@@@@@@@@@@@@ 수정본 1002 0426
// 판매 글 리스트 조회 응답 타입
export interface GetSellNFTListResponse {
  content: {
    marketId: string;
    power: number;
    price: number;
    title: string;
    imageUrl: string;
    grade: number;
  };
  pagination: Pagination;
}

// =============== 껄 키우기 게임 ======================
// 현재 누적 얻을 수 있는 껄 조회
export interface GetReceivableTokenResponse {
  receivableToken: number;
  lastReceivedTime: string;
}
