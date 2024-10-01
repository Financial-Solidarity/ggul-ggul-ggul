declare module '@types' {
  export interface CreateChallengeResponse {
    challengeId: string;
    lobbyChattingRoomId: string;
  }

  export interface CreateChallengeRequestBody {
    title: string;
    password: string | null; // or null.
    competitionType: 'S' | 'T';
    isBlindness: boolean;
    limitParticipant: number;
    budgetCap: number;
    startAt: string;
    endAt: string;
  }
}
