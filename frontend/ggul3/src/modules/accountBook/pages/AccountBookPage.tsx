import { QrButton } from '../components/QrButton';
import { Balance, StatisticsButton } from '../components';

import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { NotificationButton } from '@/modules/common/components/NotificationButton/NotificationButton';
import burnMoney from '@/assets/images/burn-money.png';
import financeChart from '@/assets/images/finance-chart.png';
import { PathNames } from '@/router';

export const AccountBookPage = () => {
  return (
    <>
      <TopBar
        center={<NavTitle />}
        left={<BackButton color="black" />}
        right={<NotificationButton color="black" />}
      />
      <PageContainer>
        <Balance />
        <QrButton />
        <div className="flex gap-4">
          <StatisticsButton
            buttonImageUrl={burnMoney}
            color="secondary"
            description="이번 달 지출"
            displayValue={`224,610 원`}
            link={PathNames.ACCOUNT_BOOK.HISTORY.path}
          />
          <StatisticsButton
            buttonImageUrl={financeChart}
            color="success"
            description="항목별 소비 통계"
            displayValue={`커피 28 회`}
            link={PathNames.ACCOUNT_BOOK.STATISTICS.path}
          />
        </div>
      </PageContainer>
      ;
    </>
  );
};

function NavTitle() {
  return <p className="text-lg">가계부</p>;
}