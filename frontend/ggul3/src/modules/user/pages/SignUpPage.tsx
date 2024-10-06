import { useEffect } from 'react';

import { SignUpForm, SignUpSuccess, SignUpVerifyEmail } from '../components';
import { useSignUpStore } from '../store/signUpStore';

import { useBottomBarStore } from '@/modules/common/store/useBottomBarStore';

export const SignUpPage = () => {
  const {
    step,
    email,
    nickname,
    password,
    passwordCheck,
    emailValidation,
    displayErrorMessage,
    ERRORS,
    setEmail,
    setNickname,
    setPassword,
    setPasswordCheck,
    setStep,
    setEmailValidation,
    validateEmail,
    validatePasswordCheck,
  } = useSignUpStore();

  const { setActive } = useBottomBarStore();

  // BottomBar 숨기기
  useEffect(() => {
    setActive(false);

    return () => {
      setActive(true);
    };
  }, []);

  if (step === 'sign up') {
    return (
      <SignUpForm
        ERRORS={ERRORS}
        displayErrorMessage={displayErrorMessage}
        email={email}
        nickname={nickname}
        password={password}
        passwordCheck={passwordCheck}
        setEmail={setEmail}
        setNickname={setNickname}
        setPassword={setPassword}
        setPasswordCheck={setPasswordCheck}
        setStep={setStep}
        validateEmail={validateEmail}
        validatePasswordCheck={validatePasswordCheck}
      />
    );
  }

  if (step === 'verify') {
    return (
      <SignUpVerifyEmail
        email={email}
        emailValidation={emailValidation}
        nickname={nickname}
        password={password}
        setEmailValidation={setEmailValidation}
        setStep={setStep}
      />
    );
  }

  if (step === 'success') {
    return <SignUpSuccess />;
  }
};
