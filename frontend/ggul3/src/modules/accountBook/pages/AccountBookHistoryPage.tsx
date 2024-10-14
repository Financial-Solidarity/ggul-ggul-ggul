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
import { useBottomBarStore } from '@/modules/common/store/useBottomBarStore';

export const AccountBookHistoryPage = () => {
  const { paymentList, setPaymentList } = usePaymentHistoryStore();
  const { setActive } = useBottomBarStore();

  const currentDate = `${new Date().getFullYear()}-${new Date().getMonth() + 1}`;

  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParams = (params: string) => {
    return setSearchParams(params, { replace: true });
  };

  // 쿼리 파라미터 읽기
  const startDate = searchParams.get('start-date') || currentDate;
  const endDate = searchParams.get('end-date') || currentDate;

  useEffect(() => {
    setActive(true);

    const getPaymentList = async () => {
      const res = await getPaymentHistory({ startDate, endDate });

      setPaymentList(res.content);
    };

    getPaymentList();

    return () => setActive(true);
  }, [searchParams]);

  return (
    <>
      <TopBar
        bgColor="bg-primary"
        center={<NavTitle color="white" title="거래 내역" />}
        left={<BackButton />}
        right={<NotificationButton color="white" />}
      />
      <AccountBookHistoryHeader
        paymentList={paymentList}
        setSearchParams={updateSearchParams}
        startDate={startDate}
      />
      <PageContainer>
        <AccountBookHistory paymentList={paymentList} />
      </PageContainer>
    </>
  );
};
