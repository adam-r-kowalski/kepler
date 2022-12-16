import { faker } from "@faker-js/faker"
import { createSignal, JSXElement } from "solid-js"

import { Backend, BackendContext, Response } from "./Backend"
import { createKey } from "./key"

interface Props {
  children: JSXElement
}

export const MockBackend = (props: Props) => {
  const key = createKey()
  const backend: Backend = {
    key,
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
