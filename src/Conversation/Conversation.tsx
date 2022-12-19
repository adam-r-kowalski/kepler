import { For, Match, Switch } from "solid-js"
import { FaSolidChevronLeft } from "solid-icons/fa"

import style from "./Conversation.module.css"
import { Received } from "../Received"
import { Prompt } from "../Prompt"
import { Sent } from "../Sent"
import { RateLimit } from "../RateLimit"
import { Toolbar } from "../Toolbar"
import { useNavigate, useParams } from "@solidjs/router"
import { Message, useConversations } from "../Conversations/Context"

const Back = () => {
    const navigate = useNavigate()
    const onclick = () => navigate("/kepler/")
    return (
        <div class={style.back} onclick={onclick}>
            <FaSolidChevronLeft />
        </div>
    )
}

interface Props {
    message: Message
}

const MessageBubble = (props: Props) => {
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

export const Conversation = () => {
    const params = useParams()
    const conversations = useConversations()!
    let ref: HTMLElement | undefined = undefined
    const onSend = (text: string) => {
        conversations.send(params.name, text)
        setTimeout(() => {
            if (!ref) return
            ref.scrollBy({ top: ref.scrollHeight, behavior: "smooth" })
        }, 100)
    }
    return (
        <>
            <Toolbar title={params.name} left={<Back />} />
            <div class={style.conversation}>
                <div class={style.scrollable} ref={ref}>
                    <div class={style.messages}>
                        <div style={{ height: "100px" }} />
                        <For each={conversations.store[params.name]}>
                            {(message) => <MessageBubble message={message} />}
                        </For>
                    </div>
                </div>
                <div style={{ height: "20px", "min-height": "20px" }} />
                <Prompt onSend={onSend} />
            </div>
        </>
    )
}
