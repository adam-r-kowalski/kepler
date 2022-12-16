import { faker } from "@faker-js/faker"
import { OpenAI } from "openai-api"

import { LanguageModel, type OnMessage } from "./LanguageModel"

const openai = new OpenAI("<api_key>")

export class Gpt3LanguageModel {
    callbacks: OnMessage[]

    constructor() {
        this.callbacks = []
    }

    async send(text: string) {
        const gptResponse = await openai.complete({
            engine: 'davinci',
            prompt: text,
            maxTokens: 50,
            temperature: 0.7,
            topP: 1,
            presencePenalty: 0,
            frequencyPenalty: 0.5,
            bestOf: 1,
            n: 1
        });
        const response = gptResponse.data.choices[0].text
        this.callbacks.forEach((callback) => {
            callback(response)
        })
    }

    onreceive(callback: OnMessage) {
        this.callbacks.push(callback)
    }
}
