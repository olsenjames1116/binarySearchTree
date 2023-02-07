import Node from "./node.js";
import mergeSort from "./mergeSort.js";
import removeDuplicates from "./removeDuplicates.js";

export default class Tree {
  constructor(array) {
    this.array = removeDuplicates(mergeSort(array));
    this.root = this.buildTree(this.array, 0, this.array.length - 1);
  }

  buildTree(array, start, end) {
    if (start > end) return null;

    const half = parseInt((start + end) / 2);
    const node = new Node(array[half]);

    node.leftNode = this.buildTree(array, start, half - 1);
    node.rightNode = this.buildTree(array, half + 1, end);

    return node;
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node.rightNode !== null) {
      this.prettyPrint(
        node.rightNode,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.leftNode !== null) {
      this.prettyPrint(
        node.leftNode,
        `${prefix}${isLeft ? "    " : "│   "}`,
        true
      );
    }
  }

  insert(value, root = this.root) {
    if (value < root.data) {
      if (root.leftNode === null) {
        root.leftNode = new Node(value);
      } else {
        this.insert(value, root.leftNode);
      }
    } else {
      if (root.rightNode === null) {
        root.rightNode = new Node(value);
      } else {
        this.insert(value, root.rightNode);
      }
    }
  }

  delete(value, root = this.root) {
    if (root === null) return root;

    if (value < root.data) {
      root.leftNode = this.delete(value, root.leftNode);
    } else if (value > root.data) {
      root.rightNode = this.delete(value, root.rightNode);
    } else {
      if (root.leftNode === null) return root.rightNode;

      if (root.rightNode === null) return root.leftNode;

      root.data = this.minValue(root.rightNode);

      root.rightNode = this.delete(root.data, root.rightNode);
    }

    return root;
  }

  minValue(root) {
    let min = root.data;

    while (root.leftNode !== null) {
      min = root.leftNode.data;
      root = root.leftNode;
    }

    return min;
  }

  find(value, root = this.root) {
    if (root === null) return null;

    let searchNode = root;

    if (value < root.data) {
      searchNode = this.find(value, root.leftNode);
    } else if (value > root.data) {
      searchNode = this.find(value, root.rightNode);
    }
    return searchNode;
  }

  levelOrder(root = this.root, callback = this.toArray) {
    const levelOrderArray = [];

    if (root === null) return;

    const queue = [];
    callback(queue, root);

    while (queue.length > 0) {
      const node = queue[0];
      callback(levelOrderArray, node.data);
      if (node.leftNode !== null) callback(queue, node.leftNode);
      if (node.rightNode !== null) callback(queue, node.rightNode);
      queue.shift();
    }

    return levelOrderArray;
  }

  toArray(array, value) {
    array.push(value);
  }

  inorder(root = this.root, callback = this.toArray) {
    let inorderArray = [];

    if (root === null) return inorderArray;

    inorderArray = this.inorder(root.leftNode).concat(inorderArray);
    callback(inorderArray, root.data);
    inorderArray = inorderArray.concat(this.inorder(root.rightNode));

    return inorderArray;
  }

  preorder(root = this.root, callback = this.toArray) {
    let preorderArray = [];

    if (root === null) return preorderArray;

    callback(preorderArray, root.data);
    preorderArray = preorderArray.concat(this.preorder(root.leftNode));
    preorderArray = preorderArray.concat(this.preorder(root.rightNode));

    return preorderArray;
  }

  postorder(root = this.root, callback = this.toArray) {
    let postorderArray = [];

    if (root === null) return postorderArray;

    postorderArray = this.postorder(root.leftNode).concat(postorderArray);
    postorderArray = postorderArray.concat(this.postorder(root.rightNode));
    callback(postorderArray, root.data);

    return postorderArray;
  }

  height(value) {
    let node;

    if (typeof value === "number") {
      node = this.find(value);
      if (node === null) return null;
    } else {
      node = value;
    }

    if (node === null) return -1;

    const leftHeight = this.height(node.leftNode);
    const rightHeight = this.height(node.rightNode);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(value, root = this.root) {
    let depthVal = 0;

    if (root === null) return null;

    if (root.data === value) return 0;

    if (value < root.data) depthVal = this.depth(value, root.leftNode);
    if (value > root.data) depthVal = this.depth(value, root.rightNode);

    return depthVal + 1;
  }

  isBalanced() {
    const postorderArray = this.postorder();
    const leftHalfHeight = this.depth(postorderArray[0]);

    const levelOrderArray = this.levelOrder();
    const rightHalfHeight = this.depth(
      levelOrderArray[levelOrderArray.length - 1]
    );

    const heightDifference = Math.abs(leftHalfHeight - rightHalfHeight);

    if (heightDifference > 1) return false;

    return true;
  }

  rebalance() {
    const inorderArray = this.inorder();

    this.array = inorderArray;
    this.root = this.buildTree(inorderArray, 0, inorderArray.length - 1);
  }
}
