// Example of linked list:
let list = {
  value: 1,
  rest: {
    value: 2,
    rest: {
      value: 3,
      rest: null,
    },
  },
};

// FUNCTIONS
const arrayToList = (arr) => {
  let list = null;
  for (let i = arr.length - 1; i >= 0; i--) {
    list = { value: arr[i], rest: list };
  }
  return list;
};

// Test
console.log(arrayToList([10, 20]));

const listToArray = (list) => {
  let arr = [];
  for (let node = list; node; node = node.rest) {
    arr.push(node.value);
  }
  return arr;
};

// Test
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]

const prepend = (element, list) => {
  return { value: element, rest: list };
};

// Test
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}

const nth = (list, number) => {
  let count = 0;
  for (let node = list; node; node = node.rest) {
    if (count === number) {
      return node.value;
    }
    count++;
  }
  return undefined;
};

const recursiveNth = (list, number) => {
  // Validation practice
  if (typeof number !== "number" || isNaN(number) || number < 0) {
    throw new TypeError("Index must be a valid non-negative number");
  }

  // Function logic
  if (!list) {
    return undefined;
  } else if (number === 0) {
    return list.value;
  } else {
    return recursiveNth(list.rest, number - 1);
  }
};

// Test
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20
console.log(recursiveNth(arrayToList([10, 20, 30]), 1));
// → 20
