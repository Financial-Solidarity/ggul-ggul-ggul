import { EquipmentNftInfo } from '../common/FoodNftInfo';

import { SkeletonGroupNumbers } from './SkeletonGroupNumbers';

import { EquipmentNFTDTO } from '@/modules/game/@types/new_index';

interface EquippedNftSectionProps {
  isLoading: boolean;
  equippedNft?: EquipmentNFTDTO;
}

export const EquippedNftSection = ({
  isLoading,
  equippedNft,
}: EquippedNftSectionProps) => (
  <div className="CONTENT-SECTION-TOP mb-8 flex h-3/5 w-full flex-col items-center justify-center gap-5 px-2">
    <div className="rounded-lg bg-zinc-600 px-2 py-1 text-center text-sm text-white">
      현재 장착중인 NFT
    </div>
    {isLoading ? (
      <SkeletonGroupNumbers />
    ) : (
      equippedNft && <EquipmentNftInfo equipmentNft={equippedNft} />
    )}
  </div>
);
