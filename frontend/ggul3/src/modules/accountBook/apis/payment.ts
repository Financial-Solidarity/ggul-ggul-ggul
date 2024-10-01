import { PaymentHistory, PaymentStatistics } from '@types';

import { _axios } from '@/modules/common/utils/axios';

// /api/payment/search?start-date=2024-09&end-date=2024-09&page=1

interface HistoryRange {
  startDate: string;
  endDate: string;
  page: number;
}

export const getPaymentHistory = ({
  startDate,
  endDate,
  page,
}: HistoryRange) => {
  return _axios<PaymentHistory>({
    method: 'GET',
    url: `payment/search`,
    params: {
      'start-date': startDate,
      'end-date': endDate,
      page,
    },
  });
};

export const getPaymentStatistics = () => {
  return _axios<PaymentStatistics>({
    method: 'GET',
    url: 'payment/month/chart',
  });
};

export const getCurrentAccountInfo = () => {
  return _axios({
    method: 'GET',
    url: 'accounts',
  });
};
