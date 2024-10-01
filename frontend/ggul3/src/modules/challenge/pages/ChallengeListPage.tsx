import { useEffect } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

import { ChallengeListItem } from '../components/challengeList/ChallengeListItem';
import { BottomSheet } from '../components/challengeList/BottomSheet';
import { getChallengeList } from '../apis/waitingroom';
import { useChallengeListStore } from '../store/challengeListStore';

import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { mockRequest } from '@/mocks/wrapper';
import { PathNames } from '@/router';
import { useSetBottomBar } from '@/modules/common/hooks/useSetBottomBar';

export const ChallengeListPage = () => {
  // ------------------------------------------- 09.30 12:21 yyh
  const { challengeList, setChallengeList } = useChallengeListStore();
  const navigate = useNavigate();

  useSetBottomBar({ active: true, isDarkMode: false });

  const toCreateChallenge = () => {
    navigate(PathNames.CHALLENGE.CREATE.path);
  };

  useEffect(() => {
    // 챌린지 목록 조회 (MSW mock 요청)
    const mockGetChallengeList = () => {
      return getChallengeList({ title: '', page: 1 });
    };

    // 초기 챌린지 목록 조회
    const getInitialChallengeList = async () => {
      const { content } = await mockRequest(mockGetChallengeList);

      setChallengeList(content);
    };

    getInitialChallengeList();
  }, []);
  // ------------------------------------------- 09.30 12:21 yyh

  return (
    <>
      <TopBar />
      <PageContainer>
        <div className="mb-20 flex flex-col gap-2">
          {challengeList.map((item) => (
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
