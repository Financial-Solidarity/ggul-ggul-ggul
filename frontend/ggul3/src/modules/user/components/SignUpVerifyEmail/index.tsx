import { FormEvent } from 'react';

import { UserLogo } from '../UserLogo';
import { UserBoldParagraph } from '../UserBoldParagraph';
import { UserBoldSpan } from '../UserBoldSpan';
import { UserInput } from '../UserInput';
import { UserButton } from '../UserButton';
import { UserLink } from '../UserLink';
import { verifyEmail } from '../../apis/signUp';

import { PathNames } from '@/router';

interface SignUpVerifyEmailProps {
  email: string;
  emailValidation: string;
  setEmailValidation: (emailValidation: string) => void;
  setStep: (step: string) => void;
}

export const SignUpVerifyEmail = ({
  email,
  emailValidation,
  setStep,
  setEmailValidation,
}: SignUpVerifyEmailProps) => {
  const handleSubmitVerify = async (e: FormEvent) => {
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
      onSubmit={handleSubmitVerify}
    >
      <UserLogo />
      <UserBoldParagraph>
        <UserBoldSpan>메일함</UserBoldSpan>으로 인증 번호를 보냈습니다.
      </UserBoldParagraph>
      <UserBoldParagraph>회원가입 인증 번호를 입력해주세요</UserBoldParagraph>
      <UserInput
        label="인증번호"
        setValue={setEmailValidation}
        value={emailValidation}
      />
      <UserButton>인증하고 회원가입 하기</UserButton>
      <UserLink to={PathNames.LOGIN.path} type="bold">
        <UserBoldSpan>껄껄껄</UserBoldSpan>로그인하러 가기
      </UserLink>
    </form>
  );
};
