import { findInsertIndex } from './find-insert-index';
import { insertAtIndex } from './insert-at-index';

export type EnqueuedPayload<T> = {
    payload: T;
    priority?: number;
};

export class PriorityQueue<T> {
    private readonly queue: EnqueuedPayload<T>[] = [];

    async enqueue(payload: T, priority?: number) {
        const priorities = this.queue.map(job => job.priority) as number[];
        const position = findInsertIndex(priorities, priority);
        insertAtIndex({ payload, priority }, position, this.queue);
    }

    dequeue() {
        return this.queue.shift();
    }

    size() {
        return this.queue.length;
    }

    isEmpty() {
        return this.size() === 0;
    }

    clear() {
        this.queue.length = 0;
    }

    front() {
        return this.queue[0];
    }

    back() {
        return this.queue[this.queue.length - 1];
    }

    toArray() {
        return this.queue.map(item => item.payload);
    }
}
