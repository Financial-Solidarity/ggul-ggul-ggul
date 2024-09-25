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
    startDatetime: string;
    endDatetime: string;
  }
}
