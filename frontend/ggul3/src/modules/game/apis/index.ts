import {
  EquipEquipmentRequest,
  EquipmentDTO,
  EquipmentNFTDTO,
  GetEquippedEquipmentResponse,
  GetReceivableTokenResponse,
  GetSellNFTListParams,
  GetSellNFTListResponse,
  MintEquipmentRequest,
  MintEquipmentResponse,
  RegisterSellNFTRequest,
  RegisterSellNFTResponse,
  RemoveEquipmentRequest,
  MarketItemDTO,
  UnequipEquipmentRequest,
} from '../@types';

import { _axios } from '@/modules/common/utils/axios';

// API 엔드포인트 베이스 URL
const EQUIPMENT_BASE_URL = '/equipments';

// 장비 장착 (변경)
export const equipEquipment = async (
  request: EquipEquipmentRequest,
): Promise<void> => {
  const url = `${EQUIPMENT_BASE_URL}/equip`;

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
  const url = `${EQUIPMENT_BASE_URL}/unequip`;

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
  const url = `${EQUIPMENT_BASE_URL}?min-power=${minPower}&max-power=${maxPower}`;

  return await _axios<EquipmentNFTDTO[]>({
    method: 'GET',
    url,
  });
};

// 장비 삭제
export const removeEquipment = async (
  request: RemoveEquipmentRequest,
): Promise<void> => {
  const url = `${EQUIPMENT_BASE_URL}/remove`;

  await _axios<void>({
    method: 'POST',
    url,
    data: request,
  });
};

// 장비 NFT 발행
export const mintEquipment = async (
  request: MintEquipmentRequest,
): Promise<MintEquipmentResponse> => {
  const url = `${EQUIPMENT_BASE_URL}/mint`;

  return await _axios<MintEquipmentResponse>({
    method: 'POST',
    url,
    data: request,
  });
};

// 장비 뽑기
export const drawEquipment = async (): Promise<EquipmentDTO> => {
  const url = `${EQUIPMENT_BASE_URL}/draw`;

  return await _axios<EquipmentDTO>({
    method: 'POST',
    url,
  });
};

// 장착한 장비 조회
export const getEquippedEquipment =
  async (): Promise<GetEquippedEquipmentResponse> => {
    const url = `${EQUIPMENT_BASE_URL}/equipped`;

    return await _axios<GetEquippedEquipmentResponse>({
      method: 'GET',
      url,
    });
  };

// 전체 장비 이름 조회
export const getEquipmentNames = async (): Promise<string[]> => {
  const url = `${EQUIPMENT_BASE_URL}/names`;

  return await _axios<string[]>({
    method: 'GET',
    url,
  });
};

// ======================== 마켓 관련 API ===========

const MARKET_URL = '/markets';

// 판매 글 작성
export const registerSellNFT = async (
  request: RegisterSellNFTRequest,
): Promise<RegisterSellNFTResponse> => {
  const url = `${MARKET_URL}`;

  return await _axios<RegisterSellNFTResponse>({
    method: 'POST',
    url,
    data: request,
  });
};

// 구매하기
export const buyEquipment = async (marketId: string): Promise<void> => {
  const url = `${MARKET_URL}/${marketId}/buy`;

  await _axios<void>({
    method: 'POST',
    url,
  });
};

// 판매 글 상세 조회
export const getMarketItemDetail = async (
  marketId: string,
): Promise<MarketItemDTO> => {
  const url = `${MARKET_URL}/${marketId}`;

  return await _axios<MarketItemDTO>({
    method: 'GET',
    url,
  });
};

// 판매 글 리스트 조회
export const getSellNFTList = async (
  params: GetSellNFTListParams,
): Promise<GetSellNFTListResponse> => {
  const queryParams = new URLSearchParams();

  // 여러 검색 조건을 쿼리스트링으로 변환
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      const paramKey = key
        .replace(/^minPrice$/, 'min-price')
        .replace(/^maxPrice$/, 'max-price')
        .replace(/^minPower$/, 'min-power')
        .replace(/^maxPower$/, 'max-power')
        .replace(/^name$/, 'name');

      queryParams.append(paramKey, value.toString());
    }
  });

  const url = `${MARKET_URL}?${queryParams.toString()}`;

  return await _axios<GetSellNFTListResponse>({
    method: 'GET',
    url,
  });
};

// 판매 글 삭제(취소)
export const cancelMarketSale = async (marketId: string): Promise<void> => {
  const url = `${MARKET_URL}/${marketId}`;

  await _axios<void>({
    method: 'DELETE',
    url,
  });
};

//===================== 껄 키우기 관련 API ================

const GAME_URL = '/games';

// 현재 얻을 수 있는 껄 조회
export const getReceivableTokenAmount =
  async (): Promise<GetReceivableTokenResponse> => {
    const url = `${GAME_URL}/receive`;

    return await _axios<GetReceivableTokenResponse>({
      method: 'GET',
      url,
    });
  };

// 껄 얻기
export const receiveToken = async (): Promise<void> => {
  const url = `${GAME_URL}/receive`;

  await _axios<void>({
    method: 'POST',
    url,
  });
};

// 토큰 밸런스 조회
export const getTokenBalance = async (): Promise<{ balance: number }> => {
  const url = `/wallet/token`;

  return await _axios<{ balance: number }>({
    method: 'GET',
    url,
  });
};
