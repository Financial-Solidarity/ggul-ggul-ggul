import { Payment } from '@types';
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
    getPaymentHistory({ startDate, endDate })
      .then((res) => {
        setPaymentList(res.content);
      })
      .catch((err) => {
        console.error(err);
        setPaymentList(tempPaymentList);
      });
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
        setSearchParams={setSearchParams}
        startDate={startDate}
      />
      <PageContainer>
        <AccountBookHistory paymentList={paymentList} />
      </PageContainer>
    </>
  );
};

const tempPaymentList: Payment[] = [
  {
    productName: '상품명',
    spentAt: '2024-05-24 06:21:22',
    money: -5000,
    label: '온라인 쇼핑',
    market: '농협 하나로 마트',
  },
  {
    productName: '상품명',
    spentAt: '2024-05-24 06:21:22',
    money: 5000,
    label: '온라인 쇼핑',
    market: '농협 하나로 마트',
  },
  {
    productName: '상품명',
    spentAt: '2024-05-24 06:21:22',
    money: -5000,
    label: '온라인 쇼핑',
    market: '농협 하나로 마트',
    spendGgulToken: 103,
  },
  {
    productName: '상품명',
    spentAt: '2024-05-24 06:21:22',
    money: 5000,
    label: '온라인 쇼핑',
    market: '농협 하나로 마트',
  },
  {
    productName: '상품명',
    spentAt: '2024-05-24 06:21:22',
    money: -5000,
    label: '온라인 쇼핑',
    market: '농협 하나로 마트',
    spendGgulToken: 100,
  },
  {
    productName: '상품명',
    spentAt: '2024-05-24 06:21:22',
    money: 5000,
    label: '온라인 쇼핑',
    market: '농협 하나로 마트',
    spendGgulToken: 100,
  },
  {
    productName: '상품명',
    spentAt: '2024-05-24 06:21:22',
    money: -5000,
    label: '온라인 쇼핑',
    market: '농협 하나로 마트',
    spendGgulToken: 100,
  },
];
