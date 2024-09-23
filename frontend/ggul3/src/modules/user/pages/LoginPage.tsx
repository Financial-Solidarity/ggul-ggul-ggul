import UserInput from '../components/UserInput';
import UserLink from '../components/UserLink';
import UserButton from '../components/UserButton';
import UserLogo from '../components/UserLogo';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <UserLogo />
      <UserInput label="이메일" />
      <UserInput label="비밀번호" />
      <UserLink type="gray">비밀번호를 잊으셨나요?</UserLink>
      <UserButton>로그인</UserButton>
      <UserLink type="bold">회원가입</UserLink>
    </div>
  );
}
