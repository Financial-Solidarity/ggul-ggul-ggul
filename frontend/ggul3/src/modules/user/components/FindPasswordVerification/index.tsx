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
} from '../../components';
import { verifyEmail } from '../../apis/signUp';

import { PathNames } from '@/router';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';

interface FindPasswordVerificationProps {
  email: string;
  emailValidation: string;
  setStep: (step: string) => void;
  setEmailValidation: (emailValidation: string) => void;
}

export const FindPasswordVerification = ({
  email,
  emailValidation,
  setStep,
  setEmailValidation,
}: FindPasswordVerificationProps) => {
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
    <PageContainer>
      <UserFormStyleBox submitEvent={handleSubmitVerify}>
        <UserLogo />
        <UserBoldParagraphBox>
          <UserBoldParagraph>
            <UserBoldSpan>메일함</UserBoldSpan>으로 인증 번호를 보냈습니다.
          </UserBoldParagraph>
          <UserBoldParagraph>
            비밀번호 변경 인증 번호를 입력해주세요
          </UserBoldParagraph>
        </UserBoldParagraphBox>
        <UserInputBox>
          <UserInput
            label="인증번호"
            setValue={setEmailValidation}
            value={emailValidation}
          />
        </UserInputBox>
        <UserButton>인증하고 비밀번호 변경 하기</UserButton>
        <UserLink to={PathNames.LOGIN.path} type="bold">
          <UserBoldSpan>껄껄껄</UserBoldSpan>로그인하러 가기
        </UserLink>
      </UserFormStyleBox>
    </PageContainer>
  );
};
