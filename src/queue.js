const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		maxSize ? this.maxSize = maxSize : this.maxSize = 30;
		this.heap = new MaxHeap;
		this.count = 0;
	}

	push(data, priority) {
		if (this.count < this.maxSize){
			this.heap.push(data, priority);
			this.count++;
		}
		else throw new QueueException("queue size overflow.");
	}

	shift() {
		if (this.count === 0){
			throw new QueueException("queue is empty.")
		}
		else {
			this.count--;
			return this.heap.pop();
		}

	}

	size() {
		return this.count;
	}

	isEmpty() {
		return this.count === 0;
	}
}
class QueueException{
	constructor(message){
		this.message = message;
		this.name = "Queue error: "
	}
}

module.exports = PriorityQueue;
