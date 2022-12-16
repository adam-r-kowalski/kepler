import { createSignal, For, Match, Switch } from "solid-js"
import { createStore, produce } from "solid-js/store"

import style from "./Thread.module.css"
import { Messages } from "../Messages"
import { Received } from "../Received"
import { Prompt } from "../Prompt"
import { Sent } from "../Sent"
import { useBackend } from "../Backend/Backend"
import { RateLimit } from "../RateLimit"

interface Message {
    kind: "sent" | "received" | "rate limit"
    text: string
}

export const Thread = () => {
    const [messages, setMessages] = createStore<Message[]>([])
    const [needsToScroll, setNeedsToScroll] = createSignal(false)
    const backend = useBackend()!
    const send = async (text: string) => {
        const index = messages.length
        setMessages(
            produce((messages) => messages.push({ kind: "sent", text }))
        )
        setNeedsToScroll(true)
        const received = await backend.send(text)
        switch (received.kind) {
            case "rate limit":
                setMessages(index, "kind", "rate limit")
                break
            case "success":
                setMessages(
                    produce((messages) =>
                        messages.push({ kind: "received", text: received.text })
                    )
                )
                break
        }
    }
    return (
        <div class={style.thread}>
            <Messages
                scroll={needsToScroll}
                scrolled={() => setNeedsToScroll(false)}
            >
                <div style={{ height: "100px" }} />
                <For each={messages}>
                    {(message) => {
                        return (
                            <Switch>
                                <Match when={message.kind === "sent"}>
                                    <Sent>{message.text}</Sent>
                                </Match>
                                <Match when={message.kind === "rate limit"}>
                                    <RateLimit>{message.text}</RateLimit>
                                </Match>
                                <Match when={message.kind === "received"}>
                                    <Received>{message.text}</Received>
                                </Match>
                            </Switch>
                        )
                    }}
                </For>
            </Messages>
            <div style={{ height: "20px", "min-height": "20px" }} />
            <Prompt onSend={send} />
        </div>
    )
}
