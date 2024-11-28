let arrays = [[1, 2, 3], [[1, [2,3],[4,5],6],[4, 5], [6]]];
let arrays2 = [[1,2,],[2,3,4],[4],[5,6]]

const flatten = (arr) => arr.reduce((acc, element) => acc.concat(element), [])

console.log(flatten(arrays))
// → [1, 2, 3, [1, [2, 3], [4, 5], 6], [4, 5], [6]]
console.log(flatten(arrays2))
// → [1, 2, 2, 3, 4, 4, 5, 6]

// Recursive function for deep flattenig made by myself
const deepFlatten = (arr) => {
  return arr.reduce((acc, element) => {
    if (Array.isArray(element)) {
      return acc.concat(deepFlatten(element))
    } else {return acc.concat(element)}
  }, [])                                              
}

console.log(deepFlatten(arrays))
// → [1, 2, 3, 1, 2, 3, 4, 5, 6, 4, 5, 6]
