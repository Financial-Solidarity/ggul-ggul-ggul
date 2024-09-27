import { FormEvent } from 'react';

import {
  UserBoldParagraph,
  UserBoldParagraphBox,
  UserBoldSpan,
  UserButton,
  UserFormStyleBox,
  UserInput,
  UserInputBox,
  UserLink,
  UserLogo,
} from '..';
import { verifyEmail } from '../../apis/signUp';

import { PathNames } from '@/router';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';

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
    <PageContainer>
      <UserFormStyleBox submitEvent={handleSubmitEmail}>
        <UserLogo />
        <UserBoldParagraphBox>
          <UserBoldParagraph>비밀번호를 변경하기 위한</UserBoldParagraph>
          <UserBoldParagraph>
            <UserBoldSpan>이메일</UserBoldSpan>을 입력해주세요.
          </UserBoldParagraph>
        </UserBoldParagraphBox>
        <UserInputBox>
          <UserInput
            errorMessage={displayErrorMessage.email}
            label="이메일"
            setValue={setEmail}
            type="email"
            validate={validateEmail}
            value={email}
          />
        </UserInputBox>
        <UserButton>인증번호 보내기</UserButton>
        <UserLink to={PathNames.LOGIN.path} type="bold">
          <UserBoldSpan>껄껄껄</UserBoldSpan>로그인하러 가기
        </UserLink>
      </UserFormStyleBox>
    </PageContainer>
  );
};
