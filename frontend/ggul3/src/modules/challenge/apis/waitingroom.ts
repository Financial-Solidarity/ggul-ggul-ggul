import { ChallengeDTO, Pageable } from '@types';

import { _axios } from '@/modules/common/utils/axios';

export const getChallengeInfo = (challengeId: string) => {
  return _axios<ChallengeDTO>({
    method: 'GET',
    url: `challenges/${challengeId}`,
  });
};

// ------------------------------------------- 09.30 12:21 yyh
interface ChallengeListRequestBody {
  title?: string;
  page: number;
}

interface ChallengeListResponse {
  content: ChallengeDTO[];
  pageable: Pageable;
}

// 챌린지 목록 조회
export const getChallengeList = ({ title, page }: ChallengeListRequestBody) => {
  return _axios<ChallengeListResponse>({
    method: 'GET',
    url: `challenges/search`,
    params: { title, page },
  });
};

interface ChallengeJoinRequestBody {
  challengeId: string;
  password?: string | null;
}

interface ChallengeJoinResponse {
  challengeId: string; // 'uuid'
  lobbyChattingRoomId: string | null; // 'uuid'
}

// 챌린지 참가
export const joinChallenge = ({
  challengeId,
  password,
}: ChallengeJoinRequestBody) => {
  return _axios<ChallengeJoinResponse>({
    method: 'POST',
    url: `challenges/join`,
    data: { challengeId, password },
  });
};

// 비밀번호 확인
export const verifyJoinChallengePassword = ({
  challengeId,
  password,
}: ChallengeJoinRequestBody) => {
  return _axios<ChallengeJoinResponse>({
    method: 'POST',
    url: `challenges/${challengeId}/password`,
    data: { challengeId, password },
  });
};
// ------------------------------------------- 09.30 12:21 yyh
