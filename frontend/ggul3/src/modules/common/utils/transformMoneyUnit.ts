export const transformMoneyUnit = (money: number): string => {
  // 세 자리마다 콤마 찍기
  const formattedMoney = money.toLocaleString();

  // 마이너스 이면 - 붙이기, 플러스이면 + 붙이기
  // Note: toLocaleString() handles negative numbers by prefixing them with a -, so we only need to handle the positive case.
  const sign = money >= 0 ? '+' : '';

  return `${sign}${formattedMoney}`;
};
