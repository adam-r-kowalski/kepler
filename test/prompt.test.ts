import { test, expect } from "vitest"
import { prompt } from "../src/Conversations/ConversationsContext"

test("prompt with one message", () => {
    const actual = prompt([
        {
            kind: "sent",
            text: "How are you today?",
        },
    ])
    const expected = `
You are a highly intelligent, creative and helpful AI.
Respond to the user with an answer formatted as markdown.

User: How are you today?

AI:`.trim()
    expect(actual).toEqual(expected)
})

test("prompt with two messages", () => {
    const actual = prompt([
        {
            kind: "sent",
            text: "How are you today?",
        },
        {
            kind: "received",
            text: "I'm good, thanks!",
        },
        {
            kind: "sent",
            text: "What should I work on today?",
        },
    ])
    const expected = `
You are a highly intelligent, creative and helpful AI.
Respond to the user with an answer formatted as markdown.

User: How are you today?

AI: I'm good, thanks!

User: What should I work on today?

AI:`.trim()
    expect(actual).toEqual(expected)
})
