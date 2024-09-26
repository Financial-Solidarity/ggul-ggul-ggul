import { FormEvent } from 'react';

import {
  UserBoldParagraph,
  UserBoldSpan,
  UserButton,
  UserInput,
  UserLink,
  UserLogo,
} from '../components';
import { useFindPasswordStore } from '../store/findPasswordStore';
import { verifyEmail } from '../apis/signUp';

import { PathNames } from '@/router';

export const FindPasswordPage = () => {
  const {
    step,
    email,
    password,
    passwordCheck,
    emailValidation,
    displayErrorMessage,
    ERRORS,
    setEmail,
    setStep,
    setPassword,
    setPasswordCheck,
    setEmailValidation,
    validatePasswordCheck,
    validateEmail,
  } = useFindPasswordStore();

  const handleSubmitEmail = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (
        emailValidation ==
        (await verifyEmail({ email, number: emailValidation })).isValid
      ) {
        setStep('success');

        return;
      }
    } catch (error) {
      window.alert('[verifyEmail] catch error.');
    }
  };

  const handleSubmitVerify = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (
        emailValidation ==
        (await verifyEmail({ email, number: emailValidation })).isValid
      ) {
        setStep('success');

        return;
      }
    } catch (error) {
      window.alert('[verifyEmail] catch error.');
    }
  };

  const handleSubmitNewPassword = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (
        emailValidation ==
        (await verifyEmail({ email, number: emailValidation })).isValid
      ) {
        setStep('success');

        return;
      }
    } catch (error) {
      window.alert('[verifyEmail] catch error.');
    }
  };

  if (step === 'email') {
    return (
      <form
        className="flex flex-col items-center justify-center"
        onSubmit={handleSubmitEmail}
      >
        <UserLogo />
        <UserBoldParagraph>비밀번호를 변경하기 위한</UserBoldParagraph>
        <UserBoldParagraph>
          <UserBoldSpan>이메일</UserBoldSpan>을 입력해주세요.
        </UserBoldParagraph>
        <UserInput
          errorMessage={displayErrorMessage.email}
          label="이메일"
          setValue={setEmail}
          type="email"
          validate={validateEmail}
          value={email}
        />
        <UserButton>인증번호 보내기</UserButton>
        <UserLink to={PathNames.LOGIN.path} type="bold">
          <UserBoldSpan>껄껄껄</UserBoldSpan>로그인하러 가기
        </UserLink>
      </form>
    );
  }

  if (step === 'verify') {
    return (
      <form
        className="flex flex-col items-center justify-center"
        onSubmit={handleSubmitVerify}
      >
        <UserLogo />
        <UserBoldParagraph>
          <UserBoldSpan>메일함</UserBoldSpan>으로 인증 번호를 보냈습니다.
        </UserBoldParagraph>
        <UserBoldParagraph>
          비밀번호 변경 인증 번호를 입력해주세요
        </UserBoldParagraph>
        <UserInput
          label="인증번호"
          setValue={setEmailValidation}
          value={emailValidation}
        />
        <UserButton>인증하고 비밀번호 변경 하기</UserButton>
        <UserLink to={PathNames.LOGIN.path} type="bold">
          <UserBoldSpan>껄껄껄</UserBoldSpan>로그인하러 가기
        </UserLink>
      </form>
    );
  }

  if (step === 'new password') {
    return (
      <form
        className="flex flex-col items-center justify-center"
        onSubmit={handleSubmitNewPassword}
      >
        <UserLogo />
        <UserBoldParagraph>
          <UserBoldSpan>새로운 비밀번호</UserBoldSpan>를 입력해주세요
        </UserBoldParagraph>
        <UserInput
          errorMessage={displayErrorMessage.passwordCheck}
          label="새로운 비밀번호"
          setValue={setPassword}
          type="password"
          value={password}
        />
        <UserInput
          label="새로운 비밀번호 확인"
          setValue={setPasswordCheck}
          type="password"
          validate={validatePasswordCheck}
          value={passwordCheck}
        />

        <UserButton>비밀번호 변경하기</UserButton>
        <UserLink to={PathNames.LOGIN.path} type="bold">
          <UserBoldSpan>껄껄껄</UserBoldSpan>로그인하러 가기
        </UserLink>
      </form>
    );
  }
};
