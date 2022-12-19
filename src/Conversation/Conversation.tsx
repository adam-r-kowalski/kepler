import { For } from "solid-js"

import style from "./Conversation.module.css"
import { Prompt } from "../Prompt"
import { Toolbar } from "../Toolbar"
import { useParams } from "@solidjs/router"
import { useConversations } from "../Conversations/Context"
import { Title } from "./Title"
import { Back } from "./Back"
import { MessageBubble } from "./MessageBubble"

export const Conversation = () => {
    const params = useParams()
    const conversations = useConversations()!
    let ref: HTMLElement | undefined = undefined
    const onSend = (text: string) => {
        conversations.send(params.uuid, text)
        setTimeout(() => {
            if (!ref) return
            ref.scrollBy({ top: ref.scrollHeight, behavior: "smooth" })
        }, 100)
    }
    const conversation = conversations.store[params.uuid]
    return (
        <>
            <Toolbar
                content={<Title conversation={conversation} />}
                left={<Back />}
            />
            <div class={style.conversation}>
                <div class={style.scrollable} ref={ref}>
                    <div class={style.messages}>
                        <div style={{ height: "100px" }} />
                        <For each={conversation.messages}>
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
