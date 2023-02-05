import Node from './node.js';
import mergeSort from './mergeSort.js';
import removeDuplicates from './removeDuplicates.js';

class Tree {
    constructor(array) {
        this.array = removeDuplicates(mergeSort(array));
        this.root = this.buildTree();
    }

    buildTree() {
        
    }
}

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.table(tree.array);