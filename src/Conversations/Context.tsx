import { createContext, JSXElement, useContext } from "solid-js"
import { createStore, produce } from "solid-js/store"
import { useBackend } from "../Backend/Backend"
import { useUUID } from "../UUID"

interface Sent {
    kind: "sent"
    text: string
}

interface RateLimit {
    kind: "rate limit"
    text: string
}

interface Received {
    kind: "received"
    text: string
    summary: string
}

interface ReceivedError {
    kind: "received error"
    text: string
    summary: string
}

export type Message = Sent | RateLimit | Received | ReceivedError

export interface Conversation {
    uuid: string
    name: string
    messages: Message[]
}

const summary = (messages: Message[]): string => {
    const message = messages
        .slice()
        .reverse()
        .find((m) => m.kind === "received")
    if (message && message.kind === "received") return message.summary
    return "No summary yet."
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

export const ConversationsProvider = (props: Props) => {
    const uuid = useUUID()!
    const backend = useBackend()!
    const [store, setStore] = createStore<Store>({})
    const send = async (uuid: string, text: string) => {
        const index = store[uuid].messages.length
        setStore(
            uuid,
            "messages",
            produce((messages) => messages.push({ kind: "sent", text }))
        )
        const currentSummary = summary(store[uuid].messages)
        const received = await backend.send(text, currentSummary)
        switch (received.kind) {
            case "rate limit":
                setStore(uuid, "messages", index, "kind", "rate limit")
                break
            case "received":
                try {
                    const { answer, summary } = JSON.parse(received.text)
                    setStore(
                        uuid,
                        "messages",
                        produce((messages) =>
                            messages.push({
                                kind: "received",
                                text: answer,
                                summary,
                            })
                        )
                    )
                } catch (e) {
                    setStore(
                        uuid,
                        "messages",
                        produce((messages) =>
                            messages.push({
                                kind: "received error",
                                text: received.text,
                                summary: currentSummary,
                            })
                        )
                    )
                }
                break
        }
    }
    const create = () => {
        const conversation: Conversation = {
            uuid: uuid.generate(),
            name: "Untitled Conversation",
            messages: [],
        }
        setStore(conversation.uuid, conversation)
        return conversation.uuid
    }
    const remove = (conversation: string) => {
        setStore(produce((store) => delete store[conversation]))
    }
    const rename = (conversation: string, name: string) => {
        setStore(conversation, "name", name)
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
