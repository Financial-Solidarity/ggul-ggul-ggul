declare module '@types' {
  export interface ChangeTeamResponse {
    participantId: string;
    nickname: string;
    profileImg: string | null;
    type: string;
    isMine: boolean;
  }
}
