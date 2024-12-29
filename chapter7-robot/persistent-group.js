/**
 * A class representing a persistent, immutable group of values.
 * Instances of PGroup are immutable, meaning methods like add and delete
 * return new instances instead of modifying the existing one.
 * Includes a static `empty` property for creating an empty group.
 */
class PGroup {
  /**
   * Creates a new PGroup instance with specified values.
   * @param {Array} values - An array of values to initialize the group.
   */
  constructor(values) {
    this.values = values;
  }
  /**
   * Returns a new PGroup insance with the given value added.
   * If the value already exists, the current instance is returned.
   * @param {*} value - The value to add.
   * @returns {PGroup} - A new PGroup instance with the value added.
   */
  add(value) {
    if (this.has(value)) return this;
    return new PGroup(this.values.concat(value));
  }

  /**
   * Returns a new PGroup instance without the given value.
   * If the value does not exist, the current instance is returned.
   * @param {*} value - The value to delete.
   * @returns {PGroup} - A new PGroup instance without the value.
   */
  delete(value) {
    if (!this.has(value)) return this;
    return new PGroup(this.values.filter((v) => v !== value));
  }

  /**
   * Checks whether the group contains the given value.
   * @param {*} value - The value to check.
   * @returns {Boolean} - true/false
   */
  has(value) {
    return this.values.includes(value);
  }

  // Property for creating a new empty PGroup instance.
  // Use this as thje starting point for creating new groups.
  static empty = new PGroup([]);
}

// Tests
let a = PGroup.empty.add("a");
let ab = a.add("b");
let b = ab.delete("a");

console.log(b.has("b"));
// → true
console.log(a.has("b"));
// → false
console.log(b.has("a"));
// → false
