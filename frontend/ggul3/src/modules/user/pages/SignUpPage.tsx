import { useState } from 'react';

import UserInput from '../components/UserInput';
import UserLink from '../components/UserLink';
import UserButton from '../components/UserButton';
import UserLogo from '../components/UserLogo';
import UserBoldParagraph from '../components/UserBoldParagraph';
import UserBoldSpan from '../components/UserBoldSpan';
import UserVerifyEmail from '../components/UserVerifyEmail';

export default function SignUpPage() {
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
        <UserVerifyEmail purpose="회원가입" />;
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
}
