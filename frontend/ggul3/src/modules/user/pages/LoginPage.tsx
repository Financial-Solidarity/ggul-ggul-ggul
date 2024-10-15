import { LoginForm } from '../components';
import { useLoginStore } from '../store/loginStore';

import { useHideAndRestoreBottomBar } from '@/modules/common/hooks/useHideAndRestoreBottomBar';

export const LoginPage = () => {
  const {
    email,
    password,
    displayErrorMessage,
    setEmail,
    setPassword,
    validateEmail,
  } = useLoginStore();

  useHideAndRestoreBottomBar();

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
