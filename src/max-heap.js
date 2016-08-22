const Node = require('./node');

class MaxHeap {
    constructor() {
        this.root = null;
        this.parentNodes = [];
        this.countNodes = 0;
    }

    push(data, priority) {
        let newNode = new Node(data, priority);

        this.insertNode(newNode);
        this.shiftNodeUp(newNode);
        this.countNodes++;
    }

    pop() {
        if (this.isEmpty()) return;

        let detached = this.detachRoot();

        this.restoreRootFromLastInsertedNode(detached);

        this.shiftNodeDown(this.root);

        this.countNodes--;

        return detached.data;
    }

    detachRoot() {

        let detached = this.root,
            rootIndex = this.parentNodes.indexOf(detached);

        if (rootIndex != -1) this.parentNodes.splice(rootIndex, 1); /// delete root from parentsNodes[];

        this.root = null;

        return detached;
    }

    restoreRootFromLastInsertedNode(detached) {

        let lastInsertedNode = this.parentNodes[this.parentNodes.length - 1];

        if (!lastInsertedNode) return;


        if (lastInsertedNode.parent && (lastInsertedNode.parent !== detached)) {  /// correct parentNodes

            let parent = lastInsertedNode.parent;
            this.parentNodes.unshift(parent);

            lastInsertedNode.parent.removeChild(lastInsertedNode);
        }


        if (lastInsertedNode != detached.left) lastInsertedNode.left = detached.left;   /// correct newRoot
        if (lastInsertedNode != detached.right) lastInsertedNode.right = detached.right;
        if (lastInsertedNode.left) lastInsertedNode.left.parent = lastInsertedNode;
        if (lastInsertedNode.right) lastInsertedNode.right.parent = lastInsertedNode;


        if (lastInsertedNode.left && lastInsertedNode.right) {  /// correct parentNodes
            this.parentNodes.pop();
        } else {
            this.parentNodes.unshift(this.parentNodes.pop());
        }

        this.root = lastInsertedNode;
    }

    size() {
        return this.countNodes;
    }

    isEmpty() {
        return (!this.root && this.parentNodes.length == 0);
    }

    clear() {
        this.root = null;
        this.parentNodes = [];
        this.countNodes = 0;
    }

    insertNode(node) {

        if (this.isEmpty()) {
            this.root = node;

        } else {

            let firstParent = this.parentNodes[0];

            firstParent.appendChild(node);

            if (!!firstParent.left && !!firstParent.right) this.parentNodes.splice(0, 1);

        }

        this.parentNodes.push(node);
    }


    shiftNodeUp(node) {
        if (!node.parent) {
            this.root = node; /// exit from recursion

        } else if (node.priority > node.parent.priority) {

            let parentIndx = this.parentNodes.indexOf(node.parent); /// correct parentNodes
            let nodeIndx = this.parentNodes.indexOf(node);

            if (parentIndx != -1) this.parentNodes[parentIndx] = node;
            if (nodeIndx != -1) this.parentNodes[nodeIndx] = node.parent;

            node.swapWithParent();

            this.shiftNodeUp(node); /// recursively call

        }
    }

    shiftNodeDown(node) {
        if (!node) return;

        let maxPriority = node.priority;

        let swapNode; /// choose replacing child 

        if (node.left && node.left.priority > maxPriority) {
            swapNode = node.left;
            maxPriority = node.left.priority;
        }
        if (node.right && node.right.priority > maxPriority) {
            swapNode = node.right;
            maxPriority = node.right.priority;
        }
        if (!swapNode) return; /// exit from recursion

        swapNode.swapWithParent();

        if (swapNode.priority > this.root.priority && node === this.root) this.root = swapNode; /// correct heap.root

        let childIndx = this.parentNodes.indexOf(swapNode); /// correct parentNodes
        let nodeIndx = this.parentNodes.indexOf(node);

        if (childIndx != -1) this.parentNodes[childIndx] = node;
        if (nodeIndx != -1) this.parentNodes[nodeIndx] = swapNode;

        this.shiftNodeDown(node); /// recursively call

    }

}

module.exports = MaxHeap;
