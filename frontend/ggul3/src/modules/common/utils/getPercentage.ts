interface IGetPercentage {
  total: number;
  value: number;
}

export const getPercentage = ({ total, value }: IGetPercentage): number => {
  if (value === 0 || total === 0) {
    return 0;
  }

  return Math.round((value / total) * 100);
};
