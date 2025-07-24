const car = { id: 1, model: "Toyota" };
const { id, model } = car;
console.log(id, model);


function sendCars(...carIds) {
  carIds.forEach(id => console.log("Car ID:", id));
}

sendCars(101, 102, 103, 104);


// ----------------------------

function demo(a, b, ...args) {
  console.log("a:", a);
  console.log("b:", b);
  console.log("args:", args);
}

demo(1, 2, 3, 4, 5, 6);



funtion sendBike