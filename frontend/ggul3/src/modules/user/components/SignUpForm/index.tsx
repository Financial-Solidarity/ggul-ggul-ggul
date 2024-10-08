import { FormEvent } from 'react';

import {
  UserBoldSpan,
  UserButton,
  UserFormStyleBox,
  UserInput,
  UserInputBox,
  UserLink,
  UserLogo,
} from '../../components';
import {
  checkDuplicatedEmail,
  checkDuplicatedNickname,
  requestEmailVerification,
} from '../../apis/signUp';

import { PathNames } from '@/router';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';

interface SignUpFormProps {
  email: string;
  ERRORS: {
    EMAIL: string;
    DUPLICATED_EMAIL: string;
    NICKNAME: string;
    DUPLICATED_NICKNAME: string;
    PASSWORD_CHECK: string;
    EMAIL_VALIDATION: string;
  };
  nickname: string;
  password: string;
  passwordCheck: string;
  setEmail: (email: string) => void;
  setNickname: (nickname: string) => void;
  setPassword: (password: string) => void;
  setPasswordCheck: (passwordCheck: string) => void;
  setStep: (step: string) => void;
  validateEmail: () => void;
  validatePasswordCheck: () => void;
  displayErrorMessage: {
    nickname: string;
    email: string;
    passwordCheck: string;
  };
}

export const SignUpForm = ({
  ERRORS,
  displayErrorMessage,
  email,
  nickname,
  password,
  passwordCheck,
  setEmail,
  setNickname,
  setPassword,
  setPasswordCheck,
  setStep,
  validateEmail,
  validatePasswordCheck,
}: SignUpFormProps) => {
  const handleSubmitSignUp = async (e: FormEvent) => {
    e.preventDefault();

    if (
      displayErrorMessage.email ||
      displayErrorMessage.nickname ||
      displayErrorMessage.passwordCheck
    ) {
      window.alert('입력값을 확인해주세요');

      return;
    }

    try {
      // 비밀번호 확인
      if ((await checkDuplicatedEmail(email)).isDuplicated) {
        window.alert(ERRORS.DUPLICATED_EMAIL);

        return;
      }

      // 닉네임 확인
      if ((await checkDuplicatedNickname(nickname)).isDuplicated) {
        window.alert(ERRORS.DUPLICATED_NICKNAME);

        return;
      }

      // 이메일 인증 요청
      await requestEmailVerification({ email });

      setStep('verify');
    } catch (error) {
      window.alert(
        '[checkDuplicatedEmail, checkDuplicatedNickname, requestEmailVerification]: catch error.',
      );
    }
  };

  return (
    <PageContainer>
      <UserFormStyleBox submitEvent={handleSubmitSignUp}>
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
          <UserInput label="닉네임" setValue={setNickname} value={nickname} />
          <UserInput
            errorMessage={displayErrorMessage.passwordCheck}
            label="비밀번호"
            setValue={setPassword}
            type="password"
            value={password}
          />
          <UserInput
            label="비밀번호 확인"
            setValue={setPasswordCheck}
            type="password"
            validate={validatePasswordCheck}
            value={passwordCheck}
          />
        </UserInputBox>
        <UserButton>회원가입</UserButton>
        <UserLink to={PathNames.LOGIN.path} type="bold">
          <UserBoldSpan>껄껄껄</UserBoldSpan>로그인
        </UserLink>
      </UserFormStyleBox>
    </PageContainer>
  );
};