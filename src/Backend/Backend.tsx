import { createContext, JSXElement, useContext } from "solid-js"

interface Success {
    kind: "success"
    text: string
}

interface RateLimit {
    kind: "rate limit"
}

export type Response = Success | RateLimit

export interface Backend {
    send: (text: string) => Promise<Response>
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
