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
import { login } from '../../apis/login';

import { PathNames } from '@/router';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { createBankApi } from '@/modules/common/apis/bankApis';

interface SignUpVerifyEmailProps {
  email: string;
  emailValidation: string;
  nickname: string;
  password: string;
  setEmailValidation: (emailValidation: string) => void;
  setStep: (step: string) => void;
}

export const SignUpVerifyEmail = ({
  email,
  emailValidation,
  nickname,
  password,
  setStep,
  setEmailValidation,
}: SignUpVerifyEmailProps) => {
  const handleSubmitVerify = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (!(await verifyEmail({ email, number: emailValidation })).isValid) {
        return;
      }

      await signUp({ email, nickname, password });
      await login({ email, password }); // 로그인 해야만 계좌 API 생성 가능함.
      await createBankApi(); // 계정과 일치하는 은행 API 생성

      // 그렇다면 createBankApi() 함수 실행 실패 시,
      // 회원가입을 탈퇴해야 하는가?? 더 나은 방법 없을까요??

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
