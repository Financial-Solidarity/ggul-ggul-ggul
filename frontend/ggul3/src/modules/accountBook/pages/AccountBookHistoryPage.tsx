import { AccountBookHistory, AccountBookHistoryHeader } from '../components';

import { NavTitle } from '@/modules/common/components';
import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { NotificationButton } from '@/modules/common/components/NotificationButton/NotificationButton';

export const AccountBookHistoryPage = () => {
  return (
    <>
      <TopBar
        bgColor="bg-primary"
        center={<NavTitle title="거래 내역" />}
        left={<BackButton />}
        right={<NotificationButton />}
      />
      <AccountBookHistoryHeader />
      <PageContainer>
        <AccountBookHistory />
      </PageContainer>
    </>
  );
};
