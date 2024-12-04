class Group {
  group = []
  add (element) {
    if (!this.group.includes(element)) {
      this.group.push(element);
    }   
  }

  delete (element) {
    this.group = this.group.filter(groupElement => element !== groupElement)  
  }

  has (element) {
    return this.group.includes(element);
  }

  static from (array) {
    const newGroup = new Group();
    for (let element of array) {
      newGroup.add(element)
    } return newGroup;
  }
}



let group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false
