import { useRef, useState, useMemo, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { filterNftsByGrade } from '../utils/filterNftsByGrade';
import { EquippedNftSection } from '../components/GameInventory/EquippedNftSection';
import { NftListSection } from '../components/GameInventory/NftListSection';
import { NftDetailSheet } from '../components/GameInventory/NftDetailSheet';
import { useEquippedFoodNftQuery, useFoodNftListQuery } from '../queries';

import { useSetBottomBar } from '@/modules/common/hooks/useSetBottomBar';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { NotificationButton } from '@/modules/common/components/NotificationButton/NotificationButton';
import { FoodNftDTO } from '@/modules/game/@types/food';

export const GameInventory = (): JSX.Element => {
  useSetBottomBar({ active: true, isDarkMode: true });

  const [isOpen, setOpen] = useState<boolean>(false);
  const [selectedFoodNft, setSelectedFoodNft] = useState<
    FoodNftDTO | undefined
  >(undefined);
  const [activeGradeIndex, setActiveGradeIndex] = useState<string>('0');

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const queryClient = useQueryClient();

  const { data: equippedNft, isLoading: isEquippedLoading } =
    useEquippedFoodNftQuery();
  const { data: foodNfts = [], isLoading: isNftsLoading } =
    useFoodNftListQuery();

  const filteredNfts = useMemo(
    () => filterNftsByGrade(foodNfts, activeGradeIndex),
    [foodNfts, activeGradeIndex],
  );

  const openSheet = useCallback((foodNft: FoodNftDTO) => {
    setSelectedFoodNft(foodNft);
    setOpen(true);
  }, []);

  const handleEquip = useCallback(() => {
    if (!selectedFoodNft) return;

    queryClient.setQueryData(['equippedFoodNft'], selectedFoodNft);
    setOpen(false);

    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedFoodNft, queryClient]);

  return (
    <>
      <TopBar
        bgColor="bg-black"
        left={<BackButton />}
        right={<NotificationButton />}
      />
      <PageContainer activePaddingX={false} bgColor="bg-black">
        <EquippedNftSection
          equippedNft={equippedNft}
          isLoading={isEquippedLoading}
        />

        <NftListSection
          activeGradeIndex={activeGradeIndex}
          filteredNfts={filteredNfts}
          isLoading={isNftsLoading}
          scrollContainerRef={scrollContainerRef}
          setActiveGradeIndex={setActiveGradeIndex}
          onCardClick={openSheet}
        />

        <NftDetailSheet
          isOpen={isOpen}
          selectedFoodNft={selectedFoodNft}
          onClose={() => setOpen(false)}
          onEquip={handleEquip}
        />
      </PageContainer>
    </>
  );
};
