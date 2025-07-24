function displayDayTime() {
  let now = new Date();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[now.getDay()];
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  console.log(`Today : ${day}.`);
  console.log(`Current time is: ${hours} ${ampm}: ${minutes}:${seconds}`);
}

displayDayTime();
