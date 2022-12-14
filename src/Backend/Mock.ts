import { faker } from "@faker-js/faker"

import { Backend, Response } from "./Backend"

export const createMockBackend = (): Backend => ({
    send: async (prompt: string): Promise<Response> => {
        return {
            kind: "success",
            text: faker.lorem.sentence(),
        }
    },
})
