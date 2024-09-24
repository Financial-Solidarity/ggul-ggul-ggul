import { useCreateChallengeStore } from '@/modules/challenge/store';
import { CardButton } from '@/modules/challenge/components';
import Solo from '@/assets/images/fist_hand.png';
import Team from '@/assets/images/charity_group.png';

export const CompetitionTypeStep = () => {
  const { setCompetitionType, competitionType } = useCreateChallengeStore();
  const selectSoloMode = () => {
    setCompetitionType('S');
  };

  const selectTeamMode = () => {
    setCompetitionType('T');
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <CardButton
        bgColor="success"
        description="혼자서 즐기는 게임"
        image={Solo}
        selected={competitionType === 'S'}
        title="개인전"
        onClick={selectSoloMode}
      />
      <CardButton
        bgColor="secondary"
        description="팀원들과 함께 즐기는 게임"
        image={Team}
        selected={competitionType === 'T'}
        title="팀전"
        onClick={selectTeamMode}
      />
    </div>
  );
};
