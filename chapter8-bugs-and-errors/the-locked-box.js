const box = new (class {
  locked = true;
  #content = [];

  unlock() {
    this.locked = false;
  }
  lock() {
    this.locked = true;
  }
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this.#content;
  }
})();

// This function was implemented:
function withBoxUnlocked(body) {
  const wasLocked = box.locked; // Stores initial state of the box

  if (wasLocked) box.unlock();

  try {
    body();
    console.log(box.content);
  } finally {
    if (wasLocked) box.lock();
  }
}

// Tests
withBoxUnlocked(() => {
  box.content.push("gold piece");
});

try {
  withBoxUnlocked(() => {
    throw new Error("Pirates on the horizon! Abort!");
  });
} catch (e) {
  console.log("Error raised: " + e.message);
}
console.log(box.locked);
// → true
