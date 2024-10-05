declare module '@types' {
  export type Chat = CommonChatDTO | JustificationChatDTO | SpendChatDTO;

  export interface CommonChatDTO {
    type: 'COMMON';
    chattingId: string;
    content: string;
    sentAt: string;
    profile: Profile;
  }

  export interface JustificationChatDTO {
    type: 'JUSTIFICATION';
    chattingId: string;
    content: string;
    consumption: Consumption;
    img: string | null;
    sentAt: string;
    profile: Profile;
  }

  export interface SpendChatDTO {
    type: 'SPEND';
    chattingId: string;
    consumption: Consumption;
    sentAt: string;
    profile: Profile;
  }

  export interface Profile {
    participantId: string;
    nickname: string;
    profileImg: string;
    type: 'RED' | 'BLUE' | 'PERSONAL';
    isMine: boolean;
  }

  export interface Consumption {
    category: string;
    balance: number;
  }

  export interface JustifyRequestBody {
    chattingId: string;
    content: string;
  }
}
