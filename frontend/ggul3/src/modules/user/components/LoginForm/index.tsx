import { FormEvent } from 'react';

// import { login } from '../../apis/login';
import {
  UserBoldSpan,
  UserButton,
  UserFormStyleBox,
  UserInput,
  UserInputBox,
  UserLink,
  UserLogo,
} from '../../components';
import { useUserLoginFlow } from '../../hooks/useUserLoginFlow';
import { useLoginMutation } from '../../queries/useUserQuery';

import { PathNames } from '@/router';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';

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
  const { executeAfterLoginFlow } = useUserLoginFlow();
  const { mutateAsync: login, isPending } = useLoginMutation();

  const handleSubmitLogin = async (e: FormEvent) => {
    e.preventDefault();

    await login({ email, password });
    await executeAfterLoginFlow();
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

        <UserButton isLoading={isPending}>로그인</UserButton>
        <UserLink to={PathNames.SIGNUP.path} type="bold">
          <UserBoldSpan>껄껄껄</UserBoldSpan>
          회원가입
        </UserLink>
      </UserFormStyleBox>
    </PageContainer>
  );
};
