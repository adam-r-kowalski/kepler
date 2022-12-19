import { useNavigate } from "@solidjs/router"
import { VsAdd } from "solid-icons/vs"
import { useConversations } from "./Context"

import style from "./Conversations.module.css"

export const New = () => {
    const navigate = useNavigate()
    const conversations = useConversations()!
    const onclick = () => {
        const name = conversations.create()
        navigate(`/kepler/conversation/${name}`)
    }
    return (
        <div
            classList={{
                [style.add]: true,
                [style.conversation]: true,
            }}
            onclick={onclick}
        >
            <VsAdd />
            <div class={style.content}>
                <strong>New Conversation</strong>
                <p>Start new conversation...</p>
            </div>
        </div>
    )
}
