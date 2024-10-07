declare module '@types' {
  export type Chat = CommonChatDTO | JustificationChatDTO | SpendChatDTO;

  export type SocketChat =
    | SocketCommontChatDTO
    | SocketJustificationChatDTO
    | SocketSpendChatDTO;

  export interface SocketCommontChatDTO {
    type: 'COMMON';
    data: {
      challengeId: string;
      chattingRoomId: string;
      chattingId: string;
      content: string;
      sentAt: string;
      profile: Profile;
    };
  }
  export interface SocketSpendChatDTO {
    type: 'SPEND';
    data: {
      challengeId: string;
      chattingRoomId: string;
      chattingId: string;
      consumption: Consumption;

      sentAt: string;
      profile: Profile;
    };
  }

  export interface SocketJustificationChatDTO {
    type: 'JUSTIFICATION';
    data: {
      challengeId: string;
      chattingRoomId: string;
      chattingId: string;
      content: string;
      consumption: Consumption;
      sentAt: string;
      profile: Profile;
    };
  }

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
