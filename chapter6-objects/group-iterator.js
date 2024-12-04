class Group {
  group = []
  add(element) {
    if (!this.group.includes(element)) {
      this.group.push(element);
    }   
  }

  delete(element) {
    this.group = this.group.filter(groupElement => element !== groupElement)  
  }

  has(element) {
    return this.group.includes(element);
  }

  static from(array) {
    const newGroup = new Group();
    for (let element of array) {
      newGroup.add(element)
    } return newGroup;
  }

  [Symbol.iterator]() {
    return new GroupIterator(this.group);
  }
}

class GroupIterator {
  
  constructor(group) {
    this.group = group;
    this.position = 0;
  }

  next() {
    if (this.position >= this.group.length) {
      return {done: true};
    } else {
      let result = {value: this.group[this.position], done: false};
      this.position++;
      return result;
    }
  }
}

for (let value of Group.from(["a", "b", "c"])) {
  console.log(value);
}
// → a
// → b
// → c
