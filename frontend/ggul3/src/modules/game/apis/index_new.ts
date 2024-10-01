import {
  EquipEquipmentRequest,
  EquipmentNFTDTO,
  MintEquipmentRequest,
  RemoveEquipmentRequest,
  UnequipEquipmentRequest,
} from '../@types/new_index';

import { _axios } from '@/modules/common/utils/axios';

// API 엔드포인트 베이스 URL
const BASE_URL = '/api/equipments';

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
export const drawEquipment = async (): Promise<EquipmentNFTDTO> => {
  const url = `${BASE_URL}/draw`;

  return await _axios<EquipmentNFTDTO>({
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
