function bookFlight(airline) {
  return new Promise((resolve, reject) => {
    if (airline === "Air India") {
      setTimeout(() => resolve(5600), 2000); // Resolves after 2 seconds
    } else {
      reject(new Error('Flight cannot be booked'));
    }
  });
}

function bookHotel(flightPrice) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(flightPrice + 100), 1000); // Adds $100 for hotel
  });
}

// Promise chain
bookFlight("Air India")
  .then((flightData) => bookHotel(flightData))
  .then((cumulativeData) => {
    console.log('Total cost is: ' + cumulativeData); // Output: "Total cost is: 5700"
  })
  .catch((e) => console.log(e.message)); // Handles errors