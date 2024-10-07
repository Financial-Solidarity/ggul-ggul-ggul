import { Tabs, Tab } from '@nextui-org/react';
import { useEffect } from 'react';

import { NftMiniCard } from './NftMiniCard';

import { EquipmentNFTDTO, Grades, GradeNames } from '@/modules/game/@types';

interface NftCardListSectionProps {
  activeGradeIndex: Grades;
  setActiveGradeIndex: (index: Grades) => void;
  equipmentList: EquipmentNFTDTO[];
  isLoading: boolean;
  onCardClick: (equipmentNft: EquipmentNFTDTO) => void;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
  equippedNft?: EquipmentNFTDTO | null;
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
        <p className="TITLE text-xl font-semibold text-white">NFT 음식 가방</p>
      </div>
      <div className="DESCRIPTION mb-3 w-full px-3 text-sm text-default-300">
        <p>조리한 NFT 음식이 이곳에 저장되어,</p>
        <p> 언제든 장착할 수 있어요.</p>
      </div>
      <Tabs
        aria-label="NFT Grade Tabs"
        radius="full"
        selectedKey={activeGradeIndex.toString()}
        onSelectionChange={(key) => setActiveGradeIndex(Number(key) as Grades)}
      >
        {Object.entries(GradeNames).map(([key, name]) => (
          <Tab key={key} title={name} />
        ))}
      </Tabs>
      <div className="CARD-LIST mt-4 grid min-h-36 grid-cols-3 gap-4 px-3 py-4">
        {equipmentList.map((equipmentNft) => (
          <NftMiniCard
            key={equipmentNft?.ipfsCID}
            equipmentNft={equipmentNft}
            isEquipped={equipmentNft.status === 'EQUIPPED'}
            onCardClick={onCardClick}
          />
        ))}
      </div>
    </div>
  );
};
