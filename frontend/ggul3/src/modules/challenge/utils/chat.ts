export const formatUnreadMessageCount = (count: number) => {
  return 300 < count ? '300+' : '' + count;
};

export const formatWon = (money: number) => {
  return money.toLocaleString('ko-KR') + '원';
};
