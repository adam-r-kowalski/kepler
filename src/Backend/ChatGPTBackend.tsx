import { JSXElement } from "solid-js"

import { Backend, BackendContext, Response } from "./Backend"
import { createKey } from "./key"

interface Props {
  children: JSXElement
}

export const ChatGPTBackend = (props: Props) => {
  const key = createKey()
  const Authorization = () => `Bearer ${key.current()}`
  const backend: Backend = {
    key,
    send: async (text: string): Promise<Response> => {
      const headers = {
        "Content-Type": "application/json",
        Authorization: Authorization(),
      }
      const body = JSON.stringify({
        model: "text-davinci-003",
        prompt: text,
        max_tokens: 150000,
        temperature: 0.0,
      })
      const result = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers,
        body,
      })
      console.log(result)
      const data = await result.json()
      console.log(data)
      if ("error" in data) {
        return { kind: "rate limit" }
      }
      return {
        kind: "success",
        text: data.choices[0].text,
      }
    },
  }
  return (
    <BackendContext.Provider value={backend}>
      {props.children}
    </BackendContext.Provider>
  )
}
