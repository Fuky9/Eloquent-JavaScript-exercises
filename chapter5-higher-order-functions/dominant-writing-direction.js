const SCRIPTS = require("./scripts.js");

// Functions from the book

/**
 * Determines the writing system (script) for a given Unicode character code.
 *
 * @param {number} code - The Unicode code point of the character.
 * @returns {Object|null} - The script object containing the script name and ranges,
 *                          or null if no matching script is found.
 *
 * Example:
 *   characterScript(97); // Returns the Latin script object (for 'a').
 */

function characterScript(code) {
  for (let script of SCRIPTS) {
    if (
      script.ranges.some(([from, to]) => {
        return code >= from && code < to;
      })
    ) {
      return script;
    }
  }
  return null;
}

/**
 * Groups and counts items based on a grouping function.
 *
 * @param {Iterable} items - The iterable of items to process. (e.g. Array, string)
 * @param {Function} groupName - A function that determines the group name for each item.
 *                               The function should return a string representing the group name.
 * @returns {Array<Object>} - An array of objects where each object has:
 *                            - name (string): The group name.
 *                            - count (number): The count of items in this group.
 *
 * Example:
 *   countBy(["apple", "banana", "cherry"], fruit => fruit[0]);
 *   // Returns: [{name: "a", count: 1}, {name: "b", count: 1}, {name: "c", count: 1}]
 */

function countBy(items, groupName) {
  let counts = [];
  for (let item of items) {
    let name = groupName(item);
    let known = counts.find((c) => c.name == name);
    if (!known) {
      counts.push({ name, count: 1 });
    } else {
      known.count++;
    }
  }
  return counts;
}

// Solution

/**
 * Analyzes given text for dominant writing direction
 *
 * @param {String} text - The text to analyze
 * @returns {string} - One of the following values:
 *                     - "ltr" (left-to-right) if the majority of characters belong to scripts written left-to-right.
 *                     - "rtl" (right-to-left) if the majority of characters belong to scripts written right-to-left.
 *                     - "ttb" (top-to-bottom) if the majority of characters belong to scripts written top-to-bottom.
 *                     - "ltr" is returned as a fallback if no valid characters are found.
 *
 * Example:
 *  dominantWritingDirection("Hey, مساء الخير");
 *  Returns: "rtl"
 */

const dominantWritingDirection = (text) => {
  let directionArray = countBy(text, (char) => {
    let script = characterScript(char.codePointAt(0));
    return script ? script.direction : "none";
  }).filter(({ name }) => name != "none");

  if (directionArray.length === 0) {
    return "ltr";
  }

  return directionArray.reduce((first, another) =>
    first.count > another.count ? first : another
  ).name;
};

console.log(dominantWritingDirection("Hello!"));
// → ltr
console.log(dominantWritingDirection("Hey, مساء الخير"));
// → rtl
