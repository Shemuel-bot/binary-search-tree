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
    } if (root.data < value) {
      root.rightChild = this.deleteNode(root.rightChild, value);
      return root;
    }

    if (root.leftChild === null) {
      const temp = root.rightChild;
      return temp;
    } if (root.rightChild === null) {
      const temp = root.leftChild;
      return temp;
    } 
      let succParent = root;

      let succ = root.rightChild;
      while (succ.leftChild !== null) {
        if(succ.leftChild.data !== undefined){
        succParent = succ;
        succ = succ.leftChild;
        }else break
      }

      if (succParent !== root) {
        succParent.leftChild = succ.rightChild;
      } else {
        succParent.rightChild = succ.rightChild;
      }

      root.data = succ.data;
      return root;
    
  }
}

const a = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
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
a.delete(7);
prettyPrint(a.root);
