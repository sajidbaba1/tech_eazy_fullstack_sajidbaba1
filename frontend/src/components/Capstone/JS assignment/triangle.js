function triangleArea(a, b, c) {
    if (a + b <= c || b + c <= a || a + c <= b || a <= 0 || b <= 0 || c <= 0) {
        return "Invalid triangle sides";
    }
    const s = (a + b + c) / 2;
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    return area;
}
const side1 = 5, side2 = 6, side3 = 7;
console.log(`Area of triangle with sides ${side1}, ${side2}, ${side3} is: ${triangleArea(side1, side2, side3)}`);