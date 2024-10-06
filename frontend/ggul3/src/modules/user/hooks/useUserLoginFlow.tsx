import { useNavigate } from 'react-router-dom';

import { useUserStore } from '@/modules/common/store/userStore';
import { getUserData } from '@/modules/common/apis/userApis';
import { requestPermission } from '@/modules/common/hooks/useFcmRegistration';
import { PathNames } from '@/router';

/**
 * 로그인 후 실행되는 흐름을 정의한 커스텀 훅
 * @returns {executeAfterLoginFlow} 로그인 후 실행되는 흐름
 *
 */
export const useUserLoginFlow = () => {
  const navigate = useNavigate();

  const { setUser, setIsLoggedIn } = useUserStore();
  //   const { setBankAccount } = useBankAccountStore();

  const executeAfterLoginFlow = async () => {
    // 유저 데이터 가져오기
    const userData = await getUserData();
    // const mainBankAccount = await getMainBankAccount();

    // 유저 데이터 상태에 저장
    setUser(userData);
    setIsLoggedIn(true);

    // setBankAccount(mainBankAccount);

    // fcm 등록
    await requestPermission();

    navigate(PathNames.MYPAGE.MAIN.path);
  };

  return { executeAfterLoginFlow };
};
