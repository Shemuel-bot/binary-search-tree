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

  insert(value) {
    this.root = this.insertValue(value, this.root);
  }

  insertValue(value, root) {
    if (root === null) {
      root = new Node(value);
      return root;
    }
    if (root.data === undefined) {
      root = new Node(value);
      return root;
    }
    if (root.data < value) {
      root.rightChild = this.insertValue(value, root.rightChild);
    } else {
      root.leftChild = this.insertValue(value, root.leftChild);
    }
    return root;
  }

  delete(value) {
    this.root = this.deleteNode(this.root, value);
  }

  deleteNode(root, value) {
    if (root === null) {
      return root;
    }

    if (root.data > value) {
      root.leftChild = this.deleteNode(root.leftChild, value);
      return root;
    }
    if (root.data < value) {
      root.rightChild = this.deleteNode(root.rightChild, value);
      return root;
    }

    if (root.leftChild === null) {
      const temp = root.rightChild;
      return temp;
    }
    if (root.rightChild === null) {
      const temp = root.leftChild;
      return temp;
    }
    let succParent = root;

    let succ = root.rightChild;
    while (succ.leftChild !== null) {
      if (succ.leftChild.data !== undefined) {
        succParent = succ;
        succ = succ.leftChild;
      } else break;
    }

    if (succParent !== root) {
      succParent.leftChild = succ.rightChild;
    } else {
      succParent.rightChild = succ.rightChild;
    }

    root.data = succ.data;
    return root;
  }

  find(value, node = this.root) {
    if (node === null) {
      return null;
    }

    if (node.data === value) {
      return node;
    }

    if (node.data < value) {
      return this.find(value, node.rightChild);
    }
    if (node.data > value) {
      return this.find(value, node.leftChild);
    }
  }

  levelOrder() {
    const queue = [];
    queue.push(this.root);
    for (let i = 0; i < queue.length; i += 1) {
      if (queue[i].leftChild)
        if (queue[i].leftChild.data) queue.push(queue[i].leftChild);

      if (queue[i].rightChild)
        if (queue[i].rightChild.data) queue.push(queue[i].rightChild);
    }
    return queue;
  }

  inOrder(node = this.root) {
    let array = [];
    if (node.leftChild !== null)
      if (node.leftChild.data !== undefined)
        array = array.concat(this.inOrder(node.leftChild));

    array.push(node);
    if (node.rightChild !== null)
      if (node.rightChild.data !== undefined)
        array = array.concat(this.inOrder(node.rightChild));

    return array;
  }

  preOrder(node = this.root) {
    let array = [];
    array.push(node);
    if (node.leftChild !== null)
      if (node.leftChild.data !== undefined)
        array = array.concat(this.preOrder(node.leftChild));

    if (node.rightChild !== null)
      if (node.rightChild.data !== undefined)
        array = array.concat(this.preOrder(node.rightChild));
    return array;
  }

  postOrder(node = this.root) {
    let array = [];
    if (node.leftChild !== null)
      if (node.leftChild.data !== undefined)
        array = array.concat(this.postOrder(node.leftChild));

    if (node.rightChild !== null)
      if (node.rightChild.data !== undefined)
        array = array.concat(this.postOrder(node.rightChild));

    array.push(node);
    return array;
  }

  height(node = this.root, last = true) {
    let leftTallest = 1;
    let rightTallest = 1;
    if (node.leftChild !== null)
      if (node.leftChild.data !== undefined)
        leftTallest += this.height(node.leftChild, false);

    if (node.rightChild !== null)
      if (node.rightChild.data !== undefined)
        rightTallest += this.height(node.rightChild, false);

    if (leftTallest > rightTallest)
      if (last) return leftTallest - 1;
      else return leftTallest;

    if (last) return rightTallest - 1;
    return rightTallest;
  }
}

const a = new Tree([10, 4, 23, 8, 9, 1, 4, 3, 5, 7, 9, 67, 6345, 324]);
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  // console.log(node);
  if (node.rightChild !== null) {
    prettyPrint(node.rightChild, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.leftChild !== null) {
    prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

prettyPrint(a.root);
console.log(a.height(a.find(10)));
