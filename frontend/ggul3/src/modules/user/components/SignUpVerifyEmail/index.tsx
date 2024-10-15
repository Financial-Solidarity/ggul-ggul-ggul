import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserLogo } from '../UserLogo';
import { UserBoldParagraph } from '../UserBoldParagraph';
import { UserBoldSpan } from '../UserBoldSpan';
import { UserInput } from '../UserInput';
import { UserButton } from '../UserButton';
import { UserLink } from '../UserLink';
import {
  UserBoldParagraphBox,
  UserFormStyleBox,
  UserInputBox,
} from '../../components';
import {
  useLoginMutation,
  useSignUpMutation,
  useVerifyEmailMutation,
} from '../../queries/useUserQuery';

import { PathNames } from '@/router';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import {
  useCreateAllBankAccountsMutation,
  useCreateBankApiMutation,
} from '@/modules/common/reactQueries/useBankQuery';
import { executeMutationAsAsync } from '@/modules/common/utils/executeMutationAsAsync';

interface SignUpVerifyEmailProps {
  email: string;
  emailValidation: string;
  nickname: string;
  password: string;
  setEmailValidation: (emailValidation: string) => void;
}

export const SignUpVerifyEmail = ({
  email,
  emailValidation,
  nickname,
  password,
  setEmailValidation,
}: SignUpVerifyEmailProps) => {
  const navigate = useNavigate();

  const { mutate: verifyEmail, isPending: isVerifyingEmail } =
    useVerifyEmailMutation();
  const { mutate: signUp, isPending: isSigningUp } = useSignUpMutation();
  const { mutate: login, isPending: isLoggingIn } = useLoginMutation();
  const { mutate: createBankApi, isPending: isCreatingBankApi } =
    useCreateBankApiMutation();
  const {
    mutate: createAllBankAccounts,
    isPending: isCreatingAllBankAccounts,
  } = useCreateAllBankAccountsMutation();

  const handleSubmitVerify = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // 이메일 인증 확인
      const emailVerificationResult = await executeMutationAsAsync<
        { email: string; number: string },
        { isValid: boolean }
      >(verifyEmail, { email, number: emailValidation });

      if (!emailVerificationResult.isValid) {
        window.alert('인증 번호가 유효하지 않습니다.');

        return;
      }

      // 회원가입 처리
      await executeMutationAsAsync<
        { email: string; nickname: string; password: string },
        void
      >(signUp, { email, nickname, password });
      // 로그인 처리
      await executeMutationAsAsync<{ email: string; password: string }, void>(
        login,
        {
          email,
          password,
        },
      );
      // 계좌 API 생성
      await executeMutationAsAsync<void, void>(createBankApi);
      // 모든 계좌 생성
      await executeMutationAsAsync<void, void>(createAllBankAccounts);

      window.alert('회원가입이 완료되었습니다.');
      navigate(PathNames.NOTICE_REQUIRE_ACCOUNT.path);
    } catch (error) {
      window.alert('회원가입 중 오류가 발생했습니다.');
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
        <UserButton
          isLoading={
            isVerifyingEmail ||
            isSigningUp ||
            isLoggingIn ||
            isCreatingBankApi ||
            isCreatingAllBankAccounts
          }
        >
          인증하고 회원가입 하기
        </UserButton>
        <UserLink to={PathNames.LOGIN.path} type="bold">
          <UserBoldSpan>껄껄껄</UserBoldSpan>로그인하러 가기
        </UserLink>
      </UserFormStyleBox>
    </PageContainer>
  );
};
