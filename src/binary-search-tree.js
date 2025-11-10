const { NotImplementedError } = require('../lib/errors');
const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.treeRoot = null;
  }

  root() {
    return this.treeRoot;
  }

  add(data) {  
    this.treeRoot = addNewNode(this.treeRoot, data);

    function addNewNode(node, data) {
      if (!node) {
        return new Node(data);
      }

      if (node.data === data) {
        return node;
      }

      if (data < node.data) {
        node.left = addNewNode(node.left, data);
      } else {
        node.right = addNewNode(node.right, data);
      }

      return node;
    }
  }

  has(data) {
    return existsNode(this.treeRoot, data);

    function existsNode(node, data) {
      if (!node) {
        return false;
      }

      if (node.data === data) {
        return true;
      }

      return data < node.data ?
        existsNode(node.left, data) :
        existsNode(node.right, data);
    }
  }

  find(data) {
    return searchNode(this.treeRoot, data);

    function searchNode(node, data) {
      if (!node) {
        return null;
      }

      if (node.data === data) {
        return node;
      }

      return data < node.data ?
        searchNode(node.left, data) :
        searchNode(node.right, data);
    }
  }

  remove(data) {
    this.treeRoot = deleteNode(this.treeRoot, data);

    function deleteNode(node, data) {
      if (!node) {
        return null;
      }

      if (data < node.data) {
        node.left = deleteNode(node.left, data);
        return node;
      } else if (node.data < data) {
        node.right = deleteNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }

        if (!node.left) {
          node = node.right;
          return node;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }

        let rightMin = node.right;

        while (rightMin.left) {
          rightMin = rightMin.left;
        }

        node.data = rightMin.data;
        node.right = deleteNode(node.right, rightMin.data);

        return node;
      }
    }
  }

  min() {
    if (!this.treeRoot) {
      return;
    }

    let node = this.treeRoot;

    while (node.left) {
      node = node.left;
    }

    return node.data;
  }

  max() {
    if (!this.treeRoot) {
      return;
    }

    let node = this.treeRoot;

    while (node.right) {
      node = node.right;
    }

    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};