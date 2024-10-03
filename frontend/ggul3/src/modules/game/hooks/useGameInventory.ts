import { useRef, useState, useMemo, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { filterNftsByGrade } from '../utils/filterNftsByGrade';
import { EquipmentNFTDTO } from '../@types';
import { useEquipmentListQuery, useEquippedEquipmentQuery } from '../queries';

export const useGameInventory = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [selectedEquipmentNft, setSelectedEquipmentNft] = useState<
    EquipmentNFTDTO | undefined
  >(undefined);
  const [activeGradeIndex, setActiveGradeIndex] = useState<string>('0');

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const queryClient = useQueryClient();

  // `minPower`와 `maxPower` 정의 및 사용
  const minPower = 1;
  const maxPower = 200;

  // 보유한 장비 리스트 조회 쿼리
  const { data: equipmentNfts = [], isLoading: isNftsLoading } =
    useEquipmentListQuery(minPower, maxPower);

  // 장착된 장비 조회 쿼리
  const { data: equippedNft, isLoading: isEquippedLoading } =
    useEquippedEquipmentQuery();

  // 장비 리스트를 `gradeIndex`에 따라 필터링
  const filteredNfts = useMemo(
    () => filterNftsByGrade(equipmentNfts, activeGradeIndex),
    [equipmentNfts, activeGradeIndex],
  );

  // 상세 정보를 열기 위한 함수
  const openSheet = useCallback((equipmentNft: EquipmentNFTDTO) => {
    setSelectedEquipmentNft(equipmentNft);
    setOpen(true);
  }, []);

  // 장비 장착을 처리하는 함수
  const handleEquip = useCallback(() => {
    if (!selectedEquipmentNft) return;

    queryClient.setQueryData(['equippedEquipment'], selectedEquipmentNft);
    setOpen(false);

    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedEquipmentNft, queryClient]);

  return {
    isOpen,
    setOpen,
    selectedEquipmentNft,
    setSelectedEquipmentNft,
    activeGradeIndex,
    setActiveGradeIndex,
    scrollContainerRef,
    equipmentNfts,
    isNftsLoading,
    equippedNft,
    isEquippedLoading,
    filteredNfts,
    openSheet,
    handleEquip,
  };
};
