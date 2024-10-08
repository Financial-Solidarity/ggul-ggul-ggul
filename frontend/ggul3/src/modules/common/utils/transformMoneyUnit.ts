interface TransformMoneyUnitProps {
  money: number;
  disableSign?: boolean;
}

export const transformMoneyUnit = ({
  money,
  disableSign,
}: TransformMoneyUnitProps): string => {
  // 세 자리마다 콤마 찍기
  const formattedMoney = money.toLocaleString();

  // 금액 앞에 + 붙이기
  let sign = money >= 0 ? '+' : '';

  if (disableSign) {
    sign = '';
  }

  return `${sign}${formattedMoney}`;
};

export const transformSpendMoney = (money: number): string => {
  // 세 자리마다 콤마 찍기
  const formattedMoney = money.toLocaleString();

  return `-${formattedMoney}`;
};
