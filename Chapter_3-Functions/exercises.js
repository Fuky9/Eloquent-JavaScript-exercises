// 3.1 Minimum
const min = (a,b) => a < b ? a : b;

console.log(min(0, 10));
// → 0
console.log(min(0, -10));
// → -10


// 3.2 Recursion
const isEven = (number) => {
  number = number > 0 ? number : -number;
  if (number === 0) {
    return true;
  } if (number === 1) {
    return false;
  } else return isEven(number-2);
}

console.log(isEven(50));
// → true
console.log(isEven(75));
// → false
console.log(isEven(-1));
// → false


// 3.3 Bean counting
const countChar = (word, targetCharacter) => {
    let count = 0;
  for (let letter of word) {
    if (letter === targetCharacter) {
      count++;
    } 
  } return count;
}

const countBs = (word) => countChar(word, "B");

console.log(countBs("BOB"));
// → 2
console.log(countChar("kakkerlak", "k"));
// → 4

// Smart way using reduce
const countBs = (word) => countChar(word, "B");

const countChar = (word, targetCharacter) =>
  Array.from(word).reduce((count, letter) => count + (letter === targetCharacter ? 1 : 0), 0);

console.log(countBs("BOB")); // → 2
console.log(countChar("kakkerlak", "k")); // → 4
