const prompt = require('prompt-sync')();
function factorial(num) {
    if (num === 0 || num === 1) return 1;
    let result = 1;
    for (let i = 2; i <= num; i++) {
        result *= i;
    }
    return result;
}
function isStrongNumber(number) {
    if (!Number.isInteger(number) || number < 0) {
        return "Input must be a positive integer";
    }
    let sum = 0;
    let temp = number;
    while (temp > 0) {
        let digit = temp % 10;
        sum += factorial(digit);
        temp = Math.floor(temp / 10);
    }
    return sum === number ? `${number} is a strong number` : `${number} is not a strong number`;
}
const input = parseInt(prompt("Enter a positive integer: "));
console.log(isStrongNumber(input));