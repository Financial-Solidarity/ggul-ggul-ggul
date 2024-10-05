import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { login } from '../../apis/login';
import {
  UserBoldSpan,
  UserButton,
  UserFormStyleBox,
  UserInput,
  UserInputBox,
  UserLink,
  UserLogo,
} from '../../components';

import { PathNames } from '@/router';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { useUserStore } from '@/modules/common/store/userStore';
import { getUserData } from '@/modules/common/apis/userApis';
import { requestPermission } from '@/modules/common/hooks/useFcmRegistration';

interface LoginFormProps {
  email: string;
  password: string;
  displayErrorMessage: {
    email: string;
  };
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  validateEmail: () => void;
}

export const LoginForm = ({
  email,
  password,
  displayErrorMessage,
  setEmail,
  setPassword,
  validateEmail,
}: LoginFormProps) => {
  const navigate = useNavigate();

  const { setUser } = useUserStore();

  const handleSubmitLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await login({ email, password });

      // 유저 데이터 가져오기
      const userData = await getUserData();

      console.log(userData, 'userData');

      // 유저 데이터 상태에 저장
      setUser(userData);

      navigate(PathNames.ACCOUNT_BOOK.MAIN.path);

      //fcm 등록
      await requestPermission();
    } catch (error) {
      window.alert('[login] catch error.');
    }
  };

  return (
    <PageContainer>
      <UserFormStyleBox submitEvent={handleSubmitLogin}>
        <UserLogo />
        <UserInputBox>
          <UserInput
            errorMessage={displayErrorMessage.email}
            label="이메일"
            setValue={setEmail}
            type="email"
            validate={validateEmail}
            value={email}
          />
          <UserInput
            label="비밀번호"
            setValue={setPassword}
            type="password"
            value={password}
          />
        </UserInputBox>
        <UserLink to={PathNames.FIND_PASSWORD.path} type="gray">
          비밀번호를 잊으셨나요?
        </UserLink>
        <UserButton>로그인</UserButton>
        <UserLink to={PathNames.SIGHUP.path} type="bold">
          <UserBoldSpan>껄껄껄</UserBoldSpan>
          회원가입
        </UserLink>
      </UserFormStyleBox>
    </PageContainer>
  );
};
