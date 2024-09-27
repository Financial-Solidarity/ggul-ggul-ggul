import { FormEvent } from 'react';

import {
  UserBoldParagraph,
  UserBoldSpan,
  UserButton,
  UserInput,
  UserLink,
  UserLogo,
} from '..';
import { verifyEmail } from '../../apis/signUp';

import { PathNames } from '@/router';

interface FindPasswordVerificationProps {
  email: string;
  emailValidation: string;
  displayErrorMessage: {
    email: string;
  };
  setEmail: (email: string) => void;
  setStep: (step: string) => void;
  validateEmail: () => void;
}

export const FindPasswordWithEmail = ({
  displayErrorMessage,
  email,
  emailValidation,
  setEmail,
  setStep,
  validateEmail,
}: FindPasswordVerificationProps) => {
  const handleSubmitEmail = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if ((await verifyEmail({ email, number: emailValidation })).isValid) {
        setStep('success');

        return;
      }
    } catch (error) {
      window.alert('[verifyEmail] catch error.');
    }
  };

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
};
