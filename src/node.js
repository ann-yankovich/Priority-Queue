class Node {
    constructor(data, priority) {
        this.data = data,
            this.priority = priority,
            this.parent = this.left = this.right = null;
    }

    appendChild(node) {
        if (!node) return;

        if (!this.left) {
            this.left = node;
            this.left.parent = this;

        } else if (!this.right) {
            this.right = node;
            this.right.parent = this;
        }
    }

    removeChild(node) {
        if (!node) return this;

        if (this.left === node) {
            node.parent = null;
            this.left = null;

        } else if (this.right === node) {
            node.parent = null;
            this.right = null;

        } else {
            throw new Error('passed node is not a child of this node');
        }
    }

    remove() {

        if (!this.parent) return this;
        this.parent.removeChild(this);

    }

    swapWithParent() {
        if (!this.parent) return;

        let parent = this.parent,
            parentOfParent = this.parent.parent,
            child = this,
            childLeft = this.left,
            childRight = this.right;

        let parentChildPosition, childPosition;
        if (child == parent.left) {
            parentChildPosition = 'right';
            childPosition = 'left';

        } else if (child == parent.right) {
            parentChildPosition = 'left';
            childPosition = 'right';

        }
        let parentChild = parent[parentChildPosition];

        if (parentOfParent) {
            parentOfParent.removeChild(parent);
            parentOfParent.appendChild(this);
        } else {
            this.parent = null;
        }

        this[childPosition] = parent;
        this[childPosition].parent = this;

        this[parentChildPosition] = parentChild;
        if (parentChild) parentChild.parent = this;

        this[childPosition].left = childLeft;
        if (childLeft) this[childPosition].left.parent = this[childPosition];
        this[childPosition].right = childRight;
        if (childRight) this[childPosition].right.parent = this[childPosition];

    }

}

module.exports = Node;
