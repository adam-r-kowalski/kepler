import { useNavigate } from "@solidjs/router"
import { AiFillDelete } from "solid-icons/ai"
import { FaSolidMessage } from "solid-icons/fa"

import style from "./Conversations.module.css"
import { Conversation, useConversations } from "./ConversationsContext"

interface Props {
    conversation: Conversation
}

export const Preview = (props: Props) => {
    const preview = () => {
        const message = props.conversation.messages
            .slice()
            .reverse()
            .find((m) => m.kind !== "received")
        if (message) return message.text
        return "No messages yet..."
    }
    const navigate = useNavigate()
    const navigateTo = () =>
        navigate(`/kepler/conversation/${props.conversation.uuid}`)
    const conversations = useConversations()!
    const remove = (e: Event) => {
        conversations.remove(props.conversation.uuid)
        e.stopPropagation()
    }
    return (
        <div class={style.conversation} onclick={navigateTo}>
            <FaSolidMessage />
            <div class={style.content}>
                <strong>{props.conversation.name}</strong>
                <p>{preview()}</p>
            </div>
            <div class={style.delete} onclick={remove}>
                <AiFillDelete />
            </div>
        </div>
    )
}
