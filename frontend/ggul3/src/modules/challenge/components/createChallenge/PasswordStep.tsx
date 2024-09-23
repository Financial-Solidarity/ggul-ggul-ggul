import { Input } from '@nextui-org/react';

import { CardButton } from '@/modules/challenge/components';
import { useCreateChallengeStore } from '@/modules/challenge/store';
import Solo from '@/assets/images/fist_hand.png';

export const PasswordStep = () => {
  const { password, setPassword } = useCreateChallengeStore();

  return (
    <div className="flex w-full flex-col gap-4">
      <CardButton
        bgColor="success"
        image={Solo}
        selected={password === null}
        title="공개방"
        onClick={() => setPassword(null)}
      />
      <CardButton
        bgColor="secondary"
        image={Solo}
        selected={password !== null}
        title="비밀방"
        onClick={() => setPassword('')}
      />
      {password !== null && (
        <Input
          className=""
          errorMessage="Please enter a valid email"
          label="비밀번호"
          value={password}
          variant="bordered"
          onChange={(e) => setPassword(e.target.value)}
        />
      )}
    </div>
  );
};
