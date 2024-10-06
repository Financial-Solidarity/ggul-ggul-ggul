import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import {
  UserBoldParagraph,
  UserBoldParagraphBox,
  UserBoldSpan,
  UserButton,
  UserFormStyleBox,
  UserLogo,
} from '../../user/components';

import { useUserStore } from '@/modules/common/store/userStore';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { PathNames } from '@/router';
import { useBottomBarStore } from '@/modules/common/store/useBottomBarStore';
import { getMainBankAccount } from '@/modules/common/apis/bankApis';
import { useBankAccountStore } from '@/modules/common/store/useBankAccountStore';

export const NoticeRequireBankAccount = () => {
  const navigate = useNavigate();

  const { logout } = useUserStore();
  const { setActive } = useBottomBarStore();
  const { setBankAccount } = useBankAccountStore();

  // 계좌 연동 페이지로 이동
  const handleClickConnectBankAccount = async () => {
    navigate(PathNames.ACCOUNT_BOOK.CONNECT_ACCOUNT.path);
  };

  // 로그아웃
  const handleClickLogoutButton = () => {
    logout();
    navigate(PathNames.LOGIN.path);
  };

  useEffect(() => {
    const fetchMainBankAccount = async () => {
      const mainBankAccount = await getMainBankAccount();

      if (mainBankAccount) {
        setBankAccount(mainBankAccount);
      }
    };

    fetchMainBankAccount();
  }, []);

  return (
    <PageContainer>
      <UserFormStyleBox>
        <UserLogo />
        <UserBoldParagraphBox>
          <UserBoldParagraph>회원가입이 완료되었습니다!</UserBoldParagraph>
          <UserBoldParagraph>
            <UserBoldSpan>다양한 혜택</UserBoldSpan>을 받기 위해서는
          </UserBoldParagraph>
          <UserBoldParagraph>
            <UserBoldSpan>계좌를 연결</UserBoldSpan>해야 합니다.
          </UserBoldParagraph>
        </UserBoldParagraphBox>
        <UserButton onClick={handleClickConnectBankAccount}>
          계좌 연동하기
        </UserButton>
        <UserButton color="default" onClick={handleClickLogoutButton}>
          로그아웃
        </UserButton>
      </UserFormStyleBox>
    </PageContainer>
  );
};
