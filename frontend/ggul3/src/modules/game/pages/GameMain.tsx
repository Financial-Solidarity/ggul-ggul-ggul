import { useNavigate } from 'react-router-dom';

import { CardButton } from '../components/GameMain/CardButton';
import { GlowingCard } from '../components/GameMain/GlowingCardButton';

import gameGame from '@/assets/images/game_game.png';
import gameInventory from '@/assets/images/game_inventory.png';
import gameMarket from '@/assets/images/game_market.png';
import gameBox from '@/assets/images/game_box.png';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { NotificationButton } from '@/modules/common/components/NotificationButton/NotificationButton';
import { useSetBottomBar } from '@/modules/common/hooks/useSetBottomBar';
import { PathNames } from '@/router';

export const GameMain = () => {
  const navigate = useNavigate();

  useSetBottomBar({ active: true, isDarkMode: true });

  return (
    <>
      <TopBar
        bgColor="bg-black"
        left={<BackButton />}
        right={<NotificationButton />}
      />
      <PageContainer
        bgColor="bg-black"
        titleContent={
          <p className="text-2xl font-semibold text-white">게임 메인</p>
        }
      >
        <div className="TOP-SECTION mt-12 flex gap-2">
          <CardButton
            color="bg-success"
            description="음식을 먹어 껄을 얻어요"
            image={gameGame}
            title="껄 키우기"
            type="left"
            onClick={() => navigate(PathNames.GAME.GAME.path)}
          />
          <div className="flex flex-col gap-2">
            <CardButton
              color="bg-primary"
              image={gameInventory}
              title="NFT 음식 가방"
              type="right"
              onClick={() => navigate(PathNames.GAME.INVENTORY.path)}
            />
            <CardButton
              color="bg-secondary"
              image={gameMarket}
              title="NFT 음식 마켓"
              type="right"
              onClick={() => navigate(PathNames.GAME.MARKET.path)}
            />
          </div>
        </div>
        <GlowingCard
          boxImage={gameBox}
          description="나만의 NFT 음식을 뽑아보세요."
          title="껄 음식 뽑으러가기"
          onClick={() => navigate(PathNames.GAME.LUCKYDRAW.path)}
        />
      </PageContainer>
    </>
  );
};
