import { useState } from 'react';

import {
  UserBoldParagraph,
  UserBoldSpan,
  UserButton,
  UserInput,
  UserLink,
  UserLogo,
} from '../components';

export const FindPasswordPage = () => {
  const [step, setStep] = useState<string>('email');

  if (step === 'email') {
    return (
      <div className="flex flex-col items-center justify-center">
        <UserLogo />
        <UserBoldParagraph>비밀번호를 변경하기 위한</UserBoldParagraph>
        <UserBoldParagraph>
          <UserBoldSpan>이메일</UserBoldSpan>을 입력해주세요.
        </UserBoldParagraph>
        <UserInput label="이메일" />
        <UserButton>인증번호 보내기</UserButton>
        <UserLink type="bold">
          <UserBoldSpan>껄껄껄</UserBoldSpan>로그인하러 가기
        </UserLink>
      </div>
    );
  }

  if (step === 'verify') {
    return (
      <div className="flex flex-col items-center justify-center">
        <UserLogo />
        <UserBoldParagraph>
          <UserBoldSpan>메일함</UserBoldSpan>으로 인증 번호를 보냈습니다.
        </UserBoldParagraph>
        <UserBoldParagraph>
          비밀번호 변경 인증 번호를 입력해주세요
        </UserBoldParagraph>
        <UserInput label="인증번호" />
        <UserButton>인증하고 비밀번호 변경 하기</UserButton>
        <UserLink type="bold">
          <UserBoldSpan>껄껄껄</UserBoldSpan>로그인하러 가기
        </UserLink>
      </div>
    );
  }

  if (step === 'new password') {
    return (
      <div className="flex flex-col items-center justify-center">
        <UserLogo />
        <UserBoldParagraph>
          <UserBoldSpan>새로운 비밀번호</UserBoldSpan>를 입력해주세요
        </UserBoldParagraph>
        <UserInput label="새로운 비밀번호" />
        <UserInput label="새로운 비밀번호 확인" />
        <UserButton>비밀번호 변경하기</UserButton>
        <UserLink type="bold">
          <UserBoldSpan>껄껄껄</UserBoldSpan>로그인하러 가기
        </UserLink>
      </div>
    );
  }
};
