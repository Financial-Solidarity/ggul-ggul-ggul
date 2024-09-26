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
    startDatetime: string;
    endDatetime: string;
  }
}
