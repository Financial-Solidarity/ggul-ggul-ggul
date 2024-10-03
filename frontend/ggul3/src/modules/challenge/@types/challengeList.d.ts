declare module '@types' {
  export interface getChallengeListDTO extends Pagination {
    content: ChallengeListItem[];
  }

  export interface ChallengeListItem {
    challengeId: string;
    title: string;
    isEncrypted: boolean;
    competitionType: 'S' | 'T';
    isBlindness: boolean;
    currentParticipant: number;
    limitParticipant: number;
    budgetCap: number;
    startAt: string;
    endAt: string;
  }

  export interface ChallengeListRequestBody {
    title?: string;
    page: number;
  }

  export interface ChallengeListResponse {
    content: ChallengeDTO[];
    pageable: Pageable;
  }

  export interface ChallengeJoinRequestBody {
    challengeId: string;
    password?: string | null;
  }

  export interface ChallengeJoinResponse {
    challengeId: string; // 'uuid'
    lobbyChattingRoomId: string | null; // 'uuid'
  }
}
