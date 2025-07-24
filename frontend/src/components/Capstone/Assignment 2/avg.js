let marks = [12, 18, 25, 24, 2, 5, 18, 20, 20, 21];

function moreThanAverage(marks) {
  let average = marks.reduce((sum, mark) => sum + mark, 0) / marks.length;
  let count = marks.filter(mark => mark > average).length;
  let percentage = (count / marks.length) * 100;
  console.log("more than average:", percentage.toFixed(1));
}

function generateFrequency(marks) {
  let freq = Array(26).fill(0);
  marks.forEach(mark => freq[mark]++);
  console.log("frequency:", freq);
}

moreThanAverage(marks);
generateFrequency(marks);
