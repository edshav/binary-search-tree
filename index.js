class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class BST {
    constructor() {
        this.root = null;
    }
    add(data) {
        const node = this.root;
        if (node === null) {
            this.root = new Node(data);
            return true;
        } else {
            const searchTree = (node) => {
                if (data < node.data) {
                    if (node.left === null) {
                        node.left = new Node(data);
                        return true;
                    } else {
                        return searchTree(node.left);
                    }
                } else if (data > node.data) {
                    if (node.right === null) {
                        node.right = new Node(data);
                        return true;
                    } else {
                        return searchTree(node.right);
                    }
                } else {
                    return false;
                }
            };
            return searchTree(node);
        }
    }
    inOrder() {
        const arr = [];
        const inOrderTraversal = (node) => {
            if (node === null) {
                return;
            }
            inOrderTraversal(node.left);
            arr.push(node.data);
            inOrderTraversal(node.right);
        };
        inOrderTraversal(this.root);
        return arr;
    }
    isPresent(value) {
        let current = this.root;
        while (current) {
            if (current.data === value) {
                return true;
            } else if (current.data > value) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return false;
    }
    maxValue(node = this.root) {
        let current = node;
        while (current.right) {
            current = current.right;
        }
        return current.data;
    }
    minValue(node = this.root) {
        let current = node;
        while (current.left) {
            current = current.left;
        }
        return current.data;
    }
    remove(value, node = this.root, parent) {
        if (node === null) {
            return false;
        }
        if (value < node.data) {
            return this.remove(value, node.left, node);
        } else if (value > node.data) {
            return this.remove(value, node.right, node);
        } else {
            if (node.left && node.right) {
                node.data = this.maxValue(node.left);
                this.remove(node.data, node.left, node);
            } else if (parent.left === node) {
                parent.left = node.left ? node.left : node.right;
            } else {
                parent.right = node.left ? node.left : node.right;
            }
            return true;
        }
    }

}

const bst = new BST();
bst.add(9);
bst.add(4);
bst.add(17);
bst.add(3);
bst.add(6);
bst.add(22);
bst.add(5);
bst.add(7);
bst.add(20);
console.log(bst.inOrder());
console.log(bst.maxValue());
console.log(bst.minValue());
console.log('root', bst.root.data);
console.log(bst.remove(bst.root.data));
console.log('root', bst.root.data);
console.log(bst.inOrder());