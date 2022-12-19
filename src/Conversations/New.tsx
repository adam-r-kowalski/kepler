import { VsAdd } from "solid-icons/vs"

import style from "./Conversations.module.css"

export const New = () => {
    return (
        <div
            classList={{
                [style.add]: true,
                [style.conversation]: true,
            }}
        >
            <VsAdd />
            <div class={style.content}>
                <strong>New Conversation</strong>
                <p>Start new conversation...</p>
            </div>
        </div>
    )
}
