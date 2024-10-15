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

interface SetNewPasswordProps {
  displayErrorMessage: {
    passwordCheck: string;
  };
  email: string;
  emailValidation: string;
  setPassword: (password: string) => void;
  setPasswordCheck: (passwordCheck: string) => void;
  setStep: (step: string) => void;
  password: string;
  passwordCheck: string;
  validatePasswordCheck: () => void;
}

export const SetNewPassword = ({
  displayErrorMessage,
  email,
  emailValidation,
  setPassword,
  setPasswordCheck,
  setStep,
  password,
  passwordCheck,
  validatePasswordCheck,
}: SetNewPasswordProps) => {
  const handleSubmitNewPassword = async (e: FormEvent) => {
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
      <UserFormStyleBox submitEvent={handleSubmitNewPassword}>
        <UserLogo />
        <UserBoldParagraphBox>
          <UserBoldParagraph>
            <UserBoldSpan>새로운 비밀번호</UserBoldSpan>를 입력해주세요
          </UserBoldParagraph>
        </UserBoldParagraphBox>
        <UserInputBox>
          <UserInput
            errorMessage={displayErrorMessage.passwordCheck}
            label="새로운 비밀번호"
            setValue={setPassword}
            type="password"
            value={password}
          />
          <UserInput
            label="새로운 비밀번호 확인"
            setValue={setPasswordCheck}
            type="password"
            validate={validatePasswordCheck}
            value={passwordCheck}
          />
        </UserInputBox>
        <UserButton>비밀번호 변경하기</UserButton>
        <UserLink to={PathNames.LOGIN.path} type="bold">
          <UserBoldSpan>껄껄껄</UserBoldSpan>로그인하러 가기
        </UserLink>
      </UserFormStyleBox>
    </PageContainer>
  );
};
