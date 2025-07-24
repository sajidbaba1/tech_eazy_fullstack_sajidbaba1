// 1. Create a new Date object for today's date
let today = new Date();

// 2. Log the full date and time
console.log("Today:", today);

// 3. Log the time in milliseconds since Jan 1, 1970
console.log("Time in milliseconds:", today.getTime());

// 4. Log the day of the month (1–31)
console.log("Date (Day of month):", today.getDate());

// 5. Log the month (0–11, where 0 = January, 6 = July)
console.log("Month (0-based):", today.getMonth());

// 6. Log the year using UTC (Coordinated Universal Time)
console.log("UTC Full Year:", today.getUTCFullYear());

// 7. Log the year using local time
console.log("Local Full Year:", today.getFullYear());

// 8. Set the year to 2050 and the date to July 20
// Month is 0-based, so July = 6
let now = today.setFullYear(2050, 6, 20);  // 6 = July

// 9. Log the timestamp value returned by setFullYear
console.log("New timestamp after setting date:", now);

// 10. Create a new Date object from the updated 'today'
const date = new Date(today);

// 11. Log the date as a full local string (date + time)
console.log("Date with time (local):", date.toLocaleString());

// 12. Log the date as a local date string (only date)
console.log("Date only (local):", date.toLocaleDateString());

// 13. Log the complete updated Date object
console.log("Updated Date object:", date);
