export enum ProfileType {
  RED = 'RED',
  BLUE = 'BLUE',
  PERSONAL = 'PERSONAL',
}

export interface Profile {
  participantId: string; // "uuid"
  nickname: string; // "흑염룡"
  profileImg: string; // "profileUrl"
  type: ProfileType;
  isMine: boolean; // true or false
}

export interface ParticipantData {
  profile: Profile;
  isSuccess: 'true' | 'false'; // 챌린지 성공 여부 (challenge success)
  isLose: 'true' | 'false' | null; // 팀 내에서 1등인지 여부 (only applicable for team challenges)
  ggulNum: number; // 획득 껄
}
