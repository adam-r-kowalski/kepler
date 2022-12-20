import { For, Show } from "solid-js"

import style from "./Conversation.module.css"
import { ProfileIcon, Prompt } from "../Prompt"
import { Toolbar } from "../Toolbar"
import { useParams } from "@solidjs/router"
import { useConversations } from "../Conversations/ConversationsContext"
import { Title } from "./Title"
import { Back } from "./Back"
import { MessageBubble } from "./MessageBubble"

export const Conversation = () => {
    const params = useParams()
    const conversations = useConversations()!
    const conversation = () => conversations.store[params.uuid]
    const Loaded = () => {
        let ref: HTMLElement | undefined = undefined
        const onSend = (text: string) => {
            conversations.send(params.uuid, text)
            setTimeout(() => {
                if (!ref) return
                ref.scrollBy({ top: ref.scrollHeight, behavior: "smooth" })
            }, 100)
        }
        return (
            <>
                <Toolbar
                    content={<Title conversation={conversation()} />}
                    left={<Back />}
                    right={<ProfileIcon />}
                />
                <div class={style.conversation}>
                    <div class={style.scrollable} ref={ref}>
                        <div class={style.messages}>
                            <div style={{ height: "100px" }} />
                            <For each={conversation().messages}>
                                {(message) => (
                                    <MessageBubble message={message} />
                                )}
                            </For>
                        </div>
                    </div>
                    <div style={{ height: "20px", "min-height": "20px" }} />
                    <Prompt onSend={onSend} />
                </div>
            </>
        )
    }
    return (
        <Show when={conversation()} fallback={<div>Loading...</div>}>
            <Loaded />
        </Show>
    )
}
