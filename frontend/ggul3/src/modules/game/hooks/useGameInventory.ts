import { useRef, useState, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { EquipmentNFTDTO } from '../@types';
import {
  useEquipmentListQuery,
  useEquippedEquipmentQuery,
  useEquipEquipmentMutation,
  useUnequipEquipmentMutation,
} from '../queries';

export const useGameInventory = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [selectedEquipmentNft, setSelectedEquipmentNft] = useState<
    EquipmentNFTDTO | undefined
  >(undefined);
  const [activeGradeIndex, setActiveGradeIndex] =
    useState<keyof typeof powerRanges>('0');

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const queryClient = useQueryClient();

  // `activeGradeIndex`에 따른 `minPower`와 `maxPower` 설정
  const powerRanges = {
    '0': { minPower: 800, maxPower: 999 },
    '1': { minPower: 600, maxPower: 799 },
    '2': { minPower: 400, maxPower: 599 },
    '3': { minPower: 200, maxPower: 399 },
    '4': { minPower: 1, maxPower: 199 },
  };

  const { minPower, maxPower } = powerRanges[activeGradeIndex];

  // 보유한 장비 리스트 조회 쿼리
  const { data: equipmentList = [], isLoading: isNftsLoading } =
    useEquipmentListQuery(minPower, maxPower);

  // 장착된 장비 조회 쿼리
  const { data: equippedNft, isLoading: isEquippedLoading } =
    useEquippedEquipmentQuery();

  // 장비 장착을 위한 뮤테이션 훅
  const { mutate: equipEquipment } = useEquipEquipmentMutation();

  // 장비 해제를 위한 뮤테이션 훅
  const { mutate: unequipEquipment } = useUnequipEquipmentMutation();

  // 상세 정보를 열기 위한 함수
  const openSheet = useCallback((equipmentNft: EquipmentNFTDTO) => {
    setSelectedEquipmentNft(equipmentNft);
    setOpen(true);
  }, []);

  // 장비 장착을 처리하는 함수
  const handleEquip = useCallback(() => {
    if (!selectedEquipmentNft) return;

    equipEquipment(
      { ipfsCID: selectedEquipmentNft.ipfsCID },
      {
        onSuccess: () => {
          queryClient.setQueryData(['equippedEquipment'], selectedEquipmentNft);
          setOpen(false);

          scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
        },
        onError: (error) => {
          console.error('장비 장착 오류:', error);
        },
      },
    );
  }, [selectedEquipmentNft, equipEquipment, queryClient]);

  const handleUnequip = useCallback(() => {
    if (!equippedNft) return;

    unequipEquipment(
      { ipfsCID: equippedNft.ipfsCID },
      {
        onSuccess: () => {
          // 캐시 무효화 후 강제 재요청
          queryClient.invalidateQueries({ queryKey: ['equippedEquipment'] });
          queryClient.invalidateQueries({
            queryKey: ['equipmentList', minPower, maxPower],
          });
          setOpen(false);
        },
        onError: (error) => {
          console.error('장비 해제 오류:', error);
        },
      },
    );
  }, [equippedNft, unequipEquipment, queryClient, minPower, maxPower]);

  return {
    isOpen,
    setOpen,
    selectedEquipmentNft,
    setSelectedEquipmentNft,
    activeGradeIndex,
    setActiveGradeIndex,
    scrollContainerRef,
    equipmentList,
    isNftsLoading,
    equippedNft,
    isEquippedLoading,
    openSheet,
    handleEquip,
    handleUnequip,
  };
};
