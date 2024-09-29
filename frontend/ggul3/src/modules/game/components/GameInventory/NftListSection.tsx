import { Tabs, Tab } from '@nextui-org/react';

import { SkeletonCards } from './SkeletonCard';
import { NftCard } from './NftCard';

import { FoodNftDTO } from '@/modules/game/@types/food';

interface NftListSectionProps {
  activeGradeIndex: string;
  setActiveGradeIndex: (index: string) => void;
  filteredNfts: FoodNftDTO[];
  isLoading: boolean;
  onCardClick: (foodNft: FoodNftDTO) => void;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
}

export const NftListSection = ({
  activeGradeIndex,
  setActiveGradeIndex,
  filteredNfts,
  isLoading,
  onCardClick,
  scrollContainerRef,
}: NftListSectionProps) => (
  <div
    ref={scrollContainerRef}
    className="CONTENT-SECTION-BOTTOM flex w-full flex-col items-center overflow-y-auto rounded-t-2xl bg-default-800"
  >
    <div className="BOTTOM-TITLE sticky top-0 z-20 mb-3 flex w-full flex-col gap-2 bg-default-800 px-3 pb-3 pt-4">
      <p className="TITLE text-xl font-semibold text-white">NFT 음식 가방</p>
    </div>
    <div className="DESCRIPTION mb-3 w-full px-3 text-sm text-default-300">
      <p>조리한 NFT 장비가 이곳에 저장되어,</p>
      <p> 언제든 장착할 수 있어요.</p>
    </div>
    <Tabs
      aria-label="NFT Grade Tabs"
      radius="full"
      selectedKey={activeGradeIndex}
      onSelectionChange={(key) => setActiveGradeIndex(key.toString())}
    >
      <Tab key="0" title="매우 희귀" />
      <Tab key="1" title="희귀" />
      <Tab key="2" title="보통" />
      <Tab key="3" title="흔함" />
      <Tab key="4" title="매우 흔함" />
    </Tabs>
    <div className="CARD-LIST mt-4 grid grid-cols-3 gap-4 px-3 py-4">
      {isLoading ? (
        <SkeletonCards count={6} />
      ) : (
        filteredNfts.map((foodNft, index) => (
          <NftCard key={index} foodNft={foodNft} onCardClick={onCardClick} />
        ))
      )}
    </div>
  </div>
);
