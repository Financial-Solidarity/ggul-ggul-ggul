import { useNavigate } from 'react-router-dom';

import { useUserStore } from '@/modules/common/store/userStore';
import { getUserData } from '@/modules/common/apis/userApis';
import { requestPermission } from '@/modules/common/hooks/useFcmRegistration';
import { PathNames } from '@/router';
import { useBankAccountStore } from '@/modules/common/store/useBankAccountStore';
import {
  createAllBankAccounts,
  createBankApi,
  getAllBankAccounts,
  getMainBankAccount,
} from '@/modules/common/apis/bankApis';
import { useWalletStore } from '@/modules/pay/store/walletStore';

/**
 * 로그인 후 실행되는 흐름을 정의한 커스텀 훅
 * @returns {executeAfterLoginFlow} 로그인 후 실행되는 흐름
 */
export const useUserLoginFlow = () => {
  const navigate = useNavigate();

  const { setUser, setIsLoggedIn } = useUserStore();
  const { setBankAccount } = useBankAccountStore();
  const { getMyWallet, getMyGgulToken } = useWalletStore();

  const executeAfterLoginFlow = async () => {
    // 유저 데이터 가져오기
    const userData = await getUserData();
    const mainBankAccount = await getMainBankAccount();

    await getMyGgulToken();
    await getMyWallet();

    // 유저 데이터 상태에 저장
    setUser(userData);
    setIsLoggedIn(true);

    if (!mainBankAccount) {
      setBankAccount(null);

      // 은행 API 생성
      await createBankApi();
      const bankAccounts = await getAllBankAccounts();

      // 조회되는 계좌가 없는 경우 계좌 생성
      if (!bankAccounts) {
        await createAllBankAccounts();
      }
    } else {
      setBankAccount(mainBankAccount);
    }

    // fcm 등록
    await requestPermission();

    // 계좌가 없는 경우 계좌 연동 페이지로 이동
    if (mainBankAccount === null) {
      navigate(PathNames.ACCOUNT_BOOK.CONNECT_ACCOUNT.path);
    } else {
      navigate(PathNames.MYPAGE.MAIN.path);
    }
  };

  return { executeAfterLoginFlow };
};
