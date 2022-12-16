import { createSignal, For, Match, Switch } from "solid-js"

import style from "./Thread.module.css"
import { Messages } from "../Messages"
import { Received } from "../Received"
import { Prompt } from "../Prompt"
import { Sent } from "../Sent"
import { useBackend } from "../Backend/Backend"

interface Message {
    kind: "sent" | "received"
    text: string
}

export const Thread = () => {
    const [messages, setMessages] = createSignal<Message[]>([])
    const [needsToScroll, setNeedsToScroll] = createSignal(false)
    const backend = useBackend()!
    const send = async (text: string) => {
        setMessages([...messages(), { kind: "sent", text }])
        setNeedsToScroll(true)
        const received = await backend.send(text)
        setMessages([...messages(), { kind: "received", text: received }])
    }
    return (
        <div class={style.thread}>
            <Messages
                scroll={needsToScroll}
                scrolled={() => setNeedsToScroll(false)}
            >
                <div style={{ height: "100px" }} />
                <For each={messages()}>
                    {(message) => {
                        return (
                            <Switch>
                                <Match when={message.kind === "sent"}>
                                    <Sent>{message.text}</Sent>
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
