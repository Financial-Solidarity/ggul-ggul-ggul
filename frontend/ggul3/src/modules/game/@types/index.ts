import { Pagination } from '@types';

export type Grades = 0 | 1 | 2 | 3 | 4;
export type EquipmentStatus = 'EQUIPPED' | 'SELLING' | 'NONE';
export type MarketStatus = 'PENDING' | 'COMPLETED' | 'CANCELED';

// Equipment 타입 정의
export interface EquipmentDTO {
  adjective: string;
  name: string;
  imageUrl: string;
  power: number;
  grade: Grades;
  transactionHash: string;
  transactionUrl: string;
}

// EquipmentNFT 타입 정의
export interface EquipmentNFTDTO {
  ipfsCID: string;
  nftUrl: string;
  status: EquipmentStatus;
  equipment: EquipmentDTO;
}

// User 타입 정의
export interface UserDTO {
  username: string; // 이메일 형식
  nickname: string;
  profileImg: string;
}

// 장비 관련 공통 타입
export interface EquipmentActionRequest {
  ipfsCID: string;
}

// API 응답에서 사용될 공통 마켓 아이템 타입
export interface MarketItemDTO {
  marketId: string;
  power: number;
  grade: Grades;
  price: number;
  title: string;
  imageUrl: string;
}

// 보유한 장비 조회 API 응답 타입 (장비 리스트)
export type GetEquipmentListResponse = EquipmentNFTDTO[];

// 장비 장착 API 요청 타입 (공통화)
export type EquipEquipmentRequest = EquipmentActionRequest;

// 장비 해제 API 요청 타입 (공통화)
export type UnequipEquipmentRequest = EquipmentActionRequest;

// 장비 삭제 API 요청 타입 (공통화)
export type RemoveEquipmentRequest = EquipmentActionRequest;

// 장비 NFT 발행 API 요청 타입
export interface MintEquipmentRequest {
  transactionHash: string;
}

// 장비 NFT 발행 API 응답 타입
export interface MintEquipmentResponse extends EquipmentNFTDTO {}

// 장비 뽑기 API 응답 타입 (뽑힌 장비)
export interface DrawEquipmentResponse extends EquipmentDTO {}

// 장비 전체 이름 조회 API 응답 타입
export type GetEquipmentNamesResponse = string[];

// 장매 판매 취소 API 요청 타입
export interface CancelMarketSaleRequest {
  marketId: string;
}

// 장비 구매 API 요청 및 응답 타입
export interface BuyEquipmentRequest {
  marketId: string;
}
export interface BuyEquipmentResponse {
  message: string; // 장비 구매 성공 여부 메시지
}

// 장비 매물 목록 조회 요청 파라미터 타입
export interface GetMarketListParams {
  page: number;
  size: number;
  minPower?: number;
  maxPower?: number;
  minPrice?: number;
  maxPrice?: number;
  name?: string;
  own?: 'true' | 'false'; // 전체, 내 판매글만, 내걸 제외한 글만
}

// 장비 매물 목록 조회 응답 타입
export interface GetMarketListResponse {
  content: MarketItemDTO[];
  pageable: Pagination;
}

// 장비 매물 조회 API 요청 및 응답 타입
export interface GetMarketItemRequest {
  marketId: string;
}

export interface GetMarketItemResponse {
  equipmentNFT: EquipmentNFTDTO;
  seller: UserDTO;
  buyer: UserDTO | null;
  title: string;
  description: string;
  price: number;
  createdAt: string;
  completedAt: string | null;
  status: MarketStatus; // e.g., "PENDING" <- 정확히 알아내서 타입 정의하기@@@
}

// 판매 글 작성 요청 및 응답 타입
export interface RegisterSellNFTRequest {
  ipfsCID: string;
  title: string;
  description: string;
  price: number;
}
export interface RegisterSellNFTResponse {
  marketId: string;
}

// 판매 글 리스트 조회 요청 파라미터 및 응답 타입
export type GetSellNFTListParams = GetMarketListParams; // 요청 파라미터 공통화
export interface GetSellNFTListResponse {
  content: MarketItemDTO[];
  pageable: Pagination;
}

// 장비 해제 API 응답 타입
export interface UnequipEquipmentResponse {
  message: string; // 장비 해제 성공 여부 메시지
}

// 장착한 장비 조회 API 응답 타입
export interface GetEquippedEquipmentResponse extends EquipmentNFTDTO {}

// =================껄지갑============================
// 현재 토큰 개수 조회 응답 타입
export interface GetTokenBalanceResponse {
  balance: number;
}

// =============== 껄 키우기 게임 ======================
// 현재 누적 얻을 수 있는 껄 조회
export interface GetReceivableTokenResponse {
  receivableToken: number;
  lastReceivedAt: string;
}

// ============ 컬러 코드 정의 ============
export const HexCodesByGrade: Record<Grades, string> = {
  0: '#D3D3D3',
  1: '#87CEEB',
  2: '#CD7F32',
  3: '#BC75FF',
  4: '#FFD700',
};

export const GradeNames: Record<Grades, string> = {
  0: '매우 희귀',
  1: '희귀',
  2: '보통',
  3: '흔함',
  4: '매우 흔함',
};
