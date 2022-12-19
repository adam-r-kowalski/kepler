import { createContext, JSXElement, useContext } from "solid-js"
import { Message } from "../Conversations/Context"

export interface Backend {
    send: (text: string, summary: string) => Promise<Message>
}

export const BackendContext = createContext<Backend>()

export const useBackend = () => useContext(BackendContext)

interface Props {
    backend: Backend
    children: JSXElement
}

export const BackendProvider = (props: Props) => {
    return (
        <BackendContext.Provider value={props.backend}>
            {props.children}
        </BackendContext.Provider>
    )
}
