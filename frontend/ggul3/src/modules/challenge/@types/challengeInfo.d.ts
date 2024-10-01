declare module '@types' {
  export interface ChallengeDTO {
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

  export interface GetChallengeDetailResponse {
    challengeId: string;
    title: string;
    isEncrypted: boolean;
    competitionType: 'S' | 'T';
    isBlindness: boolean;
    limitParticipant: number;
    currentParticipant: number;
    budgetCap: number;
    startAt: string;
    endAt: string;
    isOwner: boolean;
  }
}
