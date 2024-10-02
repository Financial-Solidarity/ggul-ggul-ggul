import { useEffect } from 'react';

import { useUserStore } from '../../store/userStore';

export const SessionCheck = () => {
  const { user } = useUserStore();

  useEffect(() => {
    if (user.userId === '') {
      console.log('로그인이 필요합니다.');
    }
  }, [user]);

  return <></>;
};
