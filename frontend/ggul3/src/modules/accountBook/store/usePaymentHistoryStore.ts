import { Pageable, Payment } from '@types';
import { create } from 'zustand';

interface UsePaymentState {
  paymentList: Payment[];
  paymentPageable: Pageable;
  paymentFirst: boolean;
  paymentLast: boolean;
  paymentSize: number;
  paymentNumber: number;
  paymentNumberOfElements: number;
  paymentEmpty: boolean;

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
  },
  paymentFirst: true,
  paymentLast: true,
  paymentSize: 20,
  paymentNumber: 0,
  paymentNumberOfElements: 1,
  paymentEmpty: false,

  setPaymentPageable: (paymentPageable) => set({ paymentPageable }),

  setPaymentList: (paymentList) => set({ paymentList }),
}));
