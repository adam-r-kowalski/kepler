import { createSignal, For, Match, Switch } from "solid-js"
import { faker } from "@faker-js/faker"

import { LanguageModel } from "./LanguageModel"

type OnMessage = (text: string) => void

const [last_response, respond] = createSignal<string>("")

export class Kepler {
    callbacks: OnMessage[]
    backend: LanguageModel

    constructor(public backend: LanguageModel) {
        this.callbacks = []
        this.backend = backend
        this.backend.onreceive((text) => {
            console.log(text)
            respond(text)
        })
    }

    send(text: string) {
        this.backend.send(text)
        this.callbacks.forEach((callback) => {
            callback(last_response())
        })
    }
    onreceive(callback: OnMessage) {
        this.callbacks.push(callback)
    }
}
