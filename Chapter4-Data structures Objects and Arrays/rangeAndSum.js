const range = (start, end, step = start < end ? 1 : -1) => {
  // Validation checks
  if (step === 0) {
    throw new Error("Step cannot be 0");
  }

  if ((start > end && step > 0) || (start < end && step < 0)) {
    return [];
  }

  // Function logic
  let arr = [];
  let number = start;
  while ((step > 0 && number <= end) || (step < 0 && number >= end)) {
    arr.push(number);
    number += step;
  }
  return arr;
};
//My first solution using for loop
// let arr = [];
// if (step < 0) {
//   for (let number = start; number >= end; number += step) arr.push(number);
// } else
//   for (let number = start; number <= end; number += step) {
//     arr.push(number);
//   }
// return arr;
// };

const sum = (array) => {
  let sum = 0;
  for (let number of array) {
    sum += number;
  }
  return sum;
};

const sumWithReduce = (array) => array.reduce((acc, number) => acc + number, 0);

console.log(range(1, 10));
// → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(range(5, 2, -1));
// → [5, 4, 3, 2]
console.log(sum(range(1, 10)));
// → 55
console.log(range(1, 5, -1));
// []
console.log(sumWithReduce(range(1, 10)));
// 55
