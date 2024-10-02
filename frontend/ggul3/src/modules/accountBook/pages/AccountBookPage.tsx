import { Balance, StatisticsButton } from '../components';

import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { NotificationButton } from '@/modules/common/components/NotificationButton/NotificationButton';
import burnMoney from '@/assets/images/burn-money.png';
import financeChart from '@/assets/images/finance-chart.png';
import { PathNames } from '@/router';
import { NavTitle } from '@/modules/common/components';

export const AccountBookPage = () => {
  return (
    <>
      <TopBar
        center={<NavTitle title="가계부" />}
        left={<BackButton color="black" />}
        right={<NotificationButton color="black" />}
      />
      <PageContainer>
        <div className="mb-3">
          <Balance />
        </div>

        <div className="mb-3 flex gap-3">
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