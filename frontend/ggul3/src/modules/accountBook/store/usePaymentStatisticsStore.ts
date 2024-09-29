import { PaymentStatistics } from '@types';
import { create } from 'zustand';

import { myMint, myPurple, myYellow } from '@/styles/colors';

interface FormedStatistics {
  id: string;
  label: string;
  value: number;
  color: string;
}

interface UsePaymentStatisticsState {
  pieChartColors: string[];
  statisticsList: PaymentStatistics[];
  formedStatisticsList: FormedStatistics[];
  setStatisticsList: (statisticsList: PaymentStatistics[]) => void;
  setFormedStatisticsList: (statisticsList: PaymentStatistics[]) => void;
}

export const usePaymentStatisticsStore = create<UsePaymentStatisticsState>(
  (set, get) => ({
    pieChartColors: [
      myPurple[500],
      myYellow[500],
      myMint[500],
      '#F5A524',
      '#F31260',
    ],

    statisticsList: [],
    formedStatisticsList: [],

    setStatisticsList: (statisticsList) => {
      return set({ statisticsList });
    },

    setFormedStatisticsList: (statisticsList) => {
      const formedStatisticsList = statisticsList.map((item, index) => ({
        id: item.label,
        label: item.label,
        value: item.money,
        color: get().pieChartColors[index % get().pieChartColors.length],
      }));

      return set({ formedStatisticsList });
    },
  }),
);
