import { faker } from "@faker-js/faker"

import { LanguageModel, type OnMessage } from "./LanguageModel"

export class MockLanguageModel {
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
