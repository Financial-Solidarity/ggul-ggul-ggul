import { PlusIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

import { ChallengeListItem } from '../components/challengeList/ChallengeListItem';
import { BottomSheet } from '../components/challengeList/BottomSheet';
import { useGetChallengeList } from '../reactQueries/useChallengeQuery';

import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { PathNames } from '@/router';
import { useSetBottomBar } from '@/modules/common/hooks/useSetBottomBar';

export const ChallengeListPage = () => {
  const navigate = useNavigate();
  const {
    data: { content },
  } = useGetChallengeList({ page: 0 });

  useSetBottomBar({ active: true, isDarkMode: false });

  const toCreateChallenge = () => {
    navigate(PathNames.CHALLENGE.CREATE.path);
  };

  return (
    <>
      <TopBar />
      <PageContainer>
        <div className="mb-20 flex flex-col gap-2">
          {content.map((item) => (
            <ChallengeListItem key={item.challengeId} item={item} />
          ))}
        </div>

        <Button
          isIconOnly
          className="fixed bottom-20 right-3 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-white p-2 text-default-600 shadow"
          variant="faded"
          onClick={toCreateChallenge}
        >
          <PlusIcon />
        </Button>
        <BottomSheet />
      </PageContainer>
    </>
  );
};
