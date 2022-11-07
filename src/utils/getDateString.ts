export const getDateString = (timeStamp: number) => {
  const date = new Date(timeStamp);

  return `${date.getFullYear()} 年 ${
    date.getMonth() + 1
  } 月 ${date.getDate()} 日`;
};
