import { useEffect } from 'react';

import {
  GgulLinks,
  GgulPoint,
  GgulWallet,
  PrizeHistory,
  Roulette,
} from '../components';

import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { NotificationButton } from '@/modules/common/components/NotificationButton/NotificationButton';
import { useBottomBarStore } from '@/modules/common/store/useBottomBarStore';
import { QrButton } from '@/modules/accountBook/components';

export const PayPage = () => {
  const { setIsDarkMode } = useBottomBarStore();

  useEffect(() => {
    setIsDarkMode(true);
  }, []);

  return (
    <>
      <TopBar
        center={<NavTitle />}
        left={<BackButton color="black" />}
        right={<NotificationButton color="black" />}
      />
      <PageContainer>
        <div className="mb-3">
          <GgulPoint />
        </div>
        <div className="mb-3">
          <QrButton />
        </div>
        <div className="flex gap-3">
          <div className="mb-3 flex-1">
            <Roulette />
          </div>
          <div className="mb-3 flex-1">
            <GgulWallet />
          </div>
        </div>
        <div className="mb-3">
          <PrizeHistory />
        </div>
        <GgulLinks />
      </PageContainer>
    </>
  );
};

function NavTitle() {
  return <p className="text-lg">껄 페이</p>;
}
