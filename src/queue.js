const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		this.maxSize = maxSize ? maxSize : 30;
		this.heap = new MaxHeap;
		this.currentSize = 0;
	}

	push(data, priority) {

		if( (this.currentSize + 1) > this.maxSize ) throw Error(' maxSize of queue! ');

		this.currentSize++;

		this.heap.push( data, priority );

	}

	shift() {

		if( this.currentSize == 0 ) throw Error(' queue is empty! ');

		this.currentSize--;
		
		return this.heap.pop();
	}

	size() {
		return this.currentSize;
	}

	isEmpty() {
		return this.heap.isEmpty();
	}
}

module.exports = PriorityQueue;
