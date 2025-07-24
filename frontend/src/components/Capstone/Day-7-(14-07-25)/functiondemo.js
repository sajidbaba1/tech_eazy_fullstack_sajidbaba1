let age =

//we are passing a function as an argument to another function

  function greet(choice) {

    choice();

  }

  greet(function() {
    console.log("Hello, welcome to our service!");
  });

  //converting a function expression

  