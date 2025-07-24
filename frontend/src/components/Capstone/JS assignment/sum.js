function sumOfEvenNumbers(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        if (i % 2 === 0) {
            sum += i;
        }
    }
    return sum;
}
const n = 20;
console.log(`Sum of even numbers from 1 to ${n} is: ${sumOfEvenNumbers(n)}`);