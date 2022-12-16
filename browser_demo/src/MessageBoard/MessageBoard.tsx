import { createSignal, For, Match, Switch } from "solid-js"

import style from "./MessageBoard.module.css"
import { Messages } from "../Messages"
import { Received } from "../Received"
import { Prompt } from "../Prompt"
import { Sent } from "../Sent"
import { Kepler } from "../Kepler"
import { Toolbar } from "../Toolbar"

interface Message {
    kind: "sent" | "received"
    text: string
}

interface Prop {
    kepler_ws: string
}

export const MessageBoard = (prop: Prop) => {
    const [messages, setMessages] = createSignal<Message[]>([])
    const [needsToScroll, setNeedsToScroll] = createSignal(false)
    const kepler_ws = new WebSocket(prop.kepler_ws)
    const send = (text: string) => {
        setMessages([...messages(), { kind: "sent", text }])
        kepler_ws.send(text)
        setNeedsToScroll(true)
    }
    kepler_ws.onmessage = (event) => {
        setMessages([...messages(), { kind: "received", text: event.data }])
    }
    return (
        <>
            <div class={style.message_board}>
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
            <Toolbar />
        </>
    )
}
