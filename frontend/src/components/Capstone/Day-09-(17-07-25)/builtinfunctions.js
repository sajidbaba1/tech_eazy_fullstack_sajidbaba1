// eval()
console.log(eval("2 + 2"));          // 4
console.log(eval("10 * (5 + 3)"));   // 80
console.log(eval("let x = 7; x + 3")); // 10

// parseInt()
console.log(parseInt("123"));        // 123
console.log(parseInt("123.45"));     // 123
console.log(parseInt("50px"));       // 50
console.log(parseInt("abc123"));     // NaN
console.log(parseInt("1010", 2));    // 10 (binary)
console.log(parseInt("1A", 16));     // 26 (hexadecimal)

// parseFloat()
console.log(parseFloat("123.45"));   // 123.45
console.log(parseFloat("45.67abc")); // 45.67
console.log(parseFloat("abc45.67")); // NaN
console.log(parseFloat("100"));      // 100

// Number()
console.log(Number("123"));          // 123
console.log(Number("123.45"));       // 123.45
console.log(Number("abc"));          // NaN
console.log(Number(true));           // 1
console.log(Number(false));          // 0

// toString()
let num = 123;
console.log(num.toString());         // "123"

let bool = true;
console.log(bool.toString());        // "true"

let arr = [1, 2, 3];
console.log(arr.toString());         // "1,2,3"

let obj = { a: 1, b: 2 };
console.log(obj.toString());         // "[object Object]"

// typeof
console.log(typeof 123);             // "number"
console.log(typeof "hello");         // "string"
console.log(typeof true);            // "boolean"
console.log(typeof undefined);       // "undefined"
console.log(typeof null);            // "object" (this is a known quirk in JS)
console.log(typeof [1, 2, 3]);       // "object"
console.log(typeof { a: 1 });        // "object"
console.log(typeof function () {});  // "function"


console.log(Boolean(0));   // "symbol"
console.log(Boolean(1));   // "symbol"
console.log(typeof Boolean(0));   // "symbol"


console.log(Number("hello"));       // NaN
console.log(parseInt("abc123"));    // NaN
console.log("abc" * 2);             // NaN
console.log(Math.sqrt(-1));         // NaN (no real square root)
console.log(0 / 0);                 // NaN

console.log(isNaN("hello"));      // true
console.log(isNaN(123));          // false
console.log(isNaN(NaN));          // true

//Number()

console.log(Number("123"));          // 123
console.log(Number("123.45"));       // 123.45


// --------------------
// STRING FUNCTIONS
// --------------------

let str = "Hello JavaScript";

// Returns the character at a specific index
console.log(str.charAt(1)); // 'e'

// Returns Unicode (ASCII) value of character at given index
console.log(str.charCodeAt(0)); // 72

// Combines two or more strings
console.log(str.concat(" is awesome!")); // 'Hello JavaScript is awesome!'

// Checks if string contains another string
console.log(str.includes("Java")); // true

// Returns the index of the first occurrence
console.log(str.indexOf("l")); // 2

// Returns the index of the last occurrence
console.log(str.lastIndexOf("l")); // 3

// Checks if string starts with given text
console.log(str.startsWith("Hello")); // true

// Checks if string ends with given text
console.log(str.endsWith("Script")); // true

// Extracts a portion of string using start and end
console.log(str.slice(6, 16)); // 'JavaScript'

// Extracts part of string (similar to slice but no negative index)
console.log(str.substring(6, 10)); // 'Java'

// Extracts substring using start and length (deprecated)
console.log(str.substr(6, 4)); // 'Java'

// Converts entire string to uppercase
console.log(str.toUpperCase()); // 'HELLO JAVASCRIPT'

// Converts entire string to lowercase
console.log(str.toLowerCase()); // 'hello javascript'

// Removes whitespace from both ends
let padded = "   Hello JS   ";
console.log(padded.trim()); // 'Hello JS'

// Replaces part of a string with another
console.log(str.replace("JavaScript", "World")); // 'Hello World'

// Splits string into array using separator
console.log(str.split(" ")); // ['Hello', 'JavaScript']

// Repeats the string n times
console.log("Hi ".repeat(3)); // 'Hi Hi Hi '

// Returns primitive string value
console.log(str.valueOf()); // 'Hello JavaScript'

// Converts string to string (usually used on objects)
console.log(str.toString()); // 'Hello JavaScript'

// --------------------
// BOOLEAN FUNCTION
// --------------------

