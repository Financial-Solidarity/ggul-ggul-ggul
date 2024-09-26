declare module '@types' {
  export interface ChattingRoomGroupDTO {
    challengeId: string;
    title: string;
    isEncrypted: boolean;
    competitionType: 'T' | 'S';
    isBlindness: boolean;
    limitParticipant: number;
    currentParticipant: number;
    budgetCap: string;
    startAt: string;
    endAt: string;
    isOwner: boolean;
    isEnd: boolean;
    myTeamChattingRoom: ChattingRoomDTO | null;
    lobbyChattingRoom: ChattingRoomDTO | null;
    totalChattingRoom: ChattingRoomDTO;
  }

  export interface ChattingRoomDTO {
    chattingRoomId: string;
    lastChattingContent: string | null;
    lastChattingSentAt: string | null;
    badge: number;
  }
}
