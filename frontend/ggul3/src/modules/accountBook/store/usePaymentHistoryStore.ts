import { Pageable, Payment } from '@types';
import { create } from 'zustand';

interface UsePaymentState {
  paymentList: Payment[];
  paymentPageable: Pageable;

  year: string;
  month: string;
  setYear: (year: string) => void;
  setMonth: (month: string) => void;

  setPaymentPageable: (paymentPageable: Pageable) => void;
  setPaymentList: (paymentList: Payment[]) => void;
}

export const usePaymentHistoryStore = create<UsePaymentState>((set) => ({
  paymentList: [],
  paymentPageable: {
    pageNumber: 0,
    pageSize: 20,
    sort: {
      empty: true,
      sorted: false,
      unsorted: true,
    },
    offset: 0,
    paged: true,
    unpaged: false,

    first: true,
    last: true,
    size: 20,
    number: 0,
    numberOfElements: 1,
    empty: false,
  },

  year: new Date().getFullYear().toString(),
  month: (new Date().getMonth() + 1).toString().padStart(2, '0'),
  setYear: (year) => set({ year }),
  setMonth: (month) => set({ month }),

  setPaymentList: (paymentList) => set({ paymentList }),
  setPaymentPageable: (paymentPageable) => set({ paymentPageable }),
}));
