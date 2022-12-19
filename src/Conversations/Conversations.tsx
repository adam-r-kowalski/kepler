import { For } from "solid-js"

import style from "./Conversations.module.css"
import { Toolbar } from "../Toolbar"
import { useConversations } from "./Context"
import { New } from "./New"
import { Preview } from "./Preview"

export const Conversations = () => {
    const conversations = useConversations()!
    return (
        <>
            <Toolbar content="Conversations" />
            <div class={style.conversations}>
                <New />
                <For each={Object.values(conversations.store)}>
                    {(conversation) => {
                        return <Preview conversation={conversation} />
                    }}
                </For>
            </div>
        </>
    )
}
