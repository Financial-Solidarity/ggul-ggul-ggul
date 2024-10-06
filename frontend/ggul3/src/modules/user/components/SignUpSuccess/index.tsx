import {
  UserBoldParagraph,
  UserBoldParagraphBox,
  UserBoldSpan,
  UserButton,
  UserFormStyleBox,
  UserLogo,
} from '../../components';

import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';

export const SignUpSuccess = () => {
  return (
    <PageContainer>
      <UserFormStyleBox>
        <UserLogo />
        <UserBoldParagraphBox>
          <UserBoldParagraph>회원가입이 완료되었습니다!</UserBoldParagraph>
          <UserBoldParagraph>
            <UserBoldSpan>다양한 혜택</UserBoldSpan>을 받기 위해서는
          </UserBoldParagraph>
          <UserBoldParagraph>
            <UserBoldSpan>계좌를 연결</UserBoldSpan>해야 합니다.
          </UserBoldParagraph>
        </UserBoldParagraphBox>
        <UserButton>계좌 연동하기</UserButton>
      </UserFormStyleBox>
    </PageContainer>
  );
};
