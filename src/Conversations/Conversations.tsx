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
            <Toolbar title="Conversations" />
            <div class={style.conversations}>
                <New />
                <For each={Object.entries(conversations.store)}>
                    {([name, conversation]) => {
                        return (
                            <Preview name={name} conversation={conversation} />
                        )
                    }}
                </For>
            </div>
        </>
    )
}
