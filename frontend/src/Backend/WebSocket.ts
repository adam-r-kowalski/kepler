import { type OnMessage } from "./Backend"

export class WebSocketBackend {
    socket: WebSocket

    constructor() {
        this.socket = new WebSocket("ws://localhost:6666")
    }

    send(text: string) {
        this.socket.send(text)
    }

    onreceive(callback: OnMessage) {
        this.socket.onmessage = (event) => {
            callback(event.data)
        }
    }
}
