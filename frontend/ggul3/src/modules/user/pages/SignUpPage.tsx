import { FormEvent } from 'react';

import {
  UserBoldParagraph,
  UserBoldSpan,
  UserButton,
  UserInput,
  UserLink,
  UserLogo,
} from '../components';
import { useSignUpStore } from '../store/signUpStore';
import {
  checkDuplicatedEmail,
  checkDuplicatedNickname,
  requestEmailVerification,
  verifyEmail,
} from '../apis/signUp';

import { PathNames } from '@/router';

export const SignUpPage = () => {
  const {
    step,
    email,
    nickname,
    password,
    passwordCheck,
    emailValidation,
    displayErrorMessage,
    ERRORS,
    setEmail,
    setNickname,
    setPassword,
    setPasswordCheck,
    setStep,
    setEmailValidation,
    validateEmail,
    validatePasswordCheck,
  } = useSignUpStore();

  const handleSubmitSignUp = async (e: FormEvent) => {
    e.preventDefault();

    if (
      displayErrorMessage.email ||
      displayErrorMessage.nickname ||
      displayErrorMessage.passwordCheck
    ) {
      window.alert('입력값을 확인해주세요');

      return;
    }

    try {
      if (await checkDuplicatedEmail(email).isDuplicated) {
        window.alert(ERRORS.DUPLICATED_EMAIL);

        return;
      }

      if (await checkDuplicatedNickname(nickname).isDuplicated) {
        window.alert(ERRORS.DUPLICATED_NICKNAME);

        return;
      }

      await requestEmailVerification(email);

      setStep('verify');
    } catch (error) {
      window.alert(
        '[checkDuplicatedEmail, checkDuplicatedNickname, requestEmailVerification]: catch error.',
      );
    }
  };

  const handleSubmitVerify = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (
        emailValidation ==
        (await verifyEmail({ email, number: emailValidation })).isValid
      ) {
        setStep('success');

        return;
      }
    } catch (error) {
      window.alert('[verifyEmail] catch error.');
    }
  };

  if (step === 'signUp') {
    return (
      <form
        className="flex flex-col items-center justify-center"
        onSubmit={handleSubmitSignUp}
      >
        <UserLogo />
        <UserInput
          errorMessage={displayErrorMessage.email}
          label="이메일"
          setValue={setEmail}
          type="email"
          validate={validateEmail}
          value={email}
        />
        <UserInput label="닉네임" setValue={setNickname} value={nickname} />
        <UserInput
          errorMessage={displayErrorMessage.passwordCheck}
          label="비밀번호"
          setValue={setPassword}
          type="password"
          value={password}
        />
        <UserInput
          label="비밀번호 확인"
          setValue={setPasswordCheck}
          type="password"
          validate={validatePasswordCheck}
          value={passwordCheck}
        />
        <UserButton>회원가입</UserButton>
        <UserLink to={PathNames.LOGIN.path} type="bold">
          로그인
        </UserLink>
      </form>
    );
  }

  if (step === 'verify') {
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
  }

  if (step === 'success') {
    return (
      <div className="flex flex-col items-center justify-center">
        <UserLogo />
        <UserBoldParagraph>회원가입이 완료되었습니다!</UserBoldParagraph>
        <UserBoldParagraph>
          <UserBoldSpan>다양한 혜택</UserBoldSpan>을 받기 위해서는
        </UserBoldParagraph>
        <UserBoldParagraph>
          <UserBoldSpan>계좌를 연결</UserBoldSpan>해야 합니다.
        </UserBoldParagraph>
        <UserButton>계좌 연동하기</UserButton>
        <UserLink to={PathNames.ACCOUNT_BOOK.MAIN.path} type="gray">
          다음에 할게요
        </UserLink>
      </div>
    );
  }
};
