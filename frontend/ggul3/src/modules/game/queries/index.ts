import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { EquipmentNFTDTO } from '../@types/new_index';
import { getEquipmentList, getEquippedEquipment } from '../apis/index_new';

export const useEquippedEquipmentNftQuery =
  (): UseQueryResult<EquipmentNFTDTO> => {
    return useQuery<EquipmentNFTDTO>({
      queryKey: ['equippedEquipmentNft'],
      queryFn: getEquippedEquipment,
    });
  };

export const useEquipmentNftListQuery = (
  minPower: number,
  maxPower: number,
): UseQueryResult<EquipmentNFTDTO[]> => {
  return useQuery<EquipmentNFTDTO[]>({
    queryKey: ['equipmentNftList', minPower, maxPower],
    queryFn: () => getEquipmentList(minPower, maxPower),
  });
};
