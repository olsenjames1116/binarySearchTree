import Node from "./node.js";
import mergeSort from "./mergeSort.js";
import removeDuplicates from "./removeDuplicates.js";

// Creates and contains multiple methods for a binary search tree
export default class Tree {
  constructor(array) {
    this.array = removeDuplicates(mergeSort(array));
    this.root = this.buildTree(this.array, 0, this.array.length - 1);
  }

  // Build the binary search tree from an array
  buildTree(array, start, end) {
    // If start is greater than end, the indexes have crossed
    if (start > end) return null;

    // Find the halfway point and create a node from it
    const half = parseInt((start + end) / 2);
    const node = new Node(array[half]);

    // Recursively build the tree
    node.leftNode = this.buildTree(array, start, half - 1);
    node.rightNode = this.buildTree(array, half + 1, end);

    // Final call returns the root node
    return node;
  }

  // A method provided by the Odin Project to print the binary tree in a well formatted manner
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

  // Inserts a new node with the specified value
  insert(value, root = this.root) {
    /* Traverses down the tree to find an empty spot and create a new node. 
    Otherwise, recursively calls itself until it does */
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

  // Deletes the node with specified value
  delete(value, root = this.root) {
    // If the root is null, the value does not exist
    if (root === null) return root;

    /* Traverses down the tree recursively until it find the specified value. To delete the value, the nodes 
    from the deleted value must be rearranged with the minimum of the right nodes replacing the deleted value */
    if (value < root.data) {
      root.leftNode = this.delete(value, root.leftNode);
    } else if (value > root.data) {
      root.rightNode = this.delete(value, root.rightNode);
    } else {
      if (root.leftNode === null) return root.rightNode;

      if (root.rightNode === null) return root.leftNode;

      // Finds the minimum value of the nodes to the right of the deleted node
      root.data = this.minValue(root.rightNode);

      root.rightNode = this.delete(root.data, root.rightNode);
    }

    return root;
  }

  // Finds the minimum value from the children of the given node
  minValue(root) {
    let min = root.data;

    while (root.leftNode !== null) {
      min = root.leftNode.data;
      root = root.leftNode;
    }

    return min;
  }

  // Find and return the specified node
  find(value, root = this.root) {
    // If the root is null, the node does not exist
    if (root === null) return null;

    let searchNode = root;

    // Traverse the tree recursively until the node is found
    if (value < root.data) {
      searchNode = this.find(value, root.leftNode);
    } else if (value > root.data) {
      searchNode = this.find(value, root.rightNode);
    }
    return searchNode;
  }

  // Return the binary tree as an array in level order notation
  levelOrder(root = this.root, callback = this.toArray) {
    const levelOrderArray = [];

    // If the root is null, the bottom of the tree has been reached
    if (root === null) return;

    const queue = [];
    callback(queue, root);

    /* To get elements in level order, a queue must be formed of discovered nodes and 
    their children. Once visited, the node must be removed from the queue */
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

  // Returns the binary tree as an array in inorder notation
  inorder(root = this.root, callback = this.toArray) {
    let inorderArray = [];
    // If the root is null, return an empty array
    if (root === null) return inorderArray;

    // Recursively traverse and add nodes to the array in Left>Data>Right order
    inorderArray = this.inorder(root.leftNode).concat(inorderArray);
    callback(inorderArray, root.data);
    inorderArray = inorderArray.concat(this.inorder(root.rightNode));

    return inorderArray;
  }

  // Returns the binary tree as an array in preorder notation
  preorder(root = this.root, callback = this.toArray) {
    let preorderArray = [];

    // If the root is null, return an empty array
    if (root === null) return preorderArray;

    // Recursively traverse and add nodes to the array in Data>Left>Right order
    callback(preorderArray, root.data);
    preorderArray = preorderArray.concat(this.preorder(root.leftNode));
    preorderArray = preorderArray.concat(this.preorder(root.rightNode));

    return preorderArray;
  }

  // Returns the binary tree as an array in postorder notation
  postorder(root = this.root, callback = this.toArray) {
    let postorderArray = [];

    // If the root is null, return an empty array
    if (root === null) return postorderArray;

    // Recursively traverse and add nodes to the array in Left>Right>Data order
    postorderArray = this.postorder(root.leftNode).concat(postorderArray);
    postorderArray = postorderArray.concat(this.postorder(root.rightNode));
    callback(postorderArray, root.data);

    return postorderArray;
  }

  // Return the longest path from the specified node to a leaf node
  height(value) {
    let node;

    // The value is passed as a number to represent the node, this must be converted to a node object
    if (typeof value === "number") {
      node = this.find(value);
      if (node === null) return null;
    } else {
      node = value;
    }

    // The leaf node has been reached if the node is null
    if (node === null) return -1;

    // Recursively call itself to find which the longest path to a leaf node
    const leftHeight = this.height(node.leftNode);
    const rightHeight = this.height(node.rightNode);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  // Return the longest path from the root node to the specified node
  depth(value, root = this.root) {
    let depthVal = 0;

    // If the root is null, the value does not exist
    if (root === null) return null;

    /* If the root data matches the value passed to the function, the 
    correct node has been reached and must traverse back up the tree */
    if (root.data === value) return 0;

    // Traverse down the tree recursively until a leaf node is reached
    if (value < root.data) depthVal = this.depth(value, root.leftNode);
    if (value > root.data) depthVal = this.depth(value, root.rightNode);

    return depthVal + 1;
  }

  // Returns a boolean to represent whether the current tree is balanced
  isBalanced() {
    /* The first element in the postorder array will be the left leaf node. Using that, traverse 
    down the array recursively to give the height of the right half and left half of the tree */
    const postorderArray = this.postorder();
    const leftHalfHeight = this.depth(postorderArray[0]);

    /* The last element in the level order array will be the right leaf node */
    const levelOrderArray = this.levelOrder();
    const rightHalfHeight = this.depth(
      levelOrderArray[levelOrderArray.length - 1]
    );

    /* To qualify as balanced, the difference between the left 
    and right halves of the tree must be no larger than one */
    const heightDifference = Math.abs(leftHalfHeight - rightHalfHeight);

    if (heightDifference > 1) return false;

    return true;
  }

  // Creates a rebalanced tree after new nodes have been added to the tree
  rebalance() {
    // The inorder method will sort the array
    const inorderArray = this.inorder();

    // A new tree must be built with the new sorted array
    this.array = inorderArray;
    this.root = this.buildTree(inorderArray, 0, inorderArray.length - 1);
  }
}
