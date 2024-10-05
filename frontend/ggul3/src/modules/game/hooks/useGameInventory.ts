import { useRef, useState, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { EquipmentNFTDTO } from '../@types';
import {
  useEquipmentListQuery,
  useEquippedEquipmentQuery,
  useEquipEquipmentMutation,
  useUnequipEquipmentMutation,
} from '../queries';

export const useGameInventory = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isLoadingEquip, setIsLoadingEquip] = useState(false);
  const [isLoadingUnequip, setIsLoadingUnequip] = useState(false);
  const [selectedEquipmentNft, setSelectedEquipmentNft] = useState<
    EquipmentNFTDTO | undefined
  >();
  const [activeGradeIndex, setActiveGradeIndex] =
    useState<keyof typeof powerRanges>(0);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const queryClient = useQueryClient();

  // `activeGradeIndex`에 따른 `minPower`와 `maxPower` 설정
  const powerRanges = {
    0: { minPower: 800, maxPower: 999 },
    1: { minPower: 600, maxPower: 799 },
    2: { minPower: 400, maxPower: 599 },
    3: { minPower: 200, maxPower: 399 },
    4: { minPower: 1, maxPower: 199 },
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

  // 장비 장착 핸들러
  const handleEquip = () => {
    if (!selectedEquipmentNft) return;
    setIsLoadingEquip(true); // 스피너 시작

    equipEquipment(
      { ipfsCID: selectedEquipmentNft.ipfsCID },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['equippedEquipment'] });
          queryClient.invalidateQueries({ queryKey: ['equipmentList'] });
          setOpen(false);
          setIsLoadingEquip(false); // 스피너 중지

          toast.success('모인 껄을 수령했어요!');
          toast.success('새로운 게임이 시작되었어요!');

          scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
        },
        onError: (error) => {
          console.error('장비 장착 오류:', error);
          setIsLoadingEquip(false); // 스피너 중지
        },
      },
    );
  };

  // 장비 해제 핸들러
  const handleUnequip = () => {
    if (!equippedNft) return;
    setIsLoadingUnequip(true); // 스피너 시작

    unequipEquipment(
      { ipfsCID: equippedNft.ipfsCID },
      {
        onSuccess: () => {
          queryClient.setQueryData(['equippedEquipment'], null);
          queryClient.invalidateQueries({ queryKey: ['equipmentList'] });
          setOpen(false);
          setIsLoadingUnequip(false); // 스피너 중지

          toast.success('모인 껄을 수령했어요!');
        },
        onError: (error) => {
          console.error('장비 해제 오류:', error);
          setIsLoadingUnequip(false); // 스피너 중지
        },
      },
    );
  };

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
    isLoadingEquip,
    isLoadingUnequip,
  };
};
