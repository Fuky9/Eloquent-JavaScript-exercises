// using non-arrow function declaration for practice
function every(array, test) {
  for (const element of array) {
    if (!test(element)) {
      return false;
    }
  } return true;
}

console.log(every([1, 3, 5], n => n < 10));
// → true
console.log(every([2, 4, 16], n => n < 10));
// → false
console.log(every([], n => n < 10));
// → true

// this function is just for practice, it would be much more logical to use every not some
function everyWithSome(array, test) {
  return !array.some(element => !test(element));
}

console.log(everyWithSome([1, 3, 5], n => n < 10));
// → true
console.log(everyWithSome([2, 4, 16], n => n < 10));
// → false
console.log(everyWithSome([], n => n < 10));
// → true

// Using every
function withEvery(array, test) {
  return array.every(test);
}

console.log(withEvery([1, 3, 5], n => n < 10));
// → true
console.log(withEvery([2, 4, 16], n => n < 10));
// → false
console.log(withEvery([], n => n < 10));
// → true
