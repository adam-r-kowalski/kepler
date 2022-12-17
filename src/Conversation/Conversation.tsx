import { For, Match, Switch } from "solid-js"
import { createStore, produce } from "solid-js/store"

import style from "./Conversation.module.css"
import { Received } from "../Received"
import { Prompt } from "../Prompt"
import { Sent } from "../Sent"
import { useBackend } from "../Backend/Backend"
import { RateLimit } from "../RateLimit"

interface Message {
    kind: "sent" | "received" | "rate limit"
    text: string
}

export const Conversation = () => {
    const [messages, setMessages] = createStore<Message[]>([])
    const backend = useBackend()!
    let ref: HTMLElement | undefined = undefined
    const send = async (text: string) => {
        const index = messages.length
        setMessages(
            produce((messages) => messages.push({ kind: "sent", text }))
        )
        if (ref) {
            ref.scrollBy({ top: ref.scrollHeight, behavior: "smooth" })
        }
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
        <div class={style.conversation}>
            <div class={style.scrollable} ref={ref}>
                <div class={style.messages}>
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
                </div>
            </div>
            <div style={{ height: "20px", "min-height": "20px" }} />
            <Prompt onSend={send} />
        </div>
    )
}
