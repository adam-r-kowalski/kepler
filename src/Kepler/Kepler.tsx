import { createSignal, For, Match, Switch } from "solid-js"
import { faker } from "@faker-js/faker"

import style from "./Kepler.module.css"
import { Messages } from "../Messages"
import { Received } from "../Received"
import { Prompt } from "../Prompt"
import { Sent } from "../Sent"
import { Backend } from "../Backend"
import { Toolbar } from "../Toolbar"

interface Message {
    kind: "sent" | "received"
    text: string
}

interface Props {
    backend: Backend
}

export const Kepler = (props: Props) => {
    const [messages, setMessages] = createSignal<Message[]>([])
    const [needsToScroll, setNeedsToScroll] = createSignal(false)
    const send = (text: string) => {
        setMessages([...messages(), { kind: "sent", text }])
        props.backend.send(text)
        setNeedsToScroll(true)
    }
    props.backend.onreceive((text) => {
        setMessages([...messages(), { kind: "received", text }])
    })
    for (let i = 0; i < 20; ++i) {
        send(faker.lorem.sentence())
    }
    return (
        <>
            <div class={style.kepler}>
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
