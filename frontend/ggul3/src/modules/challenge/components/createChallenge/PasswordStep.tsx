import { Input } from '@nextui-org/react';

import { CardButton } from '@/modules/challenge/components';
import { useCreateChallengeStore } from '@/modules/challenge/store';
import Earth from '@/assets/images/earth.png';
import Lock from '@/assets/images/lock.png';

export const PasswordStep = () => {
  const { password, setPassword } = useCreateChallengeStore();

  const isPasswordValid = password === null || password.length > 0;

  return (
    <div className="flex w-full flex-col gap-4">
      <CardButton
        bgColor="success"
        image={Earth}
        selected={password === null}
        title="공개방"
        onClick={() => setPassword(null)}
      />
      <CardButton
        bgColor="secondary"
        image={Lock}
        selected={password !== null}
        title="비밀방"
        onClick={() => setPassword('')}
      />
      {password !== null && (
        <Input
          isRequired
          errorMessage={!isPasswordValid ? '비밀번호를 입력해 주세요.' : ''}
          label="비밀번호"
          type="password"
          value={password}
          variant="bordered"
          onChange={(e) => setPassword(e.target.value)}
        />
      )}
    </div>
  );
};
