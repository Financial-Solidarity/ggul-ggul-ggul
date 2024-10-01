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

  export interface ParticipantDTO {
    participantId: string;
    nickname: string;
    profileImg: string;
    type: string;
  }

  export interface getChattingRooomIdsResponse {
    totalChattingRoomId: string;
    myTeamChattingRoomId: string | null;
    lobbyChattingRoomId: string | null;
  }
}
