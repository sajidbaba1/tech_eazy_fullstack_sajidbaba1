let isMomHappy = false;

function momsGift() {
  return new Promise((resolve, reject) => {
    if (isMomHappy) {
      let phone = {
        name: "iPhone",
        cost: 1000
      };
      resolve(phone);
    } else {
      reject(new Error('Have you seen your score card?'));
    }
  });
}

// Using the promise
momsGift()
  .then(function(successResponse) {
    console.log(successResponse);
  })
  .catch(function(errorResponse) {
    console.log(errorResponse.message); // "Have you seen your score card?"
  });