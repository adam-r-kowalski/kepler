import { useProfile } from "../Profile"

import { Backend, Response } from "./Backend"

export const createOpenAIBackend = (): Backend => {
    const profile = useProfile()!
    const authorization = () => `Bearer ${profile.key()}`
    return {
        send: async (prompt: string): Promise<Response> => {
            const headers = {
                "Content-Type": "application/json",
                Authorization: authorization(),
            }
            const body = {
                model: "text-davinci-003",
                prompt,
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
                return { kind: "rate limit" }
            }
            return {
                kind: "success",
                text: (data.choices[0].text as string).trim(),
            }
        },
    }
}
