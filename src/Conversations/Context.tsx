import { createContext, JSXElement, useContext } from "solid-js"
import { createStore, produce } from "solid-js/store"
import { useBackend } from "../Backend/Backend"

export interface Message {
    kind: "sent" | "received" | "rate limit"
    text: string
}

export type Conversation = Message[]

type Store = { [name: string]: Conversation }

interface Conversations {
    store: Store
    send: (conversation: string, text: string) => void
}

const ConversationsContext = createContext<Conversations>()

interface Props {
    children: JSXElement
}

export const ConversationsProvider = (props: Props) => {
    const backend = useBackend()!
    const [store, setStore] = createStore<Store>({
        Weather: [
            {
                kind: "sent",
                text: "What is the weather today",
            },
            {
                kind: "received",
                text: "today will be warm and sunny",
            },
        ],
    })
    const sendToBackend = async (
        conversation: string,
        text: string,
        index: number
    ) => {
        const received = await backend.send(text)
        switch (received.kind) {
            case "rate limit":
                setStore(conversation, index, "kind", "rate limit")
                break
            case "success":
                setStore(
                    conversation,
                    produce((messages) =>
                        messages.push({ kind: "received", text: received.text })
                    )
                )
                break
        }
    }
    const send = (conversation: string, text: string) => {
        const index = store[conversation].length
        setStore(
            conversation,
            produce((messages) => messages.push({ kind: "sent", text }))
        )
        sendToBackend(conversation, text, index)
    }
    const conversations: Conversations = { store, send }
    return (
        <ConversationsContext.Provider value={conversations}>
            {props.children}
        </ConversationsContext.Provider>
    )
}

export const useConversations = () => useContext(ConversationsContext)
