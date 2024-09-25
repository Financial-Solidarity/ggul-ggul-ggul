import { AccountBookHistoryHeader } from '../components/AccountBookHistoryHeader';
import { AccountBookStatisticsCategoryList } from '../components/AccountBookStatisticsCategoryList';

import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { NotificationButton } from '@/modules/common/components/NotificationButton/NotificationButton';

const data = [
  {
    label: '껄 페이로 절약한 금액',
    money: 80900,
  },
  {
    label: '자동차',
    money: 70200,
  },
  {
    label: '교육/학습',
    money: 50100,
  },
  {
    label: '주거/통신',
    money: 30500,
  },
  {
    label: '카페/간식',
    money: 20800,
  },
];

export const AccountBookStatisticsPage = () => {
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
        <AccountBookStatisticsCategoryList categoryList={data} />
      </PageContainer>
    </>
  );
};

function NavTitle() {
  return <p className="text-lg text-white">거래 내역</p>;
}
