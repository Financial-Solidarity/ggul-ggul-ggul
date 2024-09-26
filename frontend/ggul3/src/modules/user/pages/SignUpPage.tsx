import { useState } from 'react';

import {
  UserBoldParagraph,
  UserBoldSpan,
  UserButton,
  UserInput,
  UserLink,
  UserLogo,
} from '../components';

export const SignUpPage = () => {
  const [step, setStep] = useState<string>('signUp');

  if (step === 'signUp') {
    return (
      <div className="flex flex-col items-center justify-center">
        <UserLogo />
        <UserInput label="이메일" />
        <UserInput label="닉네임" />
        <UserInput label="비밀번호" />
        <UserInput label="비밀번호 확인" />
        <UserButton>회원가입</UserButton>
        <UserLink type="bold">로그인</UserLink>
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
        <UserBoldParagraph>회원가입 인증 번호를 입력해주세요</UserBoldParagraph>
        <UserInput label="인증번호" />
        <UserButton>인증하고 회원가입 하기</UserButton>
        <UserLink type="bold">
          <UserBoldSpan>껄껄껄</UserBoldSpan>로그인하러 가기
        </UserLink>
      </div>
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
        <UserLink type="gray">다음에 할게요</UserLink>
      </div>
    );
  }
};
