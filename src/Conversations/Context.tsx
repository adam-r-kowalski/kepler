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
    send: (conversation: string, text: string) => Promise<void>
    new: () => string
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
    const send = async (conversation: string, text: string) => {
        const index = store[conversation].length
        setStore(
            conversation,
            produce((messages) => messages.push({ kind: "sent", text }))
        )
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
    const newConversation = () => {
        let name = "Untitled Conversation"
        if (name in store) {
            for (let i = 1; true; i++) {
                const newName = `${name} ${i}`
                if (!(newName in store)) {
                    name = newName
                    break
                }
            }
        }
        setStore(name, [])
        return name
    }
    const conversations: Conversations = { store, send, new: newConversation }
    return (
        <ConversationsContext.Provider value={conversations}>
            {props.children}
        </ConversationsContext.Provider>
    )
}

export const useConversations = () => useContext(ConversationsContext)
