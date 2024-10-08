import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import {
  AccountBookHistoryHeader,
  AccountBookPieChart,
  AccountBookStatisticsCategoryList,
} from '../components';
import { usePaymentStatisticsStore } from '../store/usePaymentStatisticsStore';
import { getPaymentHistory, getPaymentStatistics } from '../apis/payment';
import { usePaymentHistoryStore } from '../store/usePaymentHistoryStore';

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
  const { paymentList, setPaymentList } = usePaymentHistoryStore();

  // 쿼리 파라미터 읽기
  const startDate = searchParams.get('start-date') || currentDate;
  const endDate = searchParams.get('end-date') || currentDate;

  useEffect(() => {
    getPaymentStatistics({ startDate, endDate }).then((res) => {
      setStatisticsList(res);
      setFormedStatisticsList(res);
    });

    const getPaymentList = async () => {
      const res = await getPaymentHistory({ startDate, endDate });
      const filteredContent = res.content.filter((item) => item.money > 0);

      setPaymentList(filteredContent);
    };

    getPaymentList();
  }, [searchParams]);

  return (
    <>
      <TopBar
        bgColor="bg-primary"
        center={<NavTitle color="white" title="소비 통계" />}
        left={<BackButton />}
        right={<NotificationButton color="white" />}
      />
      <AccountBookHistoryHeader
        paymentList={paymentList}
        setSearchParams={setSearchParams}
        startDate={startDate}
      />
      <div className={`${statisticsList.length && 'h-[40%]'} w-full`}>
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
