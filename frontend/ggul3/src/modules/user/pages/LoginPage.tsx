import { LoginForm } from '../components';
import { useLoginStore } from '../store/loginStore';

export const LoginPage = () => {
  const {
    email,
    password,
    displayErrorMessage,
    setEmail,
    setPassword,
    validateEmail,
  } = useLoginStore();

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
