import { Dispatch, SetStateAction, useState } from 'react';

import { EquipmentDTO, EquipmentNFTDTO } from '../@types/new_index';
import { drawEquipment, mintEquipment } from '../apis/index_new';

interface UseLuckyDrawActionsProps {
  setEquipment: Dispatch<SetStateAction<EquipmentDTO | null>>;
  setNft: Dispatch<SetStateAction<EquipmentNFTDTO | null>>;
  startDrawing: () => void;
  stopDrawing: (status: number) => void;
  startMinting: () => void;
  stopMinting: () => void;
}

export const useGameLuckyDrawState = (): {
  equipment: EquipmentDTO | null;
  setEquipment: Dispatch<SetStateAction<EquipmentDTO | null>>;
  nft: EquipmentNFTDTO | null;
  setNft: Dispatch<SetStateAction<EquipmentNFTDTO | null>>;
  reset: () => void;
} => {
  const [equipment, setEquipment] = useState<EquipmentDTO | null>(null);
  const [nft, setNft] = useState<EquipmentNFTDTO | null>(null);

  const reset = () => {
    setEquipment(null);
    setNft(null);
  };

  return { equipment, setEquipment, nft, setNft, reset };
};

export const useLuckyDrawActions = ({
  setEquipment,
  setNft,
  startDrawing,
  stopDrawing,
  startMinting,
  stopMinting,
}: UseLuckyDrawActionsProps): {
  onClickLuckyDrawButton: () => Promise<void>;
  onClickMintButton: (equipment: EquipmentDTO) => Promise<void>;
} => {
  const onClickLuckyDrawButton = async () => {
    startDrawing();

    const response = await drawEquipment(); // response is EquipmentDTO

    setTimeout(() => {
      setEquipment(response); // Correctly set EquipmentDTO
      stopDrawing(response.power); // Passes power value
    }, 500);
  };

  const onClickMintButton = async (equipment: EquipmentDTO) => {
    startMinting();

    const response = await mintEquipment({
      transactionHash: equipment.transactionHash,
    });

    setTimeout(() => {
      setNft(response);
      stopMinting();
    }, 1000);
  };

  return { onClickLuckyDrawButton, onClickMintButton };
};
