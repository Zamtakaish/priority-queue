class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (node !== null){
			if (this.left === null){
				this.left = node;
				node.parent = this;
			}
			else if (this.right === null){
				this.right = node;
				node.parent = this;
			}
		}
	}

	removeChild(node) {
		if (this.right === node) {
			this.right = null;
			node.parent = null;
		} else if (this.left === node) {
			this.left = null;
			node.parent = null;
		} else throw new NodeException("not a child.");
	}

	remove() {
		if (this.parent !== null){
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		if (this.parent !== null){
			let temp = clone(this.parent);
			this.parent.left = null;
			this.parent.appendChild(this.left);
			this.parent.right = null;
			this.parent.appendChild(this.right);
			this.parent.parent = this;
			if (temp.parent !== null){
				(temp.parent.left === this.parent) ? temp.parent.left = this : temp.parent.right = this;
			}
			if (temp.left === this){
				this.left = this.parent;
				this.right = temp.right;
				if (temp.right !== null){
					temp.right.parent = this;
				}
			}
			else {
				this.right = this.parent;
				this.left = temp.left;
				if (temp.left !== null)
				{
					temp.left.parent = this;
				}
			}
			this.parent = temp.parent;
			temp = null;
		}
	}
}

function clone(node){
	let temp = new Node(0, 0);
	temp.parent = node.parent;
	temp.right = node.right;
	temp.left = node.left;
	return temp;
}

class NodeException{
	constructor(message){
		this.message = message;
		this.name = "Node error: "
	}
}

module.exports = Node;
