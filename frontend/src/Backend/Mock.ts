import { faker } from "@faker-js/faker"

import { Backend, type OnMessage } from "./Backend"

export class MockBackend {
    callbacks: OnMessage[]

    constructor() {
        this.callbacks = []
    }

    send(text: string) {
        const response = faker.lorem.sentence()
        this.callbacks.forEach((callback) => {
            callback(response)
        })
    }

    onreceive(callback: OnMessage) {
        this.callbacks.push(callback)
    }
}
