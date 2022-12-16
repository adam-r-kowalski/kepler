import { JSXElement } from "solid-js"

import { useProfile } from "../Profile"

import { Backend, BackendContext, Response } from "./Backend"

interface Props {
    children: JSXElement
}

export const ChatGPTBackendProvider = (props: Props) => {
    const profile = useProfile()!
    const authorization = () => `Bearer ${profile.key()}`
    const modelAndTokens = () => {
        switch (profile.model()) {
            case "ada":
                return ["text-ada-001", 2000]
            case "babbage":
                return ["text-babbage-001", 2000]
            case "curie":
                return ["text-curie-001", 2000]
            case "davinci":
                return ["text-davinci-003", 4000]
            case "codex":
                return ["code-davinci-002", 8000]
            default:
                return ["text-ada-001", 2000]
        }
    }
    const backend: Backend = {
        send: async (text: string): Promise<Response> => {
            const [model, max_tokens] = modelAndTokens()
            const headers = {
                "Content-Type": "application/json",
                Authorization: authorization(),
            }
            const body = JSON.stringify({
                model,
                prompt: text,
                max_tokens,
                temperature: 0.0,
            })
            const result = await fetch(
                "https://api.openai.com/v1/completions",
                {
                    method: "POST",
                    headers,
                    body,
                }
            )
            console.log(result)
            const data = await result.json()
            console.log(data)
            if ("error" in data) {
                return { kind: "rate limit" }
            }
            return {
                kind: "success",
                text: (data.choices[0].text as string).trim(),
            }
        },
    }
    return (
        <BackendContext.Provider value={backend}>
            {props.children}
        </BackendContext.Provider>
    )
}