// Converts any value to true or false

console.log(Boolean(1));          // true
console.log(Boolean(0));          // false
console.log(Boolean("hello"));    // true
console.log(Boolean(""));         // false
console.log(Boolean(null));       // false
console.log(Boolean(undefined));  // false
console.log(Boolean(NaN));        // false
console.log(Boolean([]));         // true (empty array is truthy)
console.log(Boolean({}));         // true (empty object is truthy)




// --------------------
// MATH FUNCTIONS
// --------------------

let num = 7.8;

// Returns the value of PI
console.log(Math.PI); // 3.141592653589793

// Returns the absolute (positive) value
console.log(Math.abs(-10)); // 10

// Rounds to the nearest integer
console.log(Math.round(num)); // 8

// Rounds down to the nearest whole number
console.log(Math.floor(num)); // 7

// Rounds up to the nearest whole number
console.log(Math.ceil(num)); // 8

// Returns the square root
console.log(Math.sqrt(16)); // 4

// Returns the cube root
console.log(Math.cbrt(27)); // 3

// Returns x to the power of y
console.log(Math.pow(2, 3)); // 8

// Returns the smallest number among the inputs
console.log(Math.min(4, 1, 9, -2)); // -2

// Returns the largest number among the inputs
console.log(Math.max(4, 1, 9, -2)); // 9

// Returns a random number between 0 (inclusive) and 1 (exclusive)
console.log(Math.random()); // e.g. 0.347135732

// Generates a random number between 1 and 10
console.log(Math.floor(Math.random() * 10) + 1);

// Returns the natural logarithm (base e)
console.log(Math.log(10)); // ~2.302

// Returns base 10 logarithm
console.log(Math.log10(1000)); // 3

// Returns base 2 logarithm
console.log(Math.log2(8)); // 3

// Returns sine of a number (angle in radians)
console.log(Math.sin(Math.PI / 2)); // 1

// Returns cosine of a number (angle in radians)
console.log(Math.cos(0)); // 1

// Returns tangent of a number (angle in radians)
console.log(Math.tan(Math.PI / 4)); // ~1

// Returns arcsine (inverse sine)
console.log(Math.asin(1)); // ~1.5708 (PI/2)

// Returns arccos (inverse cosine)
console.log(Math.acos(1)); // 0

// Returns arctangent (inverse tangent)
console.log(Math.atan(1)); // ~0.785 (PI/4)

// Converts x and y coordinates to angle (arctangent of y/x)
console.log(Math.atan2(10, 5)); // angle in radians

// Returns the sign of a number: 1 (positive), -1 (negative), 0
console.log(Math.sign(-20)); // -1
console.log(Math.sign(0));   // 0
console.log(Math.sign(15));  // 1

// Truncates the decimal part and returns integer
console.log(Math.trunc(7.89)); // 7

// Returns the exponential of the number (e^x)
console.log(Math.exp(1)); // 2.718 (approx)

// Returns the hyperbolic sine
console.log(Math.sinh(1)); // ~1.175

// Returns the hyperbolic cosine
console.log(Math.cosh(1)); // ~1.543

// Returns the hyperbolic tangent
console.log(Math.tanh(1)); // ~0.761



// --------------------
// DATE FUNCTIONS
// --------------------

let now = new Date(); // Current date and time
console.log(now); // e.g. 2025-07-17T12:34:56.789Z

// Create specific date (Month is 0-based: 0 = Jan, 6 = Jul)
let dob = new Date(2000, 6, 16); // 16 July 2000
console.log(dob);

// Get full year
console.log(now.getFullYear()); // e.g. 2025

// Get month (0-11)
console.log(now.getMonth()); // e.g. 6 (July)

// Get date (1-31)
console.log(now.getDate()); // e.g. 17

// Get day of the week (0 = Sunday)
console.log(now.getDay()); // e.g. 4 (Thursday)

// Get hours, minutes, seconds
console.log(now.getHours());
console.log(now.getMinutes());
console.log(now.getSeconds());

// Set new date values
now.setFullYear(2030);
now.setMonth(11); // December
now.setDate(25);
console.log(now);

// Get timestamp in milliseconds since Jan 1, 1970
console.log(Date.now());

// Convert date to readable string
console.log(now.toDateString()); // e.g. "Tue Dec 25 2030"
console.log(now.toTimeString()); // e.g. "10:45:12 GMT+0530"
console.log(now.toISOString());  // "2030-12-25T..."




