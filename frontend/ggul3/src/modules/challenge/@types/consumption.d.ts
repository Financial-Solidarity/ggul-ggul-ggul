declare module '@types' {
  export type GetConsumptionListResponse = ConsumptionDTO[];
  export interface ConsumptionDTO {
    productName: string;
    spentAt: string;
    money: number;
    label: string;
    market: string;
    spendGgulToken: number;
    nickname: string;
    team: string; // "BLUE", "PERSONAL"
    profileImg: string;
  }
}
