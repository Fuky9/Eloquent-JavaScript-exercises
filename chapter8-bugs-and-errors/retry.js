class MultiplicatorUnitFailure extends Error {}

const primitiveMultiply = (number1, number2) => {
  if (Math.random() < 0.2) {
    return number1 * number2;
  } else {
    throw new MultiplicatorUnitFailure("Klunk");
  }
};

const reliableMultiply = (number1, number2) => {
  while (true) {
    try {
      return primitiveMultiply(number1, number2);
    } catch (e) {
      if (!(e instanceof MultiplicatorUnitFailure)) {
        throw e;
      }
      console.log(e.message);
    }
  }
};

// Test
console.log(reliableMultiply(8, 8));
// → 64
