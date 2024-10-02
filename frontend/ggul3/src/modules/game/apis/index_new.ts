import { Pagination } from '@types';

import {
  EquipEquipmentRequest,
  EquipmentDTO,
  EquipmentNFTDTO,
  MintEquipmentRequest,
  RegisterSellNFTRequest,
  RemoveEquipmentRequest,
  SellNFTDTO,
  UnequipEquipmentRequest,
} from '../@types/new_index';

import { _axios } from '@/modules/common/utils/axios';

// API 엔드포인트 베이스 URL
const BASE_URL = '/equipments';

// 장비 장착 (변경)
export const equipEquipment = async (
  request: EquipEquipmentRequest,
): Promise<void> => {
  const url = `${BASE_URL}/equip`;

  await _axios<void>({
    method: 'PUT',
    url,
    data: request,
  });
};

// 장비 해제
export const unequipEquipment = async (
  request: UnequipEquipmentRequest,
): Promise<void> => {
  const url = `${BASE_URL}/unequip`;

  await _axios<void>({
    method: 'PUT',
    url,
    data: request,
  });
};

// 보유한 장비 조회
export const getEquipmentList = async (
  minPower: number,
  maxPower: number,
): Promise<EquipmentNFTDTO[]> => {
  const url = `${BASE_URL}?min-power=${minPower}&max-power=${maxPower}`;

  return await _axios<EquipmentNFTDTO[]>({
    method: 'GET',
    url,
  });
};

// 장비 삭제
export const removeEquipment = async (
  request: RemoveEquipmentRequest,
): Promise<void> => {
  const url = `${BASE_URL}/remove`;

  await _axios<void>({
    method: 'POST',
    url,
    data: request,
  });
};

// 장비 NFT 발행
export const mintEquipment = async (
  request: MintEquipmentRequest,
): Promise<EquipmentNFTDTO> => {
  const url = `${BASE_URL}/mint`;

  return await _axios<EquipmentNFTDTO>({
    method: 'POST',
    url,
    data: request,
  });
};

// 장비 뽑기
export const drawEquipment = async (): Promise<EquipmentDTO> => {
  const url = `${BASE_URL}/draw`;

  return await _axios<EquipmentDTO>({
    method: 'POST',
    url,
  });
};

// 장착한 장비 조회
export const getEquippedEquipment = async (): Promise<EquipmentNFTDTO> => {
  const url = `${BASE_URL}/equipped`;

  return await _axios<EquipmentNFTDTO>({
    method: 'GET',
    url,
  });
};

// ======================== 마켓 임시 ===========

// API 엔드포인트 베이스 URL
const MARKET_URL = '/market';

// 1. 판매 글 작성
export const registerSellNFT = async (
  request: RegisterSellNFTRequest,
): Promise<void> => {
  const url = `${MARKET_URL}/sell`;

  await _axios<void>({
    method: 'POST',
    url,
    data: request,
  });
};

// 2. 판매 글 조회
export const getSellNFTDetail = async (
  ipfsCID: string,
): Promise<SellNFTDTO> => {
  const url = `${MARKET_URL}/sell/${ipfsCID}`;

  return await _axios<SellNFTDTO>({
    method: 'GET',
    url,
  });
};

// 3. 판매 글 리스트 조회
interface GetSellNFTListParams {
  pageNumber?: number;
  pageSize?: number;
  minPrice?: number;
  maxPrice?: number;
  minPower?: number;
  maxPower?: number;
  keyword?: string;
  grade?: 0 | 1 | 2 | 3 | 4;
}

// 응답 타입 정의
interface GetSellNFTListResponse extends Pagination {
  content: SellNFTDTO[];
}

export const getSellNFTList = async (
  params: GetSellNFTListParams,
): Promise<GetSellNFTListResponse> => {
  // 파라미터를 query string으로 변환
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.append(key, value.toString());
    }
  });

  const url = `${MARKET_URL}/sells?${queryParams.toString()}`;

  return await _axios<GetSellNFTListResponse>({
    method: 'GET',
    url,
  });
};

// 4. 판매 글 수정
export const updateSellNFT = async (
  ipfsCID: string,
  updatedData: RegisterSellNFTRequest,
): Promise<void> => {
  const url = `${MARKET_URL}/sell/${ipfsCID}`;

  await _axios<void>({
    method: 'PUT',
    url,
    data: updatedData,
  });
};

// 5. 판매 글 삭제
export const deleteSellNFT = async (ipfsCID: string): Promise<void> => {
  const url = `${MARKET_URL}/sell/${ipfsCID}`;

  await _axios<void>({
    method: 'DELETE',
    url,
  });
};
