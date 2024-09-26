interface IGetPercentage {
  total: number;
  value: number;
}

export const getPercentage = ({ total, value }: IGetPercentage): number => {
  return Math.round((value / total) * 100);
};
