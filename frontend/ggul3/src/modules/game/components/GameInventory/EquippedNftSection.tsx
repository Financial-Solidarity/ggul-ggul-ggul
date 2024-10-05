import { EquipmentNftInfo } from '../common/EquipmentNftInfo';

import { SkeletonGroupNumbers } from './SkeletonGroupNumbers';

import { EquipmentNFTDTO } from '@/modules/game/@types';

interface EquippedNftSectionProps {
  isLoading: boolean;
  equippedNft?: EquipmentNFTDTO | null;
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
    ) : equippedNft ? (
      <EquipmentNftInfo equipmentNft={equippedNft} />
    ) : (
      // 장착된 NFT가 없는 경우
      <div className="flex h-36 w-36 animate-popIn items-center justify-center rounded-full border-2 border-dashed border-gray-400">
        <p className="text-2xl font-semibold text-gray-400">텅</p>
      </div>
    )}
  </div>
);
