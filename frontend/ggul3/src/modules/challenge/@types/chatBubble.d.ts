// ------------------------------------------- 09.30 14:35 yyh
declare module '@types' {
  export interface TextChatBubbleDTO {
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
}
// ------------------------------------------- 09.30 14:35 yyh
