import Node from './node.js';

class Tree {
    constructor(array) {
        this.array = array;
        this.root = this.buildTree();
    }
}