import Tree from './binarySearchTree.js';

function randomArray(length) {
    const array = [];

    for(let i = 0; i < length; i++) {
        const randomNumber = parseInt(Math.random() * 100);
        array.push(randomNumber);
    }

    return array;
}

const tree = new Tree(randomArray(30));
console.log(`Array:\n[${tree.array}]`)
console.log('-----------------------\nBinary Tree:');
tree.prettyPrint();