import { FormEvent } from 'react';

import { UserLogo } from '../UserLogo';
import { UserBoldParagraph } from '../UserBoldParagraph';
import { UserBoldSpan } from '../UserBoldSpan';
import { UserInput } from '../UserInput';
import { UserButton } from '../UserButton';
import { UserLink } from '../UserLink';
import { signUp, verifyEmail } from '../../apis/signUp';
import {
  UserBoldParagraphBox,
  UserFormStyleBox,
  UserInputBox,
} from '../../components';

import { PathNames } from '@/router';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';

interface SignUpVerifyEmailProps {
  email: string;
  emailValidation: string;
  password: string;
  setEmailValidation: (emailValidation: string) => void;
  setStep: (step: string) => void;
}

export const SignUpVerifyEmail = ({
  email,
  emailValidation,
  password,
  setStep,
  setEmailValidation,
}: SignUpVerifyEmailProps) => {
  const handleSubmitVerify = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if ((await verifyEmail({ email, number: emailValidation })).isValid) {
        return;
      }

      // form 전달하고 회원가입 성공 시 success 페이지로 이동
      await signUp({ email, number: emailValidation, password });

      setStep('success');
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
            회원가입 인증 번호를 입력해주세요
          </UserBoldParagraph>
        </UserBoldParagraphBox>
        <UserInputBox>
          <UserInput
            label="인증번호"
            setValue={setEmailValidation}
            value={emailValidation}
          />
        </UserInputBox>
        <UserButton>인증하고 회원가입 하기</UserButton>
        <UserLink to={PathNames.LOGIN.path} type="bold">
          <UserBoldSpan>껄껄껄</UserBoldSpan>로그인하러 가기
        </UserLink>
      </UserFormStyleBox>
    </PageContainer>
  );
};
