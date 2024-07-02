const formatDate = (date: Date) => {
  // Get year, month, and day
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // January is 0, so we add 1 to get 1-12 range
  const day = date.getDate();

  // Format month and day to have leading zeros if needed
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;

  // Create a formatted date string in year-month-day format
  const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;

  return formattedDate;
};

const DateUtils = { formatDate };
export default DateUtils;
