/**
 * Represents a 2D vector.
 */
class Vector {
  /**
   * Creates a new vector.
   * @param {number} x - The x coordinate.
   * @param {number} y - The y coordinate.
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * Adds another vector to this one.
   * @param {Vector} vector - The vector to add.
   * @throws {TypeError} If the argument is not an instance of Vector.
   * @returns {Vector} A new vector representing the sum.
   */
  plus(vector) {
    if (!(vector instanceof Vector)) {
      throw new TypeError("Argument must be an instance of Vector");
    }
    const x = this.x + vector.x;
    const y = this.y + vector.y;
    return new Vector(x, y);
  }

  /**
   * Subtract another vector from this one.
   * @param {Vector} vector - The vector to subtract.
   * @throws {TypeError} If the argument is not an instance of Vector.
   * @returns {Vector} A new Vector after subtraction.
   */
  minus(vector) {
    if (!(vector instanceof Vector)) {
      throw new TypeError("Argument must be an instance of Vector");
    }
    const x = this.x - vector.x;
    const y = this.y - vector.y;
    return new Vector(x, y);
  }

  /**
   * Calculates the length of the vector.
   * @returns {number} The length of the vector
   */
  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
}

// Tests
console.log(new Vector(1, 2).plus(new Vector(2, 3)));
// → Vec{x: 3, y: 5}
console.log(new Vector(1, 2).minus(new Vector(2, 3)));
// → Vec{x: -1, y: -1}
console.log(new Vector(3, 4).length);
// → 5
