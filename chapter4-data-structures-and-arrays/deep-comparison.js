// JS compares objects by reference not Values, this function compares also objects by their properties and their values

const deepEqual = (value1, value2) => {
  if (value1 === value2) {
    return true;
  }

  if (
    typeof value1 !== "object" ||
    typeof value2 !== "object" ||
    value1 === null ||
    value2 === null
  ) {
    return false;
  }

  const keys1 = Object.keys(value1),
    keys2 = Object.keys(value2);

  if (keys1.length !== keys2.length) {
    return false;
  }
  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(value1[key], value2[key])) {
      return false;
    }
  }
  return true;
};

let obj = { here: { is: "an" }, object: 2 };
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, { here: 1, object: 2 }));
// → false
console.log(deepEqual(obj, { here: { is: "an" }, object: 2 }));
// → true
