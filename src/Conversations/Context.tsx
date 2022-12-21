import { createContext, JSXElement, useContext } from "solid-js"
import { createStore, produce } from "solid-js/store"
import { useBackend } from "../Backend/Backend"
import { useUUID } from "../UUID"
import { createSpeaker } from "../Speech/speechSynthesizer"

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
    const send = async (uuid: string, text: string) => {
        const index = store[uuid].messages.length
        setStore(
            uuid,
            "messages",
            produce((messages) => messages.push({ kind: "sent", text }))
        )
        const received = await backend.send(prompt(store[uuid].messages))
        switch (received.kind) {
            case "rate limit":
                setStore(uuid, "messages", index, "kind", "rate limit")
                break
            case "success":
                const text = received.text
                const speaker = await createSpeaker()!
                speaker.speak(text)
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
