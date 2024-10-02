import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import {
  AccountBookHistoryHeader,
  AccountBookPieChart,
  AccountBookStatisticsCategoryList,
} from '../components';
import { usePaymentStatisticsStore } from '../store/usePaymentStatisticsStore';
import { getPaymentStatistics } from '../apis/payment';

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

  const currentDate = `${new Date().getFullYear()}-${new Date().getMonth() + 1}`;

  const [searchParams, setSearchParams] = useSearchParams();

  // 쿼리 파라미터 읽기
  const startDate = searchParams.get('start-date') || currentDate;
  const endDate = searchParams.get('end-date') || currentDate;

  useEffect(() => {
    // setStatisticsList(data);
    // setFormedStatisticsList(data);
    getPaymentStatistics({ startDate, endDate })
      .then((res) => {
        setStatisticsList(res);
        setFormedStatisticsList(res);
      })
      .catch((err) => {
        console.error(err);
        setStatisticsList(data);
        setFormedStatisticsList(data);
      });
  }, [searchParams]);

  return (
    <>
      <TopBar
        bgColor="bg-primary"
        center={<NavTitle color="white" title="소비 통계" />}
        left={<BackButton />}
        right={<NotificationButton />}
      />
      <AccountBookHistoryHeader
        setSearchParams={setSearchParams}
        startDate={startDate}
      />
      <div className="h-[40%] w-full">
        <AccountBookPieChart
          data={formedStatisticsList}
          pieChartColors={pieChartColors}
        />
      </div>
      <PageContainer>
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
