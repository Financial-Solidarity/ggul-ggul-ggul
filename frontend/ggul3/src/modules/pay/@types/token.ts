declare module '@types' {
  export interface LuckyDrawItemDTO {
    id: number;
    title: string;
    imageUrl: string;
    probability: number;
    price: number;
    status: string;
    createdAt: string;
  }

  export interface TokenTradingHistoryItemDTO {
    quantity: number;
    isPositive: boolean;
    category: string;
    createdAt: string;
  }

  interface LuckyDrawDetailDTO extends LuckyDrawItemDTO {
    maxWinnerCount: number;
  }

  export interface LuckyDrawDetailDTO extends PageableOptions {
    content: LuckyDrawDetailDTO;
  }
}
