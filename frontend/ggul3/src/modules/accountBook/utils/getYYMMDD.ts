export const getYYMMDD = (date: string) => {
  // 날짜 받으면 24.05.24 이런식으로 반환
  const dateObj = new Date(date);
  const year = dateObj.getFullYear().toString().slice(2, 4);
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();

  return `${year}.${month < 10 ? `0${month}` : month}.${day < 10 ? `0${day}` : day}`;
};

export const getArrayYYMMDD = () => {
  const years = Array.from({ length: 125 }, (_, i) => 2024 - i);
  const months = Array.from({ length: 12 }, (_, i) =>
    (12 - i).toString().padStart(2, '0'),
  );
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const transformedYears = years.map((year) => ({
    value: year.toString() + '년',
    label: year.toString() + '년',
  }));
  const transformedMonths = months.map((month) => ({
    value: month.toString() + '월',
    label: month.toString() + '월',
  }));

  return {
    currentYear,
    currentMonth,
    transformedYears,
    transformedMonths,
  };
};
