import { Match, Switch } from "solid-js"

import { Message } from "../Conversations/Context"
import { Received } from "../Received"
import { Sent } from "../Sent"
import { RateLimit } from "../RateLimit"

interface Props {
    message: Message
}

export const MessageBubble = (props: Props) => {
    return (
        <Switch>
            <Match when={props.message.kind === "sent"}>
                <Sent>{props.message.text}</Sent>
            </Match>
            <Match when={props.message.kind === "rate limit"}>
                <RateLimit>{props.message.text}</RateLimit>
            </Match>
            <Match when={props.message.kind === "received"}>
                <Received>{props.message.text}</Received>
            </Match>
        </Switch>
    )
}
