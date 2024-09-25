import AccountBookHistory from '../components/AccountBookHistory';
import { AccountBookHistoryHeader } from '../components/AccountBookHistoryHeader';

import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { NotificationButton } from '@/modules/common/components/NotificationButton/NotificationButton';

export const AccountBookHistoryPage = () => {
  return (
    <>
      <TopBar
        bgColor="bg-primary"
        center={<NavTitle />}
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

function NavTitle() {
  return <p className="text-lg text-white">거래 내역</p>;
}
