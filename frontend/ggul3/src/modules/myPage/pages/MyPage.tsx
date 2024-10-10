import { useEffect } from 'react';

import { Banner, LogOutButton, MyProfile } from '../components';

import { NavTitle } from '@/modules/common/components';
import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { NotificationButton } from '@/modules/common/components/NotificationButton/NotificationButton';
import { useUserStore } from '@/modules/common/store/userStore';
import { useBottomBarStore } from '@/modules/common/store/useBottomBarStore';

export const MyPage = () => {
  const { user } = useUserStore();

  const { setActive } = useBottomBarStore();

  useEffect(() => {
    setActive(true);

    return () => setActive(true);
  }, []);

  return (
    <>
      <TopBar
        center={<NavTitle title="마이페이지" />}
        left={<BackButton color="black" />}
        right={<NotificationButton />}
      />
      <PageContainer>
        <div className="flex flex-col gap-3">
          <div className="mt-3">
            <MyProfile />
          </div>
          <Banner nickname={user?.nickname} />
          <LogOutButton />
        </div>
      </PageContainer>
    </>
  );
};
