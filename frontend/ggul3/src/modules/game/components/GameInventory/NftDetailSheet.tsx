import { Sheet } from 'react-modal-sheet';
import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

import { EquipmentNFTDTO } from '../../@types';
import { EquipmentNftInfo } from '../common/EquipmentNftInfo';

import { PathNames } from '@/router';

interface NftDetailSheetProps {
  isOpen: boolean;
  selectedEquipmentNft?: EquipmentNFTDTO;
  equippedNft?: EquipmentNFTDTO;
  onClose: () => void;
  onEquip: () => void;
  onUnequip: () => void;
}

export const NftDetailSheet = ({
  isOpen,
  selectedEquipmentNft,
  equippedNft,
  onClose,
  onEquip,
  onUnequip,
}: NftDetailSheetProps) => {
  const navigate = useNavigate();

  const handleSellNft = () => {
    navigate(PathNames.GAME.SELL_CREATE.path, {
      state: { nftInfo: selectedEquipmentNft },
    });
  };

  const isEquipped = equippedNft?.ipfsCID === selectedEquipmentNft?.ipfsCID;

  return (
    <Sheet
      detent="content-height"
      initialSnap={0}
      isOpen={isOpen}
      snapPoints={[0.9, 0.4]}
      onClose={onClose}
    >
      <Sheet.Container className="!bg-default-900 px-4">
        <Sheet.Header />
        <Sheet.Content className="mb-8 mt-12">
          <div className="px-4 pb-12">
            {selectedEquipmentNft && (
              <EquipmentNftInfo equipmentNft={selectedEquipmentNft} />
            )}
          </div>
          <div className="mt-4 flex w-full flex-row gap-3">
            {isEquipped ? (
              <Button
                fullWidth
                className="h-12 bg-red-500 text-white"
                onPress={onUnequip}
              >
                장착 해제하기
              </Button>
            ) : (
              <>
                <Button
                  fullWidth
                  className="h-12 bg-default-500 text-white"
                  onPress={handleSellNft}
                >
                  NFT 판매하기
                </Button>
                <Button
                  fullWidth
                  className="h-12"
                  color="primary"
                  onPress={onEquip}
                >
                  NFT 장착하기
                </Button>
              </>
            )}
          </div>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={onClose} />
    </Sheet>
  );
};
