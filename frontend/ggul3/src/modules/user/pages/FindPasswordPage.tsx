import {
  FindPasswordVerification,
  FindPasswordWithEmail,
  SetNewPassword,
} from '../components';
import { useFindPasswordStore } from '../store/findPasswordStore';

export const FindPasswordPage = () => {
  const {
    step,
    email,
    password,
    passwordCheck,
    emailValidation,
    displayErrorMessage,
    setEmail,
    setStep,
    setPassword,
    setPasswordCheck,
    setEmailValidation,
    validatePasswordCheck,
    validateEmail,
  } = useFindPasswordStore();

  if (step === 'email') {
    return (
      <FindPasswordWithEmail
        displayErrorMessage={displayErrorMessage}
        email={email}
        emailValidation={emailValidation}
        setEmail={setEmail}
        setStep={setStep}
        validateEmail={validateEmail}
      />
    );
  }

  if (step === 'verify') {
    return (
      <FindPasswordVerification
        email={email}
        emailValidation={emailValidation}
        setEmailValidation={setEmailValidation}
        setStep={setStep}
      />
    );
  }

  if (step === 'new password') {
    return (
      <SetNewPassword
        displayErrorMessage={displayErrorMessage}
        email={email}
        emailValidation={emailValidation}
        password={password}
        passwordCheck={passwordCheck}
        setPassword={setPassword}
        setPasswordCheck={setPasswordCheck}
        setStep={setStep}
        validatePasswordCheck={validatePasswordCheck}
      />
    );
  }
};
