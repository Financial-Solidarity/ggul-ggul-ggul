import { Link } from 'react-router-dom';
import { Button } from '@nextui-org/react';

import {
  Banner,
  ChangeMainAccountLinkButton,
  LogOutButton,
  MyProfile,
} from '../components';

import {
  ChallengePaymentHistory,
  ChallengePaymentStatistics,
  ChallengeTeamSpentMoney,
} from '@/modules/challenge/components';
import { NavTitle } from '@/modules/common/components';
import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { NotificationButton } from '@/modules/common/components/NotificationButton/NotificationButton';
import { useUserStore } from '@/modules/common/store/userStore';

export const MyPage = () => {
  const { user } = useUserStore();

  if (user === null) {
    return (
      <div>
        로그인 되어 있지 않음
        <Button>
          <Link to="/login">로그인하러 가기</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <TopBar
        center={<NavTitle title="마이페이지" />}
        left={<BackButton color="black" />}
        right={<NotificationButton color="black" />}
      />
      <PageContainer>
        <div className="flex flex-col gap-3">
          <div className="mt-3">
            <MyProfile />
          </div>
          <Banner nickname={user?.nickname} />
          <ChangeMainAccountLinkButton />
          <LogOutButton />
        </div>
        <ChallengePaymentHistory />
        <ChallengePaymentStatistics />
        <ChallengeTeamSpentMoney />
      </PageContainer>
    </>
  );
};
