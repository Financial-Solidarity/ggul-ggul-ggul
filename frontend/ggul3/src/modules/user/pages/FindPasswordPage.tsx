import { useState } from 'react';

import UserInput from '../components/UserInput';
import UserLink from '../components/UserLink';
import UserButton from '../components/UserButton';
import UserLogo from '../components/UserLogo';
import BoldSpan from '../components/UserBoldSpan';
import BoldParagraph from '../components/UserBoldParagraph';
import UserVerifyEmail from '../components/UserVerifyEmail';

export default function FindPasswordPage() {
  const [step, setStep] = useState<string>('email');

  if (step === 'email') {
    return (
      <div className="flex flex-col items-center justify-center">
        <UserLogo />
        <BoldParagraph>비밀번호를 변경하기 위한</BoldParagraph>
        <BoldParagraph>
          <BoldSpan>이메일</BoldSpan>을 입력해주세요.
        </BoldParagraph>
        <UserInput label="이메일" />
        <UserButton>인증번호 보내기</UserButton>
        <UserLink type="bold">
          <BoldSpan>껄껄껄</BoldSpan>로그인하러 가기
        </UserLink>
      </div>
    );
  }

  if (step === 'verify') {
    return (
      <div className="flex flex-col items-center justify-center">
        <UserVerifyEmail purpose="비밀번호 변경" />;
      </div>
    );
  }

  if (step === 'new password') {
    return (
      <div className="flex flex-col items-center justify-center">
        <UserLogo />
        <BoldParagraph>
          <BoldSpan>새로운 비밀번호</BoldSpan>를 입력해주세요
        </BoldParagraph>
        <UserInput label="새로운 비밀번호" />
        <UserInput label="새로운 비밀번호 확인" />
        <UserButton>비밀번호 변경하기</UserButton>
        <UserLink type="bold">
          <BoldSpan>껄껄껄</BoldSpan>로그인하러 가기
        </UserLink>
      </div>
    );
  }
}
