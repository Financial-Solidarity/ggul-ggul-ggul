import { Banner, ChangeMainAccountLinkButton, MyProfile } from '../components';

import { NavTitle } from '@/modules/common/components';
import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { NotificationButton } from '@/modules/common/components/NotificationButton/NotificationButton';

export const MyPage = () => {
  return (
    <>
      <TopBar
        center={<NavTitle title="마이페이지" />}
        left={<BackButton color="black" />}
        right={<NotificationButton color="black" />}
      />
      <PageContainer>
        <div className="py-2">
          <MyProfile email="abc@gmail.com" nickname="nickname" />
        </div>
        <div className="mb-3">
          <Banner nickname={'[nickname]'} />
        </div>
        <div>
          <ChangeMainAccountLinkButton />
        </div>
      </PageContainer>
    </>
  );
};
