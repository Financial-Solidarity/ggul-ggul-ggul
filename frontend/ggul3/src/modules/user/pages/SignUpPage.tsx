import { SignUpForm, SignUpSuccess, SignUpVerifyEmail } from '../components';
import { useSignUpStore } from '../store/signUpStore';

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

  if (step === 'signUp') {
    return (
      <SignUpForm
        ERRORS={ERRORS}
        displayErrorMessage={displayErrorMessage}
        email={email}
        emailValidation={emailValidation}
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
        setEmailValidation={setEmailValidation}
        setStep={setStep}
      />
    );
  }

  if (step === 'success') {
    return <SignUpSuccess />;
  }
};
