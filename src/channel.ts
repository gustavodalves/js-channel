import { Queue } from "./queue";

export class Channel<T> {
    private queue = new Queue<T>();
    private waiting = new Queue<((value: T) => void)>;

    constructor(private readonly bufferSize: number) {}

    async send(value: T): Promise<void> {
        if (!this.waiting.isEmpty()) {
            const resolve = this.waiting.dequeue();
            resolve!(value);
        } else if (this.queue.length < this.bufferSize) {
            this.queue.enqueue(value);
        } else {
            return new Promise<void>(resolve => {
                const interval = setInterval(() => {
                    if (this.waiting.length > 0) {
                        clearInterval(interval);
                        const resolveWaiting = this.waiting.dequeue();
                        resolveWaiting!(value);
                        resolve();
                    }
                }, 1);
            });
        }
    }

    async receive(): Promise<T> {
        if (this.queue.length > 0) {
            return this.queue.dequeue()!;
        } else {
            return new Promise<T>(resolve => {
                this.waiting.enqueue(resolve);
            });
        }
    }
}