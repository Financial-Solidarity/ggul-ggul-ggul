import { useEffect } from 'react';

import { SignUpForm, SignUpSuccess, SignUpVerifyEmail } from '../components';
import { useSignUpStore } from '../store/signUpStore';

import { useBankAccountStore } from '@/modules/common/store/useBankAccountStore';
import { useHideAndRestoreBottomBar } from '@/modules/common/hooks/useHideAndRestoreBottomBar';
import { useUserStore } from '@/modules/common/store/userStore';

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

  useHideAndRestoreBottomBar();

  const { isLoggedIn } = useUserStore();
  const { bankAccount } = useBankAccountStore();

  useEffect(() => {
    // (로그인 상태이고, 계좌가 없을 때는) 계좌 연동 페이지로 이동
    if (isLoggedIn && bankAccount === null) {
      setStep('success');
    } else {
      setStep('sign up');
    }
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
