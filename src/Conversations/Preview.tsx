import { useNavigate } from "@solidjs/router"
import { AiFillDelete } from "solid-icons/ai"
import { FaSolidMessage } from "solid-icons/fa"

import style from "./Conversations.module.css"
import { Conversation } from "./Context"

interface Props {
    name: string
    conversation: Conversation
}

export const Preview = (props: Props) => {
    const preview = () => {
        if (props.conversation.length === 0) return "No messages yet..."
        return props.conversation[props.conversation.length - 1].text
    }
    const navigate = useNavigate()
    const onclick = () => navigate(`/kepler/conversation/${props.name}`)
    return (
        <div class={style.conversation} onclick={onclick}>
            <FaSolidMessage />
            <div class={style.content}>
                <strong>{props.name}</strong>
                <p>{preview()}</p>
            </div>
            <div class={style.delete}>
                <AiFillDelete />
            </div>
        </div>
    )
}
