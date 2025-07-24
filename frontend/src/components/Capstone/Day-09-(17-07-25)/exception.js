// --------------------
// EXCEPTION HANDLING
// --------------------

try {
  let a = 10;
  let b = 0;
  if (b === 0) {
    throw new Error("Division by zero is not allowed");
  }
  let result = a / b;
  console.log(result);
} catch (error) {
  console.log("Error caught:");
  console.log(error.message); // Shows error message
} finally {
  console.log("This block runs always, even if error occurs.");
}

// Example with undefined variable
try {
  console.log(x); // x is not defined
} catch (e) {
  console.log("Caught an error:", e.message);
}
