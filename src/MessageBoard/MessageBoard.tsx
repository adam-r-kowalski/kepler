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

interface Props {
    kepler: Kepler
}

export const MessageBoard = (props: Props) => {
    const [messages, setMessages] = createSignal<Message[]>([])
    const [needsToScroll, setNeedsToScroll] = createSignal(false)
    const send = (text: string) => {
        setMessages([...messages(), { kind: "sent", text }])
        props.kepler.send(text)
        setNeedsToScroll(true)
    }
    props.kepler.onreceive((text) => {
        setMessages([...messages(), { kind: "received", text }])
    })
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
