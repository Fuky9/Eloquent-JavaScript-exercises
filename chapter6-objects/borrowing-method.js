let map = {one: true, two: true, hasOwnProperty: true};

console.log(Object.prototype.hasOwnProperty.call(map, "one"));
// → true
console.log(Object.prototype.hasOwnProperty.call(map, "five"));
// → false

// This does not work, because hasOwnProperty method is overriden
//let map = {one: true, two: true, hasOwnProperty: true};

// Fix this call
//console.log(map.hasOwnProperty("one"));
// → TypeError: map.hasOwnProperty is not a function (line 4 in function eval)
