const reverseArray = (arr) => {
  let newArr = [];
  for (let element of arr) {
    newArr.unshift(element);
  }
  return newArr;
};

const reverseArray2 = (arr) =>
  arr.reduce((acc, element) => [element, ...acc], []);

// Tests
let myArray = ["A", "B", "C"];
console.log(reverseArray(myArray));
// → ["C", "B", "A"];
console.log(myArray);
// → ["A", "B", "C"];

const reverseArrayInPlace = (arr) => {
  // Iterating through array and swapping first and last than second first and second last...Math floor is used for arrays with odd length, because middle position remains same
  for (let i = 0; i < Math.floor(arr.length / 2); i++) {
    startSwap = arr[i];
    endSwap = arr[arr.length - 1 - i];
    arr[i] = endSwap;
    arr[arr.length - 1 - i] = startSwap;
  }
  return arr;
};

let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]
