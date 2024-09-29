import { Payment } from '@types';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { AccountBookHistory, AccountBookHistoryHeader } from '../components';
import { usePaymentHistoryStore } from '../store/usePaymentHistoryStore';

import { NavTitle } from '@/modules/common/components';
import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { NotificationButton } from '@/modules/common/components/NotificationButton/NotificationButton';

export const AccountBookHistoryPage = () => {
  const {
    paymentList,
    paymentPageable,
    paymentFirst,
    paymentLast,
    paymentSize,
    paymentNumber,
    paymentNumberOfElements,
    paymentEmpty,
    setPaymentPageable,
    setPaymentList,
  } = usePaymentHistoryStore();

  // /api/payment/search?start-date=2024-09&end-date=2024-09&page=1
  const { startDate, endDate, page } = useParams<{
    startDate: string;
    endDate: string;
    page: string;
  }>();

  useEffect(() => {
    console.log('startDate, endDate, page', startDate, endDate, page);
    setPaymentList(tempPaymentList);
  }, []);

  return (
    <>
      <TopBar
        bgColor="bg-primary"
        center={<NavTitle color="white" title="거래 내역" />}
        left={<BackButton />}
        right={<NotificationButton />}
      />
      <AccountBookHistoryHeader />
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
