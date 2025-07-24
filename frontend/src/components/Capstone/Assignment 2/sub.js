function getSubsets(str) {
  let result = [];
  for (let i = 0; i < str.length; i++) {
    for (let j = i + 1; j <= str.length; j++) {
      result.push(str.slice(i, j));
    }
  }
  console.log(result);
}

getSubsets("dog");  // Expected Output: ["d", "do", "dog", "o", "og", "g"]
