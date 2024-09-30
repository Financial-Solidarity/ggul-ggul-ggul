declare module '@types' {
  export interface Payment {
    productName: string;
    spentAt: string;
    money: number;
    label: string;
    market: string;
    spendGgulToken?: number;
  }

  export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  }

  export interface PaymentHistory {
    content: Payment[];
    pageable: Pageable;
    first: boolean;
    last: boolean;
    size: number;
    number: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    numberOfElements: number;
    empty: boolean;
  }

  export interface PaymentStatistics {
    label: string;
    money: number;
  }
}
