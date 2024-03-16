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

    array.push(node.data);
    if (node.rightChild !== null)
      if (node.rightChild.data !== undefined)
        array = array.concat(this.inOrder(node.rightChild));

    return array;
  }

  preOrder(node = this.root) {
    let array = [];
    array.push(node.data);
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

    array.push(node.data);
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

  depth(node, next = this.root) {
    let depthSize = 0;
    if (this.root === node) return depthSize;

    if (next.leftChild !== null)
      if (next.leftChild.data !== undefined)
        depthSize += this.depth(node, next.leftChild);
    if (next.rightChild !== null)
      if (next.rightChild.data !== undefined)
        depthSize += this.depth(node, next.rightChild);

    if (next === node) depthSize += 1;
    else if (depthSize !== 0 && next !== this.root) depthSize += 1;
    return depthSize;
  }

  isBalanced() {
    const leftSide = this.height(this.root.leftChild);
    const rightSide = this.height(this.root.rightChild);

    if (
      leftSide === rightSide ||
      leftSide + 1 === rightSide ||
      rightSide + 1 === leftSide
    )
      return true;
    return false;
  }

  reBalance() {
    if (!this.isBalanced()) {
      const array = this.inOrder();

      for (let i = 0; i < array.length; i += 1) {
        this.root = this.buildTree(array);
        if (this.isBalanced()) break;
        array.push(array.shift());
      }
    }
  }
}
function RandomArray(length = 16, maxValue = 100) {
  const array = Array(length);
  for (let i = 0; i < array.length; i += 1)
    array[i] = Math.floor(Math.random() * maxValue);
  return array;
}
console.log(RandomArray(16));
