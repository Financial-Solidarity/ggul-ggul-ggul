import {
  UserBoldParagraph,
  UserBoldSpan,
  UserButton,
  UserLink,
  UserLogo,
} from '../../components';

import { PathNames } from '@/router';

export const SignUpSuccess = () => {
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
};
