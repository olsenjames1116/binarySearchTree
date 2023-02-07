import Tree from "./binarySearchTree.js";

// This file is used to demonstrate the binary tree methods

// Generates and returns an array of random numbers of the specified length from 0 - 100
function randomArray(length) {
  const array = [];

  for (let i = 0; i < length; i++) {
    const randomNumber = parseInt(Math.random() * 100);
    array.push(randomNumber);
  }

  return array;
}

// Inserts the specified amount of nodes with random values to the tree
function unbalance(amount) {
  for (let i = 0; i < amount; i++) {
    const randomNumber = Math.ceil(Math.random() * 50 + 100);
    tree.insert(randomNumber);
  }
}

// Create and display the tree
const tree = new Tree(randomArray(30));
console.log(`Array:\n[${tree.array}]`);
console.log("-----------------------\nBinary Tree:");
tree.prettyPrint();

// Prove the tree is balanced
console.log(
  `-----------------------\nThe tree is balanced: ${tree.isBalanced()}`
);

// Print the tree in all different order notations
console.log(`-----------------------\nLevel Order:\n[${tree.levelOrder()}]`);

console.log(`-----------------------\nPreorder:\n[${tree.preorder()}]`);

console.log(`-----------------------\nPostorder:\n[${tree.postorder()}]`);

console.log(`-----------------------\nInorder:\n[${tree.inorder()}]`);

// Unbalance the tree by adding new nodes to it and prove it is unbalanced
unbalance(10);
console.log(
  `-----------------------\n*Insert new nodes*\nThe tree is balanced: ${tree.isBalanced()}`
);

// Rebalance the tree and prove it has rebalanced
tree.rebalance();
console.log(
  `-----------------------\n*Run rebalance*\nThe tree is balanced: ${tree.isBalanced()}`
);

// Display the new state of the tree
console.log(`-----------------------\nArray:\n[${tree.array}]`);
console.log("-----------------------\nBinary Tree:");
tree.prettyPrint();

// Display the new state of the tree in all notations
console.log(`-----------------------\nLevel Order:\n[${tree.levelOrder()}]`);

console.log(`-----------------------\nPreorder:\n[${tree.preorder()}]`);

console.log(`-----------------------\nPostorder:\n[${tree.postorder()}]`);

console.log(`-----------------------\nInorder:\n[${tree.inorder()}]`);
