import { faker } from "@faker-js/faker"
import { Message } from "../Conversations/Context"

import { Backend } from "./Backend"

export const createMockBackend = (): Backend => ({
    send: async (text: string, summary: string): Promise<Message> => {
        return {
            kind: "received",
            text: faker.lorem.sentence(),
            summary: faker.lorem.sentence(),
        }
    },
})
