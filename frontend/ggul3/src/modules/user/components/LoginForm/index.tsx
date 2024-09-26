import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { login } from '../../apis/login';
import {
  UserBoldSpan,
  UserButton,
  UserInput,
  UserLink,
  UserLogo,
} from '../../components';

import { PathNames } from '@/router';

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

  const handleSubmitLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await login({ email, password });

      navigate(PathNames.ACCOUNT_BOOK.MAIN.path);
    } catch (error) {
      window.alert('[login] catch error.');
    }
  };

  return (
    <form
      className="flex flex-col items-center justify-center"
      onSubmit={handleSubmitLogin}
    >
      <UserLogo />
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
      <UserLink to={PathNames.FIND_PASSWORD.path} type="gray">
        비밀번호를 잊으셨나요?
      </UserLink>
      <UserBoldSpan>
        껄껄껄 <UserButton>로그인</UserButton>
      </UserBoldSpan>
      <UserLink to={PathNames.SIGHUP.path} type="bold">
        회원가입
      </UserLink>
    </form>
  );
};
