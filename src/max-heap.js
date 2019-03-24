const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
	}

	push(data, priority) {
		let newNode = new Node(data, priority);
		this.insertNode(newNode);
		this.shiftNodeUp(newNode);
	}

	pop() {
		if (this.parentNodes.length !== 0){
			this.detachRoot();
			return this.root;
		}
	}

	detachRoot() {
		let node = this.root;
		this.root = null;
		this.parentNodes = this.parentNodes.slice(1);
		return node;
	}

	restoreRootFromLastInsertedNode(detached) {
		let newRoot = this.parentNodes[this.parentNodes.length -1];
		newRoot.parent.removeChild(newRoot);
		newRoot.left = detached.left;
		if(newRoot.left !== null){
			detached.left.parent = newRoot;
		}
		newRoot.right = detached.right;
		if(newRoot.right !== null){
			detached.right.parent = newRoot;
		}
		this.root = newRoot;
	}

	size() {
		return this.parentNodes.length;
	}

	isEmpty() {
		return this.root === null;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
	}

	insertNode(node) {
		if (this.root === null){
			this.root = node;
			this.parentNodes.push(node);
		}
		else{
			let newNodeIndex = this.parentNodes.push(node);
			let parentIndex = Math.floor(newNodeIndex / 2) - 1
			this.parentNodes[parentIndex].appendChild(this.parentNodes[newNodeIndex - 1]);
		}
	}

	shiftNodeUp(node) {
		if (node.parent !== null){
			if(node.priority > node.parent.priority){
				let child = this.parentNodes.indexOf(node);
				let parent = this.parentNodes.indexOf(node.parent);
				let temp = this.parentNodes[parent];
				this.parentNodes[parent] = this.parentNodes[child];
				this.parentNodes[child] = temp;
				node.swapWithParent();
				this.shiftNodeUp(node);
			}
		}
		else this.root = node;
	}

	shiftNodeDown(node) {
		let higherNode;

		if (node.right !== null){
			(node.left.priority >= node.right.priority) ? higherNode = node.left : higherNode = node.right;
			if (higherNode.priority > node.priority){
				higherNode.swapWithParent();
				this.shiftNodeDown(node);
				this.root = higherNode;
			}
		}
		else if (node.left !== null){
			if (node.left.priority > node.priority){
				node.left.swapWithParent();
				this.shiftNodeDown(node);
				this.root = node.left;
			}
		}
	}
}

module.exports = MaxHeap;
