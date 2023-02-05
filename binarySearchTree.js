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

    delete(value) {
        this.deleteRec(this.root, value);
    }

    deleteRec(root, value) {
        if(root === null) return root;

        if(value < root.data) {
            root.leftNode = this.deleteRec(root.leftNode, value)
        } else if(value > root.data) {
            root.rightNode = this.deleteRec(root.rightNode, value)
        } else {
            if(root.leftNode === null) return root.rightNode;

            if(root.rightNode === null) return root.leftNode;
    
            root.data = this.minValue(root.rightNode);
            
            root.rightNode = this.deleteRec(root.rightNode, root.data);
        }

        return root;
    }

    minValue(root) {
        let min = root.data;

        while(root.leftNode !== null) {
            min = root.leftNode.data;
            root = root.leftNode;
        }

        return min;
    }

    find(value) {
        return this.findRec(this.root, value);
    }

    findRec(root, value) {
        if(root === null) return null;

        let searchNode = root;

        if(value < root.data) {
            searchNode = this.findRec(root.leftNode, value);
        } else if(value > root.data) {
            searchNode = this.findRec(root.rightNode, value);
        } 
        return searchNode;
    }

    levelOrder(root = this.root, callback = this.toArray) {
        let levelOrderArray = [];

        if(root === null) return;

        let queue = [];
        callback(queue, root);

        while(queue.length > 0) {
            const node = queue[0];
            callback(levelOrderArray, node.data);
            if(node.leftNode !== null) callback(queue, node.leftNode);
            if(node.rightNode !== null) callback(queue, node.rightNode);
            queue.shift();
        }

        return levelOrderArray;
    }

    toArray(array, value) {
        array.push(value);
    }
}

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

console.log('Sorted and non-duplicated array:');
console.table(tree.array);

console.log('---------------------\nBinary search tree:');
tree.prettyPrint(tree.root);

console.log('---------------------\ninsert(10):');
tree.insert(10);
tree.prettyPrint(tree.root);

console.log('---------------------\ndelete(67):');
tree.delete(67);
tree.prettyPrint(tree.root);

console.log('---------------------\ndelete(9):');
tree.delete(9);
tree.prettyPrint(tree.root);

console.log('---------------------\nfind(5):');
console.log(JSON.stringify(tree.find(5)));

console.log('---------------------\nlevelOrder():');
console.table(tree.levelOrder());