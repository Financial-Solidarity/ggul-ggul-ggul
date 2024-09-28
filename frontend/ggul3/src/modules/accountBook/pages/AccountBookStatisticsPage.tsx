import {
  AccountBookHistoryHeader,
  AccountBookPieChart,
  AccountBookStatisticsCategoryList,
} from '../components';

import { NavTitle } from '@/modules/common/components';
import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { NotificationButton } from '@/modules/common/components/NotificationButton/NotificationButton';

export const AccountBookStatisticsPage = () => {
  return (
    <>
      <TopBar
        bgColor="bg-primary"
        center={<NavTitle title="소비 통계" />}
        left={<BackButton />}
        right={<NotificationButton />}
      />
      <AccountBookHistoryHeader />
      <PageContainer>
        <AccountBookPieChart data={pieData} />
        <AccountBookStatisticsCategoryList categoryList={data} />
      </PageContainer>
    </>
  );
};

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

const pieData = [
  {
    id: 'javascript',
    label: 'javascript',
    value: 430,
    color: 'hsl(67, 70%, 50%)',
  },
  {
    id: 'rust',
    label: 'rust',
    value: 49,
    color: 'hsl(251, 70%, 50%)',
  },
  {
    id: 'sass',
    label: 'sass',
    value: 343,
    color: 'hsl(344, 70%, 50%)',
  },
  {
    id: 'make',
    label: 'make',
    value: 523,
    color: 'hsl(115, 70%, 50%)',
  },
  {
    id: 'lisp',
    label: 'lisp',
    value: 43,
    color: 'hsl(8, 70%, 50%)',
  },
];
