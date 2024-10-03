import { useEffect } from 'react';

import { useGameInventory } from '../hooks/useGameInventory';
import { EquippedNftSection } from '../components/GameInventory/EquippedNftSection';
import { NftCardListSection } from '../components/GameInventory/NftCardListSection';
import { NftDetailSheet } from '../components/GameInventory/NftDetailSheet';

import { useSetBottomBar } from '@/modules/common/hooks/useSetBottomBar';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { NotificationButton } from '@/modules/common/components/NotificationButton/NotificationButton';

export const GameInventory = (): JSX.Element => {
  useSetBottomBar({ active: true, isDarkMode: true });

  const {
    isOpen,
    setOpen,
    selectedEquipmentNft,
    activeGradeIndex,
    setActiveGradeIndex,
    scrollContainerRef,
    equippedNft,
    isEquippedLoading,
    equipmentList,
    isNftsLoading,
    openSheet,
    handleEquip,
    handleUnequip,
  } = useGameInventory();

  useEffect(() => {
    console.log('Updated equippedNft:', equippedNft);
    console.log('Updated equipmentList:', equipmentList);
  }, [equippedNft, equipmentList]);

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

        <NftCardListSection
          activeGradeIndex={activeGradeIndex}
          equipmentList={equipmentList}
          equippedNft={equippedNft}
          isLoading={isNftsLoading}
          scrollContainerRef={scrollContainerRef}
          setActiveGradeIndex={setActiveGradeIndex}
          onCardClick={openSheet}
        />

        <NftDetailSheet
          equippedNft={equippedNft}
          isOpen={isOpen}
          selectedEquipmentNft={selectedEquipmentNft}
          onClose={() => setOpen(false)}
          onEquip={handleEquip}
          onUnequip={handleUnequip}
        />
      </PageContainer>
    </>
  );
};
