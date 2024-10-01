import { EquipmentNFTDTO } from '@/modules/game/@types/new_index';

export const filterNftsByGrade = (
  nfts: EquipmentNFTDTO[],
  gradeIndex: string,
): EquipmentNFTDTO[] => {
  return nfts.filter(
    (equipmentNft) => equipmentNft.equipment.grade.toString() === gradeIndex,
  );
};
