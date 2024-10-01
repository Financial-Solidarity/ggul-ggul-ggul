import { useEffect } from 'react';

import {
  AccountBookHistoryHeader,
  AccountBookPieChart,
  AccountBookStatisticsCategoryList,
} from '../components';
import { usePaymentStatisticsStore } from '../store/usePaymentStatisticsStore';

import { NavTitle } from '@/modules/common/components';
import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { NotificationButton } from '@/modules/common/components/NotificationButton/NotificationButton';

export const AccountBookStatisticsPage = () => {
  const {
    pieChartColors,
    statisticsList,
    formedStatisticsList,
    setStatisticsList,
    setFormedStatisticsList,
  } = usePaymentStatisticsStore();

  useEffect(() => {
    setStatisticsList(data);
    setFormedStatisticsList(data);
  }, []);

  return (
    <>
      <TopBar
        bgColor="bg-primary"
        center={<NavTitle color="white" title="소비 통계" />}
        left={<BackButton />}
        right={<NotificationButton />}
      />
      <AccountBookHistoryHeader />
      <PageContainer>
        <AccountBookPieChart
          data={formedStatisticsList}
          pieChartColors={pieChartColors}
        />
        <AccountBookStatisticsCategoryList categoryList={statisticsList} />
      </PageContainer>
    </>
  );
};

const data = [
  {
    label: '껄 절약 비용',
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
