import { PaymentHistory, PaymentStatistics } from '@types';

import { _axios } from '@/modules/common/utils/axios';

interface HistoryRange {
  startDate: string;
  endDate: string;
}

export const getPaymentHistory = ({ startDate, endDate }: HistoryRange) => {
  return _axios<PaymentHistory>({
    method: 'GET',
    url: `payment/search`,
    params: {
      'start-date': startDate,
      'end-date': endDate,
      page: 0,
    },
  });
};

interface StatisticsRange {
  startDate: string;
  endDate: string;
}

export const getPaymentStatistics = ({
  startDate,
  endDate,
}: StatisticsRange) => {
  return _axios<PaymentStatistics[]>({
    method: 'GET',
    url: 'payment/month/chart/search',
    params: {
      'start-date': startDate,
      'end-date': endDate,
    },
  });
};

export const getCurrentAccountInfo = () => {
  return _axios({
    method: 'GET',
    url: 'accounts',
  });
};
