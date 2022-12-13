import { createSignal, For, Match, Switch } from "solid-js"

import { Messages } from "./Messages"
import { Received } from "./Received"
import { Prompt } from "./Prompt"
import { Sent } from "./Sent"

interface Message {
    kind: "sent" | "received"
    text: string
}

export const App = () => {
    const [messages, setMessages] = createSignal<Message[]>([
        {
            kind: "sent",
            text: "Hi I'm Adam, who are you?",
        },
        {
            kind: "received",
            text: "Hey there! I'm a chatbot. I'm not very smart yet, but I'm learning.",
        },
    ])
    const onSend = (text: string) => {
        setMessages([...messages(), { kind: "sent", text }])
    }
    return (
        <div
            style={{
                display: "flex",
                "flex-direction": "column",
                "justify-content": "flex-end",
                height: "100vh",
                padding: "20px",
                "max-width": "700px",
                margin: "0 auto",
            }}
        >
            <div
                style={{
                    "overflow-y": "scroll",
                    display: "flex",
                    "flex-direction": "column-reverse",
                }}
            >
                <Messages>
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
            </div>
            <Prompt onSend={onSend} />
        </div>
    )
}
