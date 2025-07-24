//Block scope example
function demo(n){
  if(n>=0){
    const a= 10;
    let b = 20;   
    var c = 30;
    console.log("Inside block scope:", a, b, c);
  }

  console.log("Outside block scope:", c);
  // console.log(a); // This will throw an error because 'a' is not defined outside the block
  // console.log(b); // This will throw an error because 'b' is not defined outside the block
}

demo(5); // Call the function to see the output
// Output will show that 'a' and 'b' are not accessible outside the block,  














//local scope example
function localScopeExample() {  
  let localVar = "I am local"; // This variable is local to this function
  console.log(localVar); // This will work
}   
localScopeExample(); // Call the function to see the output
// console.log(localVar); // This will throw an error because 'localVar' is not defined outside the function
// Output will show that 'localVar' is accessible only within the function    
// but 'a' and 'b' are not accessible outside the block scope
// 'c' is accessible outside the block scope because it is declared with 'var'  
localScopeExample(); // Call the function to see the output
// Output will show that 'localVar' is accessible only within the function














//global scope example
let globalVar = "I am global"; // This variable is global     
function globalScopeExample() {  
  console.log(globalVar); // This will work
}
globalScopeExample(); // Call the function to see the output
console.log(globalVar); // This will also work, as 'globalVar' is accessible anywhere
// Output will show that 'globalVar' is accessible both inside and outside the function
// 'globalVar' is accessible anywhere in the code, both inside and outside the function
// but 'localVar' is not accessible outside the function
// 'a' and 'b' are not accessible outside the block scope, but 'c' is accessible because it is declared with 'var'
// 'localVar' is accessible only within the function, but 'globalVar' is accessible



var userName = "John"; // Global variable
function greetUser() {
  console.log(`Hello, ${userName}!`); // Accessing global variable
}
greetUser(); // Call the function to see the output






