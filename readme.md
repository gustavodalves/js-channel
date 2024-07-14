# js-channel-buffer

`js-channel-buffer` is a JavaScript/TypeScript library that provides utilities for creating asynchronous communication channels, including buffer support. This library allows you to send and receive messages between different parts of your code efficiently.

## Installation

You can install `js-channel-buffer` via npm:

```bash
npm install js-channel-buffer
```

- **Channel Class**

***Properties***
-`bufferSize`: The buffer size that defines how many messages can be stored in the channel before blocking the send operation.

***Methods***
- `send(value: T)`: Promise<void>: Adds a new message to the channel and starts task execution if there is available buffer space.
`receive(): Promise<T>`: Returns a message from the channel. If no messages are available, waits until a message is sent.

### Example Usage

```javascript
async function producer(ch: Channel<number>) {
    for (let i = 0; i < 10; i++) {
        console.log('Sending:', i);
        await ch.send(i);
    }
}

async function consumer(ch: Channel<number>) {
    for (let i = 0; i < 10; i++) {
        const value = await ch.receive();
        console.log('Receiving:', value);
    }
}

const ch = new Channel<number>(3);

producer(ch);
consumer(ch);
```

This `README.md` file provides a comprehensive overview of how to use the `js-routine-concurrency` package, including installation, usage, and a detailed explanation of how the `WorkerPool` class works.

## License

MIT License

All rights reserved to Gustavo Duarte Alves
