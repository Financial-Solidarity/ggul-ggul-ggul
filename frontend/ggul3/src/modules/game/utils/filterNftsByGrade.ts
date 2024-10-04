import { EquipmentNFTDTO } from '@/modules/game/@types';

export const filterNftsByGrade = (
  nfts: EquipmentNFTDTO[],
  gradeIndex: string,
): EquipmentNFTDTO[] => {
  return nfts.filter(
    (equipmentNft) => equipmentNft.equipment.grade.toString() === gradeIndex,
  );
};
