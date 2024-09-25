interface IGetPercentage {
  total: number;
  value: number;
}

export const getPercentage = ({ total, value }: IGetPercentage): number => {
  console.log('total', total, 'value', value);

  return Math.round((value / total) * 100);
};
