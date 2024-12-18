import { Sheet } from 'react-modal-sheet';
import { Button, Spinner } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

import { EquipmentNFTDTO } from '../../@types';
import { EquipmentNftInfo } from '../common/EquipmentNftInfo';

import { PathNames } from '@/router';

interface NftDetailSheetProps {
  isOpen: boolean;
  selectedEquipmentNft?: EquipmentNFTDTO;
  equippedNft?: EquipmentNFTDTO | null;
  onClose: () => void;
  onEquip: () => void;
  onUnequip: () => void;
  isLoadingEquip: boolean;
  isLoadingUnequip: boolean;
}

export const NftDetailSheet = ({
  isOpen,
  selectedEquipmentNft,
  onClose,
  onEquip,
  onUnequip,
  isLoadingEquip,
  isLoadingUnequip,
}: NftDetailSheetProps) => {
  const navigate = useNavigate();

  const handleSellNft = () => {
    navigate(PathNames.GAME.SELL_CREATE.path, {
      state: { nftInfo: selectedEquipmentNft },
    });
  };

  const isEquipped = selectedEquipmentNft?.status === 'EQUIPPED';
  const isSelling = selectedEquipmentNft?.status === 'SELLING';

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
            {isSelling ? (
              <Button
                fullWidth
                className="h-12 bg-default-600 text-white"
                onClick={() => navigate(PathNames.GAME.MARKET.path)}
              >
                판매중인 NFT 보러가기
              </Button>
            ) : isEquipped ? (
              <Button
                fullWidth
                className="h-12 bg-red-500 text-white"
                onClick={onUnequip}
              >
                {isLoadingUnequip ? <Spinner color="white" /> : '장착 해제하기'}
              </Button>
            ) : (
              <>
                <Button
                  fullWidth
                  className="h-12 bg-default-500 text-white"
                  disabled={isLoadingEquip}
                  onClick={handleSellNft}
                >
                  NFT 판매하기
                </Button>
                <Button
                  fullWidth
                  className="h-12"
                  color="primary"
                  onClick={onEquip}
                >
                  {isLoadingEquip ? <Spinner color="white" /> : 'NFT 장착하기'}
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
