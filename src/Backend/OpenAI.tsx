import { Message } from "../Conversations/Context"
import { useProfile } from "../Profile"

import { Backend } from "./Backend"

const modelAndTokens = (model: string) => {
    switch (model) {
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

const prompt = (text: string, summary: string): string => {
    return `
    Respond to each question only with JSON that looks like this:

    {
        "answer": "the answer to the question formatted as markdown",
        "summary": "a summary of the conversation",
    }

    Current Summary: ${summary}

    Question: ${text}

    Answer:`
}

export const createOpenAIBackend = (): Backend => {
    const profile = useProfile()!
    const authorization = () => `Bearer ${profile.key()}`
    return {
        send: async (text: string, summary: string): Promise<Message> => {
            const [model, max_tokens] = modelAndTokens(profile.model())
            const headers = {
                "Content-Type": "application/json",
                Authorization: authorization(),
            }
            const body = {
                model,
                prompt: prompt(text, summary),
                max_tokens,
                temperature: 0.0,
            }
            console.log(body)
            const result = await fetch(
                "https://api.openai.com/v1/completions",
                {
                    method: "POST",
                    headers,
                    body: JSON.stringify(body),
                }
            )
            console.log(result)
            const data = await result.json()
            console.log(data)
            if ("error" in data) {
                return { kind: "rate limit", text }
            }
            return {
                kind: "received",
                text: (data.choices[0].text as string).trim(),
                summary: "",
            }
        },
    }
}
