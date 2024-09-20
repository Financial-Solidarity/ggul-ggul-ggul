import { Input } from '@nextui-org/input';
import { Link } from '@nextui-org/link';
import { Button } from '@nextui-org/button';

export default function FindPasswordPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-center text-6xl font-black text-primary-500">
        GGUL3
      </h1>
      <p className="text-medium font-bold text-gray-500">
        비밀번호를 변경하기 위한
      </p>
      <p className="text-medium font-bold text-gray-500">
        <span className="text-primary-500">이메일</span>을 입력해 주세요
      </p>
      <Input
        label="이메일"
        labelPlacement="inside"
        radius="full"
        size="sm"
        variant="bordered"
      />
      <Button className="w-full" color="primary" radius="full" size="lg">
        메일 보내기
      </Button>
      <Link className="text-medium font-bold text-gray-500" href="#" size="lg">
        <span className="text-primary-500">껄껄껄</span> 로그인하러 가기
      </Link>
    </div>
  );
}
