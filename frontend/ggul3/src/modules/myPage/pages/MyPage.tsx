import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { Banner, ChangeMainAccountLinkButton, MyProfile } from '../components';

import { NavTitle } from '@/modules/common/components';
import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { NotificationButton } from '@/modules/common/components/NotificationButton/NotificationButton';
import { useUserStore } from '@/modules/common/store/userStore';

export const MyPage = () => {
  const navigate = useNavigate();

  const { user } = useUserStore();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, []);

  return (
    <>
      <TopBar
        center={<NavTitle title="마이페이지" />}
        left={<BackButton color="black" />}
        right={<NotificationButton color="black" />}
      />
      <PageContainer>
        <div className="my-2">
          <MyProfile
            email={user.username}
            nickname={user.nickname}
            profileImg={user.profileImg}
          />
        </div>
        <div className="mb-3">
          <Banner nickname={user.nickname} />
        </div>
        <div>
          <ChangeMainAccountLinkButton />
        </div>
      </PageContainer>
    </>
  );
};
