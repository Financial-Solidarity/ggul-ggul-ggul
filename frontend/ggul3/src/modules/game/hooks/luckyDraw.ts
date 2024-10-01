import { Dispatch, SetStateAction, useState } from 'react';

import { FoodDTO, FoodNftDTO } from '../@types/equipment';
import { mockPostFoodLuckyDraw, mockPostFoodMinting } from '../apis';

interface UseLuckyDrawActionsProps {
  setFood: Dispatch<SetStateAction<FoodDTO | null>>;
  setNft: Dispatch<SetStateAction<FoodNftDTO | null>>;
  startDrawing: () => void;
  stopDrawing: (status: number) => void;
  startMinting: () => void;
  stopMinting: () => void;
}

export const useGameLuckyDrawState = (): {
  food: FoodDTO | null;
  setFood: Dispatch<SetStateAction<FoodDTO | null>>;
  nft: FoodNftDTO | null;
  setNft: Dispatch<SetStateAction<FoodNftDTO | null>>;
  reset: () => void;
} => {
  const [food, setFood] = useState<FoodDTO | null>(null);
  const [nft, setNft] = useState<FoodNftDTO | null>(null);

  const reset = () => {
    setFood(null);
    setNft(null);
  };

  return { food, setFood, nft, setNft, reset };
};

export const useLuckyDrawActions = ({
  setFood,
  setNft,
  startDrawing,
  stopDrawing,
  startMinting,
  stopMinting,
}: UseLuckyDrawActionsProps): {
  onClickLuckyDrawButton: () => Promise<void>;
  onClickMintButton: (food: FoodDTO) => Promise<void>;
} => {
  const onClickLuckyDrawButton = async () => {
    startDrawing();

    const response = await mockPostFoodLuckyDraw();

    setTimeout(() => {
      setFood(response);
      stopDrawing(response.status);
    }, 500);
  };

  const onClickMintButton = async (food: FoodDTO) => {
    startMinting();

    const response = await mockPostFoodMinting(food);

    setTimeout(() => {
      setNft(response);
      stopMinting();
    }, 1000);
  };

  return { onClickLuckyDrawButton, onClickMintButton };
};
