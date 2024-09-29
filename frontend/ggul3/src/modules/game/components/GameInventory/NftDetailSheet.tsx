import { Sheet } from 'react-modal-sheet';
import { Button } from '@nextui-org/react';

import { FoodNftDTO } from '../../@types/food';
import { FoodNftInfo } from '../common/FoodNftInfo';

interface NftDetailSheetProps {
  isOpen: boolean;
  selectedFoodNft?: FoodNftDTO;
  onClose: () => void;
  onEquip: () => void;
}

export const NftDetailSheet = ({
  isOpen,
  selectedFoodNft,
  onClose,
  onEquip,
}: NftDetailSheetProps) => (
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
          {selectedFoodNft && <FoodNftInfo foodNft={selectedFoodNft} />}
        </div>
        <div className="mt-4 flex w-full flex-row gap-3">
          <Button
            fullWidth
            className="h-12 bg-default-500 text-white"
            onPress={onClose}
          >
            NFT 판매하기
          </Button>
          <Button fullWidth className="h-12" color="primary" onPress={onEquip}>
            NFT 장착하기
          </Button>
        </div>
      </Sheet.Content>
    </Sheet.Container>
    <Sheet.Backdrop onTap={onClose} />
  </Sheet>
);