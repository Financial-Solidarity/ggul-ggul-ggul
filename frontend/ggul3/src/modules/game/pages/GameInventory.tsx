import { useRef, useState, useMemo, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { filterNftsByGrade } from '../utils/filterNftsByGrade';
import { EquippedNftSection } from '../components/GameInventory/EquippedNftSection';
import { NftListSection } from '../components/GameInventory/NftListSection';
import { NftDetailSheet } from '../components/GameInventory/NftDetailSheet';
import { EquipmentNFTDTO } from '../@types';
import {
  useEquipmentNftListQuery,
  useEquippedEquipmentNftQuery,
} from '../queries';

import { useSetBottomBar } from '@/modules/common/hooks/useSetBottomBar';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { NotificationButton } from '@/modules/common/components/NotificationButton/NotificationButton';

export const GameInventory = (): JSX.Element => {
  useSetBottomBar({ active: true, isDarkMode: true });

  const [isOpen, setOpen] = useState<boolean>(false);
  const [selectedEquipmentNft, setSelectedEquipmentNft] = useState<
    EquipmentNFTDTO | undefined
  >(undefined);
  const [activeGradeIndex, setActiveGradeIndex] = useState<string>('0');

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const queryClient = useQueryClient();

  const minPower = 1;
  const maxPower = 200;

  const { data: equippedNft, isLoading: isEquippedLoading } =
    useEquippedEquipmentNftQuery();
  const { data: equipmentNfts = [], isLoading: isNftsLoading } =
    useEquipmentNftListQuery(minPower, maxPower);

  const filteredNfts = useMemo(
    () => filterNftsByGrade(equipmentNfts, activeGradeIndex),
    [equipmentNfts, activeGradeIndex],
  );

  const openSheet = useCallback((equipmentNft: EquipmentNFTDTO) => {
    setSelectedEquipmentNft(equipmentNft);
    setOpen(true);
  }, []);

  const handleEquip = useCallback(() => {
    if (!selectedEquipmentNft) return;

    queryClient.setQueryData(['equippedEquipmentNft'], selectedEquipmentNft);
    setOpen(false);

    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedEquipmentNft, queryClient]);

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
          selectedEquipmentNft={selectedEquipmentNft}
          onClose={() => setOpen(false)}
          onEquip={handleEquip}
        />
      </PageContainer>
    </>
  );
};
