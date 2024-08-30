function getMonthsBetweenDates(startDate, endDate) {
  const startYear = startDate.getFullYear();
  const startMonth = startDate.getMonth(); // 0-based index for months

  const endYear = endDate.getFullYear();
  const endMonth = endDate.getMonth(); // 0-based index for months

  // Calculate the difference in years and months
  const yearDifference = endYear - startYear;
  const monthDifference = endMonth - startMonth;

  // Total months between the two dates
  const totalMonths = yearDifference * 12 + monthDifference;

  return totalMonths;
}

module.exports = getMonthsBetweenDates;
