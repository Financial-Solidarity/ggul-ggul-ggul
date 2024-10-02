import { Input } from '@nextui-org/react';

import { useCreateChallengeStore } from '@/modules/challenge/store/createChallengeStore';
import { CardButton } from '@/modules/challenge/components';
import Zero from '@/assets/images/number_lime_0.png';
import Two from '@/assets/images/number_lime_2.png';
import Four from '@/assets/images/number_lime_4.png';
import Eight from '@/assets/images/number_lime_8.png';

export const LimitParticipantStep = () => {
  const {
    limitParticipant,
    isCustomLimit,
    setLimitParticipant,
    setIsCustomLimit,
  } = useCreateChallengeStore();

  const limit2 = () => {
    setLimitParticipant(2);
    setIsCustomLimit(false);
  };

  const limit4 = () => {
    setLimitParticipant(4);
    setIsCustomLimit(false);
  };

  const limit8 = () => {
    setLimitParticipant(8);
    setIsCustomLimit(false);
  };

  const limitCustom = () => {
    setIsCustomLimit(true);
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="grid grid-cols-2 gap-2">
        <CardButton
          bgColor="success"
          image={Two}
          selected={!isCustomLimit && limitParticipant === 2}
          title="2인"
          titleSize="lg"
          onClick={limit2}
        />
        <CardButton
          bgColor="primary"
          image={Four}
          selected={!isCustomLimit && limitParticipant === 4}
          title="4인"
          titleSize="lg"
          onClick={limit4}
        />
        <CardButton
          bgColor="secondary"
          image={Eight}
          selected={!isCustomLimit && limitParticipant === 8}
          title="8인"
          titleSize="lg"
          onClick={limit8}
        />
        <CardButton
          bgColor="danger"
          image={Zero}
          selected={isCustomLimit}
          title="직접입력"
          titleSize="lg"
          onClick={limitCustom}
        />
      </div>
      {isCustomLimit && (
        <Input
          className=""
          errorMessage="Please enter a valid email"
          label="최대인원"
          type="number"
          value={limitParticipant + ''}
          variant="bordered"
          onChange={(e) => setLimitParticipant(+e.target.value)}
        />
      )}
    </div>
  );
};