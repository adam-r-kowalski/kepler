import { faker } from "@faker-js/faker"
import { JSXElement } from "solid-js"

import { Backend, BackendContext, Response } from "./Backend"

interface Props {
    children: JSXElement
}

export const MockBackendProvider = (props: Props) => {
    const backend: Backend = {
        send: async (text: string): Promise<Response> => {
            return {
                kind: "success",
                text: faker.lorem.sentence(),
            }
        },
    }
    return (
        <BackendContext.Provider value={backend}>
            {props.children}
        </BackendContext.Provider>
    )
}
