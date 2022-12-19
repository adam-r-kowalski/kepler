import { useNavigate } from "@solidjs/router"
import { AiFillDelete } from "solid-icons/ai"
import { FaSolidMessage } from "solid-icons/fa"

import style from "./Conversations.module.css"
import { Conversation, useConversations } from "./Context"

interface Props {
    name: string
    conversation: Conversation
}

export const Preview = (props: Props) => {
    const preview = () => {
        const message = props.conversation
            .slice()
            .reverse()
            .find((m) => m.kind !== "received")
        if (message) return message.text
        return "No messages yet..."
    }
    const navigate = useNavigate()
    const navigateTo = () => navigate(`/kepler/conversation/${props.name}`)
    const conversations = useConversations()!
    const remove = (e: Event) => {
        conversations.remove(props.name)
        e.stopPropagation()
    }
    return (
        <div class={style.conversation} onclick={navigateTo}>
            <FaSolidMessage />
            <div class={style.content}>
                <strong>{props.name}</strong>
                <p>{preview()}</p>
            </div>
            <div class={style.delete} onclick={remove}>
                <AiFillDelete />
            </div>
        </div>
    )
}
