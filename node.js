// Creates a node to be added to the tree
export default class Node {
    constructor(data = null, leftNode = null, rightNode = null) {
        this.data = data;
        this.leftNode = leftNode;
        this.rightNode = rightNode;
    }
}