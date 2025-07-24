/*
In Js there are primitive  and non primitive 

primitive
-Number
-String 
-Null
-Undefined
-Boolean

Non primitive
-Object 
-Array




*/

let a = 10;
let b = 100.89;
console.log(typeof a); // number
console.log(typeof b); // number


let empid = "1234";

console.log(typeof empid); // string

let empname = "John Doe";
console.log(typeof empname); // string


let empname2 = "Sajid";
let city = "Hyderabad";
console.log(empname + " is from " + city); // string concatenation

// Boolean
let isActive = true;        
console.log(typeof isActive); // boolean

//undefined
let empAddress; 
console.log(typeof empAddress); // undefined

//null
let empSalary = null;
console.log(typeof empSalary); // object (this is a known JavaScript quirk)

let emp_doj;

console.log(typeof emp_doj); // undefined
var cabDetail = null;


//dynamic typing
let dynamicVar = 10; // Initially a number  
dynamicVar = "Now I'm a string"; // Now a string
console.log(dynamicVar); // "Now I'm a string"


let user = {
    name: "John",
    age: 30,
    isActive: true
}

console.log( user); // object

console.log(user.name); // Accessing object property
console.log(user.age); // Accessing object property using bracket notation

user.age = 31; // Updating object property
console.log(user.age); // 31

console.log(user.empname + " " + user.age); // Accessing object property using bracket notation


user["name"] = "Sajid"; // Updating object property using bracket notation
console.log(user["name"]); 