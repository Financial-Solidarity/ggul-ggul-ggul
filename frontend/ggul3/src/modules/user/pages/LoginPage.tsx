import { Input } from '@nextui-org/input';
import { Link } from '@nextui-org/link';
import { Button } from '@nextui-org/button';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-center text-6xl font-black text-primary-500">
        GGUL3
      </h1>
      <Input
        label="이메일"
        labelPlacement="inside"
        radius="full"
        size="sm"
        variant="bordered"
      />
      <Input
        label="비밀번호"
        labelPlacement="inside"
        radius="full"
        size="sm"
        variant="bordered"
      />
      <Link className="text-gray-500" href="#" size="sm" underline="always">
        비밀번호를 잊으셨나요?
      </Link>
      <Button className="w-full" color="primary" radius="full" size="lg">
        로그인
      </Button>
      <Link className="text-xl font-bold text-gray-500" href="#" size="lg">
        <span className="text-primary-500">껄껄껄</span> 회원가입
      </Link>
    </div>
  );
}
