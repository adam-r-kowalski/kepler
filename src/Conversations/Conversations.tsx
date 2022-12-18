import { faker } from "@faker-js/faker"
import { For } from "solid-js"
import { AiFillDelete } from "solid-icons/ai"
import { FaSolidMessage } from "solid-icons/fa"
import { VsAdd } from "solid-icons/vs"

import style from "./Conversations.module.css"
import { Toolbar } from "../Toolbar"

interface Conversation {
    name: string
    preview: string
}

const conversations: Conversation[] = Array.from({ length: 10 }, () => ({
    name: faker.random.words(2),
    preview: faker.random.words(5),
}))

export const Conversations = () => {
    return (
        <>
            <Toolbar title="Conversations" />
            <div class={style.conversations}>
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
                <For each={conversations}>
                    {(conversation) => {
                        return (
                            <div class={style.conversation}>
                                <FaSolidMessage />
                                <div class={style.content}>
                                    <strong>{conversation.name}</strong>
                                    <p>{conversation.preview}</p>
                                </div>
                                <div class={style.delete}>
                                    <AiFillDelete />
                                </div>
                            </div>
                        )
                    }}
                </For>
            </div>
        </>
    )
}
