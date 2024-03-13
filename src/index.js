class Node{
    constructor(data, leftChild = null, rightChild = null){
        this.data = data;
        this.leftChild = leftChild;
        this.rightChild = rightChild;
    }
}

class Tree{
    constructor(array = []){
        this.root = this.buildTree(array);
    }

    buildTree(array = []){
        const leaf = new Node(array.shift());
        if(array.length  <= 0)return leaf
        const leftSide = [];
        const rightSide = [];
        for (let i = 0; i < array.length; i+=1) {
            if(array[i] > leaf.data){
                rightSide.push(array[i])
            }
            else{
                leftSide.push(array[i]);
            }
        }
        leaf.leftChild = this.buildTree(leftSide);
        leaf.rightChild = this.buildTree(rightSide);
        console.log(leaf);
        return leaf;
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
prettyPrint(a.root);
 