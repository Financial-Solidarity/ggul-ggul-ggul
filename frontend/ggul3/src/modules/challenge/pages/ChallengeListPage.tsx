import { PlusIcon } from '@heroicons/react/24/outline';
import { Button, Skeleton } from '@nextui-org/react';
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
    isFetching,
  } = useGetChallengeList({ page: 0 });

  useSetBottomBar({ active: true, isDarkMode: false });

  const toCreateChallenge = () => {
    navigate(PathNames.CHALLENGE.CREATE.path);
  };

  return (
    <>
      <TopBar />
      <PageContainer>
        <div className="mb-20 flex h-full flex-col gap-2">
          {isFetching ? (
            Array(5)
              .fill(0)
              .map((_, index) => (
                <Skeleton key={index} className="rounded-2xl">
                  <div className="h-40 w-full" />
                </Skeleton>
              ))
          ) : content.length === 0 ? (
            <div className="flex w-full flex-1 flex-col items-center justify-center gap-2">
              <p className="text-default-400">진행중인 챌린지가 없습니다</p>
              <Button className="w-max" onClick={toCreateChallenge}>
                챌린지 만들기
              </Button>
            </div>
          ) : (
            content.map((item) => (
              <ChallengeListItem key={item.challengeId} item={item} />
            ))
          )}
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
