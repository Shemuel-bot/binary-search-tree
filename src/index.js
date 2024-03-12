class Node{
    constructor(data, leftChild = null, rightChild = null){
        this.data = data;
        this.leftChild = leftChild;
        this.rightChild = rightChild;
    }
}

class Tree{
    constructor(){
        this.root = null;
    }

    buildTree(array = []){
        const leaf = new Node(array.shift());
        if(array.length  <= 1)return leaf
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
const a = new Tree();
