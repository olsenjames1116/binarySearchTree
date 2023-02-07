import Tree from './binarySearchTree.js';

function randomArray(length) {
    const array = [];

    for(let i = 0; i < length; i++) {
        const randomNumber = parseInt(Math.random() * 100);
        array.push(randomNumber);
    }

    return array;
}

function unbalance(amount) {
    for(let i = 0; i < amount; i++) {
        const randomNumber = parseInt(Math.random() * 50 + 100);
        tree.insert(randomNumber);
    }
}

const tree = new Tree(randomArray(30));
console.log(`Array:\n[${tree.array}]`)
console.log('-----------------------\nBinary Tree:');
tree.prettyPrint();

console.log(`-----------------------\nThe tree is balanced: ${tree.isBalanced()}`);

console.log(`-----------------------\nLevel Order:\n[${tree.levelOrder()}]`);

console.log(`-----------------------\nPreorder:\n[${tree.preorder()}]`);

console.log(`-----------------------\nPostorder:\n[${tree.postorder()}]`);

console.log(`-----------------------\nInorder:\n[${tree.inorder()}]`);

unbalance(10);
console.log(`-----------------------\nThe tree is balanced: ${tree.isBalanced()}`);