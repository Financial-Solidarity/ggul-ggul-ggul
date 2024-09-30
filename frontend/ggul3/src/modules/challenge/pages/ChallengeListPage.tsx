import { useEffect } from 'react';

import { ChallengeListItem } from '../components/challengeList/ChallengeListItem';
import { BottomSheet } from '../components/challengeList/BottomSheet';
import { getChallengeList } from '../apis/waitingroom';
import { useChallengeListStore } from '../store/challengeListStore';

import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { mockRequest } from '@/mocks/wrapper';

export const ChallengeListPage = () => {
  // ------------------------------------------- 09.30 12:21 yyh
  const { challengeList, setChallengeList } = useChallengeListStore();

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
        <BottomSheet />
      </PageContainer>
    </>
  );
};
