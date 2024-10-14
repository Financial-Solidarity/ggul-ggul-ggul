import { CardButton } from '@/modules/challenge/components';
import { useCreateChallengeStore } from '@/modules/challenge/store';
import NameTag from '@/assets/images/name_tag.png';
import Anonymous from '@/assets/images/anonymous_identity.png';

export const BlindnessStep = () => {
  const { isBlindness, setIsBlindness } = useCreateChallengeStore();

  return (
    <div className="flex w-full flex-col gap-4">
      <CardButton
        bgColor="success"
        description="다른 사람의 닉네임을 볼 수 있어요"
        image={NameTag}
        selected={isBlindness === false}
        title="닉네임 보기"
        onClick={() => setIsBlindness(false)}
      />
      <CardButton
        bgColor="secondary"
        description="다른 사람의 닉네임을 볼 수 없어요"
        image={Anonymous}
        selected={isBlindness === true}
        title="익명"
        onClick={() => setIsBlindness(true)}
      />
    </div>
  );
};
