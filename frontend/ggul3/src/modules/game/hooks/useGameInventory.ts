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

  const powerRanges = {
    0: { minPower: 800, maxPower: 999 },
    1: { minPower: 600, maxPower: 799 },
    2: { minPower: 400, maxPower: 599 },
    3: { minPower: 200, maxPower: 399 },
    4: { minPower: 1, maxPower: 199 },
  };

  const { minPower, maxPower } = powerRanges[activeGradeIndex];

  const { data: equipmentList = [], isLoading: isNftsLoading } =
    useEquipmentListQuery(minPower, maxPower);

  const { data: equippedNft, isLoading: isEquippedLoading } =
    useEquippedEquipmentQuery();

  const { mutate: equipEquipment } = useEquipEquipmentMutation();

  const { mutate: unequipEquipment } = useUnequipEquipmentMutation();

  const openSheet = useCallback((equipmentNft: EquipmentNFTDTO) => {
    setSelectedEquipmentNft(equipmentNft);
    setOpen(true);
  }, []);

  const handleEquip = () => {
    if (!selectedEquipmentNft) return;
    setIsLoadingEquip(true);

    const isChangingEquipment = equippedNft !== null;

    equipEquipment(
      { ipfsCID: selectedEquipmentNft.ipfsCID },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['equippedEquipment'] });
          queryClient.invalidateQueries({ queryKey: ['equipmentList'] });
          setOpen(false);
          setIsLoadingEquip(false);

          if (isChangingEquipment) {
            toast.success('모인 껄을 수령했어요!');
          }
          toast.success('새로운 게임이 시작되었어요!');

          scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
        },
        onError: (error) => {
          console.error('장비 장착 오류:', error);
          setIsLoadingEquip(false);
          toast.error('NFT를 장착하는데 실패했어요.');
        },
      },
    );
  };

  const handleUnequip = () => {
    if (!equippedNft) return;
    setIsLoadingUnequip(true);

    unequipEquipment(
      { ipfsCID: equippedNft.ipfsCID },
      {
        onSuccess: () => {
          queryClient.setQueryData(['equippedEquipment'], null);
          queryClient.invalidateQueries({ queryKey: ['equipmentList'] });
          setOpen(false);
          setIsLoadingUnequip(false);

          toast.success('모인 껄을 수령했어요!');
        },
        onError: (error) => {
          console.error('장비 해제 오류:', error);
          toast.error('NFT를 해제하는데 실패했어요.');
          setIsLoadingUnequip(false);
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
