import {
  EquipEquipmentRequest,
  EquipmentDTO,
  EquipmentNFTDTO,
  GetReceivableTokenResponse,
  GetSellNFTListParams,
  GetSellNFTListResponse,
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

// 장비 삭제 (할거면 구현)
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

// ======================== 마켓 ( 10월 2일 합의본 ) ===========

// API 엔드포인트 베이스 URL
const MARKET_URL = '/markets';

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
  const url = `${MARKET_URL}/${ipfsCID}`;

  return await _axios<SellNFTDTO>({
    method: 'GET',
    url,
  });
};

// 3. 판매 글 리스트 조회
export const getSellNFTList = async (
  params: GetSellNFTListParams,
): Promise<GetSellNFTListResponse> => {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      // offset, limit은 그대로 사용, 나머지는 스네이크 케이스로 변환
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
// 4. 판매 글 삭제
export const deleteSellNFT = async (ipfsCID: string): Promise<void> => {
  const url = `${MARKET_URL}`;

  await _axios<void>({
    method: 'PATCH',
    url,
    data: { ipfsCID },
  });
};

// 5. 구매하기 (API 뽑히면 추가해야함)

//===================== 껄 키우기 ( 10월 2일 임시 합의본 )===============

const GAME_URL = '/games';

// 1. 얻을 수 있는 껄 조회
export const getReceivableTokenAmount =
  async (): Promise<GetReceivableTokenResponse> => {
    const url = `${GAME_URL}/receive`;

    return await _axios<GetReceivableTokenResponse>({
      method: 'GET',
      url,
    });
  };

// 2. 껄 얻기
//   => getReceiveableTokenAmount 연쇄수행해서 갱신해줘야함.
export const receiveToken = async (): Promise<void> => {
  const url = `${GAME_URL}/receive`;

  await _axios<void>({
    method: 'POST',
    url,
  });
};
