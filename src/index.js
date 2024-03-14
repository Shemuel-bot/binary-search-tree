class Node {
  constructor(data, leftChild = null, rightChild = null) {
    this.data = data;
    this.leftChild = leftChild;
    this.rightChild = rightChild;
  }
}

class Tree {
  constructor(array = []) {
    this.root = this.buildTree(array);
  }

  buildTree(array = []) {
    const leaf = new Node(array.shift());
    if (array.length <= 0) return leaf;
    const leftSide = [];
    const rightSide = [];
    for (let i = 0; i < array.length; i += 1) {
      if (array[i] > leaf.data) {
        rightSide.push(array[i]);
      } else {
        leftSide.push(array[i]);
      }
    }
    leaf.leftChild = this.buildTree(leftSide);
    leaf.rightChild = this.buildTree(rightSide);
    return leaf;
  }

  insert(value, node = null) {
    if (node === null) {
      if (value < this.root.data) {
        if (this.root.leftChild.data === undefined) {
          this.root.leftChild = new Node(value);
        } else {
          this.root.leftChild = this.insert(value, this.root.leftChild);
        }
      } else if (this.root.rightChild.data === undefined) {
        this.root.rightChild = new Node(value);
      } else {
        this.root.rightChild = this.insert(value, this.root.rightChild);
      }
    } else {
      if (value < node.data) {
        if (node.leftChild.data === null) {
            node.leftChild = new Node(value);
            return node;
          }
        if (node.leftChild.data === undefined) {
          node.leftChild = new Node(value);
          return node;
        }
        node.leftChild = this.insert(value, node.leftChild);
        return node;
      }
      if (value > node.data) {
        console.log(node);
        if (node.rightChild === null) {
            node.rightChild = new Node(value);
            return node;
          }
        if (node.rightChild.data === undefined) {
          node.rightChild = new Node(value);
          return node;
        }
        node.rightChild = this.insert(value, node.rightChild);
        return node;
      }
    }
  }
}
const a = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.rightChild !== null) {
      prettyPrint(node.rightChild, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.leftChild !== null) {
      prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
 
a.insert(10);
a.insert(11);
prettyPrint(a.root);