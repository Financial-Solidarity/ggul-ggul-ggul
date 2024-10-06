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
import { QrButton } from '@/modules/accountBook/components';
import { NavTitle } from '@/modules/common/components';
import { useSetBottomBar } from '@/modules/common/hooks/useSetBottomBar';

export const PayPage = () => {
  useSetBottomBar({ active: true, isDarkMode: false });

  return (
    <>
      <TopBar
        center={<NavTitle title="껄 페이" />}
        left={<BackButton color="black" />}
        right={<NotificationButton color="black" />}
      />
      <PageContainer>
        <div className="mb-3">
          <GgulPoint remainGgulToken={2250} />
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
