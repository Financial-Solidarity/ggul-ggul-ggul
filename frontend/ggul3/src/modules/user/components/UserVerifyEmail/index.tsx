import UserInput from '../UserInput';
import UserLink from '../UserLink';
import UserButton from '../UserButton';
import UserLogo from '../UserLogo';
import BoldSpan from '../UserBoldSpan';
import BoldParagraph from '../UserBoldParagraph';

const UserVerifyEmail = ({ purpose }: { purpose: string }) => {
  return (
    <>
      <UserLogo />
      <BoldParagraph>
        <BoldSpan>메일함</BoldSpan>으로 인증 번호를 보냈습니다.
      </BoldParagraph>
      <BoldParagraph>{purpose} 인증 번호를 입력해주세요</BoldParagraph>
      <UserInput label="인증번호" />
      <UserButton>인증하고 {purpose} 하기</UserButton>
      <UserLink type="bold">
        <BoldSpan>껄껄껄</BoldSpan>로그인하러 가기
      </UserLink>
    </>
  );
};

export default UserVerifyEmail;
