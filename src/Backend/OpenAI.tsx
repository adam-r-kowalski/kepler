import { Message } from "../Conversations/Context"
import { useProfile } from "../Profile"

import { Backend } from "./Backend"

const prompt = (text: string, summary: string): string => {
    return `
    Respond to each question only with JSON that looks like this:

    {
        "answer": "the answer to the question formatted as markdown",
        "summary": "a brief summary of the conversation",
    }

    Current Summary: ${summary}

    Question: ${text}

    Answer:`.trim()
}

export const createOpenAIBackend = (): Backend => {
    const profile = useProfile()!
    const authorization = () => `Bearer ${profile.key()}`
    return {
        send: async (text: string, summary: string): Promise<Message> => {
            const headers = {
                "Content-Type": "application/json",
                Authorization: authorization(),
            }
            const body = {
                model: "text-davinci-003",
                prompt: prompt(text, summary),
                max_tokens: 2000,
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
