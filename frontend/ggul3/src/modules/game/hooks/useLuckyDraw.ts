import { Dispatch, SetStateAction, useState } from 'react';

import { useTokenBalanceQuery } from '../queries'; // 토큰 밸런스 쿼리 추가
import { EquipmentDTO, EquipmentNFTDTO } from '../@types';
import { drawEquipment, mintEquipment } from '../apis';

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
  const { refetch: refetchTokenBalance } = useTokenBalanceQuery();

  const onClickLuckyDrawButton = async () => {
    startDrawing();

    try {
      const response = await drawEquipment();

      setTimeout(() => {
        setEquipment(response);
        stopDrawing(response.power);

        refetchTokenBalance();
      }, 500);
    } catch (error) {
      stopDrawing(0); // 뽑기 실패 시 상태 초기화
      throw new Error('Draw Equipment Error');
    }
  };

  const onClickMintButton = (equipment: EquipmentDTO): Promise<void> => {
    return new Promise((resolve, reject) => {
      startMinting();
      mintEquipment(equipment)
        .then((response) => {
          setNft(response); // 성공적으로 조리된 NFT 설정
          stopMinting();
          resolve(); // void 타입으로 resolve 처리
        })
        .catch((error) => {
          stopMinting();
          reject(error); // 에러 발생 시 reject 호출
        });
    });
  };

  return { onClickLuckyDrawButton, onClickMintButton };
};
