class Node<T> {
    constructor(public data: T, public next: Node<T> | null = null) {}
}

class LinkedList<T> {
    public count = 0;
    public head: Node<T> | null = null;
    public tail: Node<T> | null = null;

    insert(data: T) {
        const node = new Node<T>(data, this.head);

        if (this.count === 0) {
            this.tail = node;
        }

        this.head = node;
        this.count++;
    }

    append(data: T) {
        const node = new Node<T>(data, null);

        if (this.count === 0) {
            this.head = node;
            this.tail = node;
        } else {
            if (this.tail) {
                this.tail.next = node;
            }
            this.tail = node;
        }

        this.count++;
    }

    removeHead(): Node<T> | null {
        if (!this.head) {
            return null;
        }

        const remove = this.head;
        this.head = this.head.next;
        if (this.count === 1) {
            this.tail = null;
        }

        this.count--;
        return remove;
    }

    removeTail(): Node<T> | null {
        if (!this.head) {
            return null;
        }

        if (this.count === 1) {
            return this.removeHead();
        }

        let current = this.head;
        let previous: Node<T> | null = null;

        while (current.next !== null) {
            previous = current;
            current = current.next;
        }

        if (previous) {
            previous.next = null;
        }

        this.tail = previous;
        this.count--;

        return current;
    }

    removeNode(element: T): Node<T> | null {
        if (!this.head) {
            return null;
        }

        if (this.head.data === element) {
            return this.removeHead();
        }

        let current: Node<T> | null= this.head;
        let previous: Node<T> | null = null;

        while (current !== null && current.data !== element) {
            previous = current;
            current = current.next;
        }

        if (current === null) {
            return null;
        }

        if (previous) {
            previous.next = current.next;
        }

        if (current === this.tail) {
            this.tail = previous;
        }

        this.count--;
        return current;
    }

    getNode(value: T): Node<T> | null {
        let current = this.head;

        while (current !== null) {
            if (current.data === value) {
                return current;
            }

            current = current.next;
        }

        return null;
    }

    isEmpty() {
        return !this.count
    }
}

export class Queue<T> {
    private items: LinkedList<T> = new LinkedList<T>();

    enqueue(item: T): void {
        this.items.insert(item);
    }

    dequeue(): T | undefined {
        return this.items.removeTail()?.data;
    }

    isEmpty(): boolean {
        return !this.items.head;
    }

    get length() {
        return this.items.count
    }
}
