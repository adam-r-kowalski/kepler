import { AiOutlineConsoleSql } from "solid-icons/ai"
import { createContext, JSXElement, useContext } from "solid-js"
import { createStore, produce } from "solid-js/store"

import { useBackend } from "../Backend/Backend"
import { openDatabase } from "../Database"
import { useUUID } from "../UUID"

export interface Message {
    kind: "sent" | "rate limit" | "received"
    text: string
}

export interface Conversation {
    uuid: string
    name: string
    messages: Message[]
}

type Store = { [uuid: string]: Conversation }

interface Conversations {
    store: Store
    send: (conversation: string, text: string) => Promise<void>
    create: () => string
    remove: (conversation: string) => void
    rename: (conversation: string, name: string) => void
}

const ConversationsContext = createContext<Conversations>()

interface Props {
    children: JSXElement
}

export const prompt = (messages: Message[]): string => {
    return `
You are a highly intelligent, creative and helpful AI.
Respond to the user with an answer formatted as markdown.

${messages
    .map((m) => {
        switch (m.kind) {
            case "sent":
            case "rate limit":
                return `User: ${m.text}`
            case "received":
                return `AI: ${m.text}`
        }
    })
    .join("\n\n")}

AI:`.trim()
}

export const ConversationsProvider = (props: Props) => {
    const uuid = useUUID()!
    const backend = useBackend()!
    const [store, setStore] = createStore<Store>({})
    const loadDB = async () => {
        const db = await openDatabase()
        const conversations = await db.getAll("conversations")
        setStore(
            produce((store) => {
                conversations.forEach((c) => (store[c.uuid] = c))
                return store
            })
        )
        console.log(store)
        return db
    }
    const dbPromise = loadDB()
    const saveMessages = async (conversation: string) => {
        const db = await dbPromise
        db.put(
            "conversations",
            JSON.parse(JSON.stringify(store[conversation])),
            conversation
        )
    }

    //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
    const send = async (uuid: string, text: string) => {
        const db = await dbPromise
        const index = store[uuid].messages.length
        setStore(
            uuid,
            "messages",
            produce((messages) => messages.push({ kind: "sent", text }))
        )
        await saveMessages(uuid)
        const received = await backend.send(prompt(store[uuid].messages))
        switch (received.kind) {
            case "rate limit":
                setStore(uuid, "messages", index, "kind", "rate limit")
                break
            case "success":
                const text = received.text
                setStore(
                    uuid,
                    "messages",
                    produce((messages) =>
                        messages.push({
                            kind: "received",
                            text,
                        })
                    )
                )
                break
        }
        await saveMessages(uuid)
    }
    const create = () => {
        const conversation: Conversation = {
            uuid: uuid.generate(),
            name: "Untitled Conversation",
            messages: [],
        }
        setStore(conversation.uuid, conversation)
        dbPromise.then((db) =>
            db.put("conversations", conversation, conversation.uuid)
        )
        return conversation.uuid
    }
    const remove = (conversation: string) => {
        setStore(produce((store) => delete store[conversation]))
        dbPromise.then((db) => db.delete("conversations", conversation))
    }
    const rename = (conversation: string, name: string) => {
        setStore(conversation, "name", name)
        saveMessages(conversation)
    }
    const conversations: Conversations = {
        store,
        send,
        create,
        remove,
        rename,
    }
    return (
        <ConversationsContext.Provider value={conversations}>
            {props.children}
        </ConversationsContext.Provider>
    )
}

export const useConversations = () => useContext(ConversationsContext)
