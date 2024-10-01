import { ChallengeDTO, Pageable } from '@types';

import { _axios } from '@/modules/common/utils/axios';

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

// 대기실에서 방장이 챌린지 시작
export const startChallenge = (challengeId: string) => {
  return _axios<void>({
    method: 'POST',
    url: 'challenges/ready',
    data: { challengeId },
  });
};
