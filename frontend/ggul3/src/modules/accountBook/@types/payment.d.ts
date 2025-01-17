declare module '@types' {
  export interface Payment {
    productName: string;
    spentAt: string;
    money: number;
    label: string;
    market: string;
    spendGgulToken: number;
    isMine: boolean;
  }

  export interface Pageable extends PageableOptions {
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

  export interface PageableOptions {
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

  export interface PaymentHistory {
    content: Payment[];
    pageable: Pageable;
  }

  export interface PaymentStatistics {
    label: string;
    money: number;
  }
}
