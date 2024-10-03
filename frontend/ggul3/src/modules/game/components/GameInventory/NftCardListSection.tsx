import { Tabs, Tab } from '@nextui-org/react';
import { useEffect } from 'react';

import { SkeletonCards } from './SkeletonCard';
import { NftMiniCard } from './NftMiniCard';

import { EquipmentNFTDTO } from '@/modules/game/@types';

interface NftCardListSectionProps {
  activeGradeIndex: string;
  setActiveGradeIndex: (index: '0' | '1' | '2' | '3' | '4') => void;
  equipmentList: EquipmentNFTDTO[];
  isLoading: boolean;
  onCardClick: (equipmentNft: EquipmentNFTDTO) => void;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
  equippedNft?: EquipmentNFTDTO;
}

export const NftCardListSection = ({
  activeGradeIndex,
  setActiveGradeIndex,
  equipmentList,
  isLoading,
  onCardClick,
  scrollContainerRef,
  equippedNft,
}: NftCardListSectionProps) => {
  useEffect(() => {
    console.log('equipmentList:', equipmentList);
  }, []);

  return (
    <div
      ref={scrollContainerRef}
      className="CONTENT-SECTION-BOTTOM flex w-full flex-col items-center overflow-y-auto rounded-t-2xl bg-default-800"
    >
      <div className="BOTTOM-TITLE sticky top-0 z-20 mb-3 flex w-full flex-col gap-2 bg-default-800 px-3 pb-3 pt-4">
        <p className="TITLE text-xl font-semibold text-white">NFT 장비 가방</p>
      </div>
      <div className="DESCRIPTION mb-3 w-full px-3 text-sm text-default-300">
        <p>조리한 NFT 장비가 이곳에 저장되어,</p>
        <p> 언제든 장착할 수 있어요.</p>
      </div>
      <Tabs
        aria-label="NFT Grade Tabs"
        radius="full"
        selectedKey={activeGradeIndex}
        onSelectionChange={(key) =>
          setActiveGradeIndex(key as '0' | '1' | '2' | '3' | '4')
        }
      >
        <Tab key="0" title="매우 희귀" />
        <Tab key="1" title="희귀" />
        <Tab key="2" title="보통" />
        <Tab key="3" title="흔함" />
        <Tab key="4" title="매우 흔함" />
      </Tabs>
      <div className="CARD-LIST mt-4 grid min-h-36 grid-cols-3 gap-4 px-3 py-4">
        {isLoading ? (
          <SkeletonCards count={6} />
        ) : (
          equipmentList.map((equipmentNft, index) => (
            <NftMiniCard
              key={index}
              equipmentNft={equipmentNft}
              isEquipped={equippedNft?.ipfsCID === equipmentNft.ipfsCID}
              onCardClick={onCardClick}
            />
          ))
        )}
      </div>
    </div>
  );
};
