import { Balance } from '../components/Balance';
import { QrButton } from '../components/QrButton';
import * as StatisticsButton from '../components/StatisticsButton';

import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { NotificationButton } from '@/modules/common/components/NotificationButton/NotificationButton';
import burnMoney from '@/assets/images/burn-money.png';
import financeChart from '@/assets/images/finance-chart.png';

export const PayPage = () => {
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
          <StatisticsButton.StatisticsButton
            buttonImageUrl={burnMoney}
            color="secondary"
            description="이번 달 지출"
            displayValue={`224,610 원`}
          />
          <StatisticsButton.StatisticsButton
            buttonImageUrl={financeChart}
            color="success"
            description="항목별 소비 통계"
            displayValue={`커피 28 회`}
          />
        </div>
      </PageContainer>
      ;
    </>
  );
};

function NavTitle() {
  return <p className="text-lg">껄 페이</p>;
}
