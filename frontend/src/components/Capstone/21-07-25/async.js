
























const getData = async () => {
  let y = await "Hello World";
  console.log(y);
  console.log(1);
};

getData();
console.log(2);


function bookFlight() {
  return new Promise(function(resolve) {
    setTimeout(() => resolve(560), 200); // Flight costs $560 after 200ms
  });
}

function bookHotel(flightPrice) {
  return new Promise(function(resolve) {
    setTimeout(() => resolve(700 + flightPrice), 100); // Hotel adds $700 after 100ms
  });
}

async function getTotal() {
  try {
    let flightData = await bookFlight();
    let cumulativeData = await bookHotel(flightData);
    console.log('Total Amount: ' + cumulativeData); // "Total Amount: 1260"
  } catch (error) {
    console.error('Error:', error.message);
  }
}

getTotal();