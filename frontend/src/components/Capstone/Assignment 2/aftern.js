function dateAfterNDays(startDate, n) {
  let date = new Date(startDate);
  date.setDate(date.getDate() + n);
  console.log(date.toDateString());
}

dateAfterNDays("Jul 16, 2018", 30);  // Expected Output: 15th August, 2018
