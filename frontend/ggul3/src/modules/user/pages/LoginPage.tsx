import { useEffect } from 'react';

import { LoginForm } from '../components';
import { useLoginStore } from '../store/loginStore';

import { useBottomBarStore } from '@/modules/common/store/useBottomBarStore';

export const LoginPage = () => {
  const {
    email,
    password,
    displayErrorMessage,
    setEmail,
    setPassword,
    validateEmail,
  } = useLoginStore();

  const { setActive } = useBottomBarStore();

  // BottomBar 숨기기
  useEffect(() => {
    setActive(false);

    return () => {
      setActive(true);
    };
  }, []);

  return (
    <LoginForm
      displayErrorMessage={displayErrorMessage}
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      validateEmail={validateEmail}
    />
  );
};
