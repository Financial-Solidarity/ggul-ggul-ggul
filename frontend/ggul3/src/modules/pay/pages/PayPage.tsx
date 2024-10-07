import { useEffect } from 'react';

import {
  GgulLinks,
  GgulPoint,
  GgulWallet,
  PrizeHistory,
  Roulette,
} from '../components';
import { useWalletStore } from '../store/walletStore';

import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { QrButton } from '@/modules/accountBook/components';
import { NavTitle } from '@/modules/common/components';

export const PayPage = () => {
  const { getMyGgulToken } = useWalletStore();

  useEffect(() => {
    getMyGgulToken();
  }, []);

  return (
    <>
      <TopBar
        center={<NavTitle title="껄 페이" />}
        left={<BackButton color="black" />}
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
