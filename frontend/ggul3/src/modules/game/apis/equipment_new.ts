import axios from 'axios';

import {
  DrawEquipmentResponse,
  EquipEquipmentRequest,
  EquipmentNFTDTO,
  GetEquipmentListResponse,
  MintEquipmentRequest,
  MintEquipmentResponse,
  RemoveEquipmentRequest,
  UnequipEquipmentRequest,
} from './new_index';

// API 엔드포인트 베이스 URL
const BASE_URL = '/api/equipments';

// Session Token 추가를 위한 axios 설정
const getSessionHeader = (sessionId: string) => ({
  headers: {
    'Content-Type': 'application/json',
    SESSIONID: sessionId,
  },
});

// 장비 장착 (변경)
export const equipEquipment = async (
  sessionId: string,
  request: EquipEquipmentRequest,
): Promise<void> => {
  const url = `${BASE_URL}/equip`;

  await axios.put(url, request, getSessionHeader(sessionId));
};

// 장비 해제
export const unequipEquipment = async (
  sessionId: string,
  request: UnequipEquipmentRequest,
): Promise<void> => {
  const url = `${BASE_URL}/unequip`;

  await axios.put(url, request, getSessionHeader(sessionId));
};

// 보유한 장비 조회
export const getEquipmentList = async (
  sessionId: string,
  minPower: number,
  maxPower: number,
): Promise<GetEquipmentListResponse> => {
  const url = `${BASE_URL}?min-power=${minPower}&max-power=${maxPower}`;
  const response = await axios.get<GetEquipmentListResponse>(
    url,
    getSessionHeader(sessionId),
  );

  return response.data;
};

// 장비 삭제
export const removeEquipment = async (
  sessionId: string,
  request: RemoveEquipmentRequest,
): Promise<void> => {
  const url = `${BASE_URL}/remove`;

  await axios.post(url, request, getSessionHeader(sessionId));
};

// 장비 NFT 발행
export const mintEquipment = async (
  sessionId: string,
  request: MintEquipmentRequest,
): Promise<MintEquipmentResponse> => {
  const url = `${BASE_URL}/mint`;
  const response = await axios.post<MintEquipmentResponse>(
    url,
    request,
    getSessionHeader(sessionId),
  );

  return response.data;
};

// 장비 뽑기
export const drawEquipment = async (
  sessionId: string,
): Promise<DrawEquipmentResponse> => {
  const url = `${BASE_URL}/draw`;
  const response = await axios.post<DrawEquipmentResponse>(
    url,
    {},
    getSessionHeader(sessionId),
  );

  return response.data;
};

// 장착한 장비 조회
export const getEquippedEquipment = async (
  sessionId: string,
): Promise<EquipmentNFTDTO> => {
  const url = `${BASE_URL}/equipped`;
  const response = await axios.get<EquipmentNFTDTO>(
    url,
    getSessionHeader(sessionId),
  );

  return response.data;
};
