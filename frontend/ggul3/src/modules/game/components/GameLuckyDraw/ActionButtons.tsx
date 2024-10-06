import { Button } from '@nextui-org/react';

import { EquipmentDTO } from '../../@types';

interface ActionButtonsProps {
  step: string;
  equipment: EquipmentDTO | null;
  onClickLuckyDrawButton: () => void;
  onClickMintButton: (equipment: EquipmentDTO) => void;
}

export const ActionButtons = ({
  step,
  equipment,
  onClickLuckyDrawButton,
  onClickMintButton,
}: ActionButtonsProps): JSX.Element => (
  <div className="flex w-full items-center justify-center">
    <div className="absolute bottom-8 h-12 w-5/6">
      {step === 'init' && (
        <Button
          className="h-12 w-full"
          color="primary"
          style={{ boxShadow: '0px 10px 20px rgba(192, 124, 255, 0.3)' }}
          onClick={onClickLuckyDrawButton}
        >
          음식 뽑기
        </Button>
      )}
      {step === 'drawed' && (
        <div className="flex flex-row items-center justify-between gap-3">
          <Button
            className="h-12 w-full bg-default-600 text-white"
            onClick={onClickLuckyDrawButton}
          >
            새로 뽑기
          </Button>
          <Button
            className="h-12 w-full"
            color="primary"
            style={{ boxShadow: '0px 10px 20px rgba(192, 124, 255, 0.3)' }}
            onClick={() => onClickMintButton(equipment as EquipmentDTO)}
          >
            NFT 음식 조리하기
          </Button>
        </div>
      )}
      {step === 'minted' && (
        <Button
          className="h-12 w-full bg-default-600 text-white"
          style={{ boxShadow: '0px 10px 20px rgba(192, 124, 255, 0.3)' }}
          onClick={onClickLuckyDrawButton}
        >
          음식 뽑기
        </Button>
      )}
    </div>
  </div>
);
