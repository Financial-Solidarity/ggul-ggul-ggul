import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { AccountBookHistory, AccountBookHistoryHeader } from '../components';
import { usePaymentHistoryStore } from '../store/usePaymentHistoryStore';
import { getPaymentHistory } from '../apis/payment';

import { NavTitle } from '@/modules/common/components';
import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { NotificationButton } from '@/modules/common/components/NotificationButton/NotificationButton';

export const AccountBookHistoryPage = () => {
  const { paymentList, setPaymentList } = usePaymentHistoryStore();

  const currentDate = `${new Date().getFullYear()}-${new Date().getMonth() + 1}`;

  const [searchParams, setSearchParams] = useSearchParams();

  // 쿼리 파라미터 읽기
  const startDate = searchParams.get('start-date') || currentDate;
  const endDate = searchParams.get('end-date') || currentDate;

  useEffect(() => {
    const getPaymentList = async () => {
      const res = await getPaymentHistory({ startDate, endDate });

      setPaymentList(res.content);
    };

    getPaymentList();
  }, [searchParams]);

  return (
    <>
      <TopBar
        bgColor="bg-primary"
        center={<NavTitle color="white" title="거래 내역" />}
        left={<BackButton />}
        right={<NotificationButton />}
      />
      <AccountBookHistoryHeader
        paymentList={paymentList}
        setSearchParams={setSearchParams}
        startDate={startDate}
      />
      <PageContainer>
        <AccountBookHistory paymentList={paymentList} />
      </PageContainer>
    </>
  );
};
