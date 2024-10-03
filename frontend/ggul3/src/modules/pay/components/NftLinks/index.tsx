import { useNavigate } from 'react-router-dom';

import { SubTitle } from '../SubTitle';

import { CardButton } from '@/modules/game/components/GameMain/CardButton';
import { PathNames } from '@/router';
import inventoryBag from '@/assets/images/inventory-bag.png';
import inventory from '@/assets/images/inventory.png';

export const NftLinks = () => {
  const navigate = useNavigate();

  return (
    <div className="pb-10">
      <SubTitle title="NFT" />
      <div className="flex gap-2 py-2">
        <CardButton
          color="bg-secondary"
          image={inventoryBag}
          title="껄 장비 인벤토리"
          type="right"
          onClick={() => navigate(PathNames.GAME.INVENTORY.path)}
        />
        <CardButton
          color="bg-primary"
          image={inventory}
          title="NFT 음식 마켓"
          type="right"
          onClick={() => navigate(PathNames.GAME.MARKET.path)}
        />
      </div>
    </div>
  );
};
