export const getYYMMDD = (date: string) => {
  // 날짜 받으면 24.05.24 이런식으로 반환
  const dateObj = new Date(date);
  const year = dateObj.getFullYear().toString().slice(2, 4);
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();

  return `${year}.${month < 10 ? `0${month}` : month}.${day < 10 ? `0${day}` : day}`;
};
