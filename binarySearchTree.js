import Node from './node.js';
import mergeSort from './mergeSort.js';
import removeDuplicates from './removeDuplicates.js';

class Tree {
    constructor(array) {
        this.array = removeDuplicates(mergeSort(array));
        this.root = this.buildTree(this.array, 0, this.array.length - 1);
    }

    buildTree(array, start, end) {
        if(start > end) return null;

        const half = parseInt((start + end) / 2);
        const node = new Node(array[half]);

        node.leftNode = this.buildTree(array, start, half - 1);
        node.rightNode = this.buildTree(array, half + 1, end);

        return node;
    }

    prettyPrint(node, prefix = '', isLeft = true) {
        if (node.rightNode !== null) {
          this.prettyPrint(node.rightNode, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.leftNode !== null) {
          this.prettyPrint(node.leftNode, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }

    insert(value) {
        this.insertRec(this.root, value);
    }

    insertRec(root, value) {
        if(value < root.data) {
            if(root.leftNode === null) {
                root.leftNode = new Node(value)
            } else {
                this.insertRec(root.leftNode, value);
            }
        } else {
            if(root.rightNode === null) {
                root.rightNode = new Node(value);
            } else {
                this.insertRec(root.rightNode, value);
            }
        }
    }
}

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

console.log('Sorted and non-duplicated array:');
console.table(tree.array);

console.log('---------------------\nBinary search tree:');
tree.prettyPrint(tree.root);

console.log('---------------------\nInsert(10):');
tree.insert(10);
tree.prettyPrint(tree.root);